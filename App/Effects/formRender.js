import {AsyncStorage} from "react-native";
import {call, put, select, take} from "redux-saga/effects";
import {NavigationActions, StackActions} from "react-navigation";
import RNFS from "react-native-fs";
import FileOpener from "react-native-file-opener";
import RNFetchBlob from "react-native-fetch-blob";
import Base64 from "base-64";
import _ from "lodash";
import actions from "../Actions";
import I18n from "../I18n";
import Utils from "../Utils";
import MobileControls from "../MobileControls";
import * as Models from "../Model";
import Task from "../Model/Task";
import {pushNotification} from "../Libs/Notifications";
import {CASE, PATH, FILENAMES} from "../Libs/Const";
import StartCase from "../Model/StartCase";

let path = RNFS.DocumentDirectoryPath;
const pathFormRender = "/FormRender",
    pathSteps = "/Steps",
    pathNextSteps = "/NextSteps",
    pathForms = "/Forms",
    pathData = "/Data";

export default (WsManager) => {
    /**
     * Method to effect backButtonPressed in Screen FormRender
     * @param action
     */
    function* backButtonPressed (action) {
        yield put(actions.screens.all.disableItemList(false));
        yield put(actions.formRender.reset());
        yield put(actions.formRender.inject.getFormData({
            flowStatus: "getFormData"
        }));
        yield put(NavigationActions.back());
    }

    /**
     * Method to open Case (Inbox)
     * @param action
     */
    function* openCase (action) {
        try {
            const state = yield select(),
                payloadRoute = yield call(Utils.tryApiRequest, {
                    wsManager: WsManager,
                    payload: action.payload,
                    state,
                    service: "casesRoute"
                }),
                payloadSteps = yield call(Utils.tryEffectsApiRequest, {
                    wsManager: WsManager,
                    payload: action.payload,
                    state,
                    service: "steps",
                    action: actions.project.task.steps
                });

            if (_.isEmpty(payloadSteps) ||
                _.isEmpty(payloadSteps.response) ||
                Object.prototype.hasOwnProperty.call(payloadRoute, "error")) {
                const routeToScreen = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({
                            routeName: state.Cases.routeName
                        })]
                    }),
                    msg = Object.prototype.hasOwnProperty.call(payloadRoute, "error")
                        ? payloadRoute.error.error_description
                        : I18n.t("is_a_task_without_forms");
                Utils.showToast({message: msg});
                if (Object.prototype.hasOwnProperty.call(payloadRoute, "error")) {
                    yield put(routeToScreen);
                }
                return;
            }

            if (!payloadSteps.error) {
                path = `${RNFS.DocumentDirectoryPath + pathFormRender + pathSteps}/${payloadSteps.params.act_uid}.json`;
                yield Utils.writeFile({
                    path,
                    body: JSON.stringify(payloadSteps.response),
                    encode: "utf8",
                    overwrite: true
                });
                yield put(actions.formRender.render(Object.assign({}, action.payload, {stepsPath: path})));
            }
        } catch (e) {
            Utils.showToast({message: I18n.t("is_a_task_without_forms")});
        }
        // TODO: The error handler will be resolved on the ticket PRE-85
    }

    /**
     * Method to create a new case
     * @param action
     */
    function* newCase (action) {
        let state = yield select(),
            payload,
            payloadSteps;

        payload = yield call(Utils.tryEffectsApiRequest, {
            wsManager: WsManager,
            payload: Object.assign({userId: state.User.userId}, action.payload),
            state,
            service: "newCase",
            action: actions.cases.create
        });

        payloadSteps = yield call(Utils.tryEffectsApiRequest, {
            wsManager: WsManager,
            payload: payload.params,
            state,
            service: "steps",
            action: actions.project.task.steps
        });

        if (_.isEmpty(payloadSteps) ||
            _.isEmpty(payloadSteps.response) ||
            Object.prototype.hasOwnProperty.call(payload, "error")) {
            const routeToScreen = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({
                        routeName: state.Cases.routeName
                    })]
                }),
                msg = Object.prototype.hasOwnProperty.call(payload, "error")
                    ? payload.error.error_description
                    : I18n.t("is_a_task_without_forms");
            Utils.showToast({message: msg});
            if (Object.prototype.hasOwnProperty.call(payload, "error")) {
                yield put(routeToScreen);
            }
            return;
        }

        payloadSteps.params = Object.assign(payloadSteps.params, {
            app_uid: payload.response.caseId,
            del_index: payload.response.caseIndex,
            case_number: payload.response.caseNumber,
            type: CASE.DRAFT
        });

        if (!payloadSteps.error) {
            path = `${RNFS.DocumentDirectoryPath + pathFormRender + pathSteps}/${payload.params.act_uid}.json`;
            yield Utils.writeFile({
                path,
                body: JSON.stringify(payloadSteps.response),
                encode: "utf8",
                overwrite: true
            });
            yield put(actions.formRender.render(Object.assign({}, payloadSteps.params, {stepsPath: path})));
        }
    }

    /**
     * Render the form
     * @param action
     */
    function* render (action) {
        const state = yield select(),
            routeToScreen = NavigationActions.navigate({
                routeName: "FormRender",
                params: {
                    payload: action.payload,
                    state
                }
            });
        yield put(routeToScreen);
    }

    /**
     * Route Case offline
     * @param params
     * @param response
     * @returns {IterableIterator<*>}
     */
    function* routeOffline ({params, response}) {
        const state = yield select(),
            modelType = {
                Draft: "Draft",
                Inbox: "Todo"
            };
        let caseKey,
            task,
            status = CASE.STATUS.WORKING;

        yield put(actions.formRender.inject.getFormData({flowStatus: "getFormData"}));
        if (params.typeList && Models[modelType[params.typeList]].changeStatus) {
            task = Task.getTask(params.act_uid);
            if (task && task.autoRoot === "TRUE") {
                status = CASE.STATUS.SENDING;
            }
            Models[modelType[params.typeList]].changeStatus(params.app_uid, status);
            if (state.Cases[modelType[params.typeList].toLowerCase()] &&
                Models[modelType[params.typeList]].existCase(params.app_uid)) {
                caseKey = _.findKey(state.Cases[modelType[params.typeList].toLowerCase()].response, {
                    caseId: params.app_uid
                });
                if (caseKey) {
                    state.Cases[modelType[params.typeList].toLowerCase()].response[caseKey].status = status;
                }
            }
        } else if (Number(params.del_index) === 1) {
            task = StartCase.startCaseTaskId(params.act_uid);
            if (task.autoRoot === "TRUE") {
                status = CASE.STATUS.SENDING;
            }
            Models.NewCase.changeStatus(params.app_uid, status);
        }
        Utils.showToast({message: I18n.t("case_will_be_sent_on_background")});
        // need to redirect to inbox after the route finishes.
        yield put(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: state.Cases.routeName
            })]
        }));
    }

    /**
     * Method to process the data from webView bridge call:nextStep
     * @param action
     */
    function* bridgeNextStep (action) {
        let state = yield select(),
            indexDefault = 0,
            payload,
            steps = [];

        if (!action.payload.stepData.formId && !action.payload.stepData.stepId) {
            steps = Utils.findStepsZeroByTaskId(state, action.payload.config.prj_uid, action.payload.config.act_uid);
            action.payload.config.step_pos = indexDefault;
        } else {
            steps = Utils.findStep(state, action.payload.config.prj_uid, action.payload.config.act_uid, action.payload.stepData.formId);
            action.payload.config.step_pos = steps.stepPosition;
            yield put(actions.formData.server.update(action.payload));
        }

        action.payload.config.dyn_uid = steps.formId;
        action.payload.config.step_uid = steps.stepId;

        payload = yield call(Utils.tryEffectsApiRequest, {
            wsManager: WsManager,
            payload: action.payload.config,
            state,
            service: "nextStep",
            action: actions.formRender.nextStep
        });
        // Hides MapView
        yield put(actions.formRender.openMap({status: false, idField: null}));
        // route a case effect
        if (payload.response && payload.response.conditionalSteps &&
            payload.response.conditionalSteps.TYPE === "DERIVATION") {
            yield put(actions.screens.all.disableItemList(false));
            if (state.Net.isConnected) {
                try {
                    yield call(Utils.tryEffectsApiRequest, {
                        wsManager: WsManager,
                        payload: action.payload.config,
                        state,
                        service: "caseAssignmentRequest",
                        action: actions.cases.assignmentInfo
                    });
                    Models.Data.destroyDataCase(payload.params.app_uid);
                    yield put(actions.formRender.routed.route({isRouted: true}));
                } catch (e) {
                    yield put(actions.cases.assignmentInfo.error({error: "error", error_description: e.toString()}));
                }
                return;
            }
            yield put(actions.formRender.routeOffline({routeOffline: true}));
            yield call(routeOffline, payload);
            return;
        }

        if (!payload.error) {
            path = `${RNFS.DocumentDirectoryPath + pathFormRender + pathNextSteps}/${payload.params.act_uid}.json`;
            if (yield call(RNFS.exists, path)) {
                yield call(RNFS.unlink, path);
            }
            yield call(RNFS.writeFile, path, JSON.stringify(payload.response), "utf8");
            yield put(actions.formRender.inject.continueStep({flowStatus: "continueStep", nextStepPath: path}));
        }
    }

    /**
     * Method to process the data from webView bridge call:getForm
     * @param action
     */
    function* bridgeGetForm (action) {
        let state = yield select(),
            externalLibs = [],
            objectLibs = {},
            library = {},
            newPathLib,
            newNameFile,
            extensionFile,
            pathLibs = PATH.PROJECT + PATH.FORMRENDER + PATH.BUILDPROD + PATH.EXTERNALLIBS,
            isCachedExternalLib,
            downloadInfo,
            payload = yield call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({}, action.payload.config, action.payload.stepData),
                state,
                service: "dynaformProcessed",
                action: actions.dynaform.processed
            });
        if (!payload.error) {
            // get list of external libraries
            externalLibs = yield call(Utils.externalLibraries, payload.response.formContent);
            isCachedExternalLib = yield call(AsyncStorage.getItem, "@externalLibs");
            for (let i = 0; i < externalLibs.length; i += 1) {
                newNameFile = Base64.encode(externalLibs[i]);
                extensionFile = Utils.getExtensionFile(externalLibs[i]);
                newPathLib = `${pathLibs}/${newNameFile}.${extensionFile}`;
                if (state.Net.isConnected &&
                    (isCachedExternalLib !== "true" || !(yield call(RNFS.exists, newPathLib)))
                ) {
                    downloadInfo = yield call(Utils.urlDownloadFile, externalLibs[i], newPathLib);
                    if (downloadInfo.info().status === 200) {
                        library[externalLibs[i]] = `${PATH.EXTERNALLIBS.substr(1)}/${newNameFile}.${extensionFile}`;
                        objectLibs = Object.assign(objectLibs, library);
                    } else {
                        if (yield call(RNFS.exists, newPathLib)) {
                            RNFS.unlink(newPathLib);
                        }
                        Utils.showToast({
                            message: I18n.t("error_downloading_external_lib", {placeholder: externalLibs[i]})
                        });
                    }
                } else if (isCachedExternalLib === "true" && (yield call(RNFS.exists, newPathLib))) {
                    library[externalLibs[i]] = `${PATH.EXTERNALLIBS.substr(1)}/${newNameFile}.${extensionFile}`;
                    objectLibs = Object.assign(objectLibs, library);
                }
                if (!state.Net.isConnected && !(yield call(RNFS.exists, newPathLib))) {
                    Utils.showToast({
                        message: I18n.t("error_downloading_external_lib", {placeholder: externalLibs[i]})
                    });
                }
            }
            // save the map external libraries with new path
            path = `${PATH.PROJECT + PATH.FORMRENDER + PATH.BUILDPROD}/${FILENAMES.EXTERNALMAP}`;
            yield call(RNFS.writeFile, path, JSON.stringify(objectLibs), "utf8");
            yield put(actions.formRender.inject.setCacheLibraryMap({flowStatus: "setCacheLibraryMap"}));
            // save de structure from in store
            path = `${RNFS.DocumentDirectoryPath + pathFormRender + pathForms}/${payload.params.dyn_uid}.json`;
            if (yield call(RNFS.exists, path)) {
                yield call(RNFS.unlink, path);
            }
            yield call(RNFS.writeFile, path, JSON.stringify(payload.response.formContent), "utf8");
            yield put(actions.formRender.inject.loadForm({flowStatus: "loadForm", formPath: path}));
        }
    }

    /**
     * Method to process the data from webView bridge call:getFormData
     * @param action
     */
    function* bridgeGetFormData (action) {
        let state = yield select(),
            data = Utils.getFormData(state, action.payload.config.app_uid);
        path = `${RNFS.DocumentDirectoryPath + pathFormRender + pathData}/${action.payload.config.app_uid}.json`;
        yield Utils.writeFile({
            path,
            body: JSON.stringify(data),
            encode: "utf8",
            overwrite: true
        });
        yield put(actions.formRender.inject.setFormData({
            flowStatus: "setFormData",
            formDataPath: path,
            stepData: action.payload.stepData
        }));
    }

    /**
     * Method to process data files call: getFile
     * @param action
     */
    function* bridgeGetFile (action) {
        let file = yield call(MobileControls.FileControl.showPicker, "File Choose"),
            state,
            nameFile,
            extensionFile,
            size,
            msgSize,
            msg;
        if (file && file.path) {
            const infoFile = yield call(RNFS.stat, file.path);
            if (action.payload.stepData.size !== 0) {
                switch (action.payload.stepData.sizeUnity) {
                    case "KB":
                        size = action.payload.stepData.size * 1024;
                        break;
                    case "MB":
                        size = action.payload.stepData.size * 1048576;
                        break;
                    default:
                        size = 0;
                        break;
                }
                if (infoFile.size >= size) {
                    msgSize = `${action.payload.stepData.size} ${action.payload.stepData.sizeUnity}`;
                    msg = `${I18n.t("file_to_large_for_server")} ${msgSize}`;
                    Utils.showToast({message: msg});
                    return;
                }
            }
            nameFile = Utils.getFileName(file.path);
            extensionFile = Utils.getExtensionFile(nameFile);
            yield put(actions.file.register.request(Object.assign(
                action.payload.stepData,
                {
                    app_uid: action.payload.config.app_uid,
                    name: nameFile,
                    path: file.path,
                    type: file.type,
                    extension: extensionFile
                }
            )));
            yield take([actions.file.register.success, actions.file.register.error]);
            state = yield select();
            if (state.FileMobile.register) {
                yield put(actions.formRender.inject.hideFieldLoading({
                    flowStatus: "hideFieldLoading",
                    fileInput: {
                        idField: action.payload.stepData.idField,
                        idFile: state.FileMobile.register.file.appDocUid,
                        docVersion: state.FileMobile.register.file.docVersion
                    }
                }));
            }
        }
    }

    /**
     * Method to get list of file versions: getFileVersions
     * @param action
     */
    function* bridgeGetFileVersions (action) {
        let state = yield select(),
            params,
            uploadedFile;
        params = {
            app_uid: action.payload.config.app_uid,
            app_doc_uid: action.payload.stepData.appDocUID
        };
        uploadedFile = yield call(Utils.tryApiRequest, {
            wsManager: WsManager,
            payload: params,
            state,
            service: "fileVersions"
        });
        if (uploadedFile) {
            yield put(actions.formRender.inject.setFileVersions({
                flowStatus: "setFileVersions",
                response: {
                    fieldID: action.payload.stepData.fieldID,
                    appDocUid: action.payload.stepData.appDocUID,
                    response: JSON.stringify(uploadedFile.response),
                    success: true
                }
            }));
        }
    }

    /**
     * Method to process data file call: uploadFile
     * @param action
     */
    function* bridgeGetPicture (action) {
        const {stepData} = action.payload;
        let file,
            state;
        if (stepData) {
            if (stepData.galleryEnabled && stepData.cameraEnabled) {
                file = yield call(MobileControls.ImageControl.showImagePicker, {mediaType: stepData.type});
            } else if (stepData.galleryEnabled) {
                file = yield call(MobileControls.ImageControl.fromGallery, {mediaType: stepData.type});
            } else if (stepData.cameraEnabled) {
                file = yield call(MobileControls.ImageControl.fromCamera, {mediaType: stepData.type});
            }
        }
        if (file) {
            pushNotification.hide();
            yield put(actions.file.register.request({
                app_uid: action.payload.config.app_uid,
                idField: stepData.idField,
                docUid: stepData.docUid,
                name: file.fileName,
                path: file.path,
                type: `${stepData.type}/${Utils.getExtensionFile(file.fileName)}`,
                extension: Utils.getExtensionFile(file.fileName)
            }));
            yield take([actions.file.register.success, actions.file.register.error]);
            state = yield select();
            if (state.FileMobile.register) {
                yield call(pushNotification.show, state.FileMobile.register);
            }
        }
    }

    /**
     * Method to process data file call: uploadFile
     * @param action
     * @returns {IterableIterator<*>}
     */
    function* bridgeGetVideo (action) {
        const {stepData} = action.payload;
        let file,
            nameFile,
            state,
            extensionFile;
        if (stepData) {
            file = yield call(MobileControls.ImageControl.showImagePicker, {mediaType: stepData.type});
            if (file) {
                nameFile = Utils.getFileName(file.path);
                extensionFile = Utils.getExtensionFile(nameFile);
                pushNotification.hide();
                yield put(actions.file.register.request({
                    app_uid: action.payload.config.app_uid,
                    idField: stepData.idField,
                    docUid: stepData.docUid,
                    name: nameFile,
                    path: file.path,
                    type: `${stepData.type}/${extensionFile}`,
                    extension: extensionFile
                }));
                yield take([actions.file.register.success, actions.file.register.error]);
                state = yield select();
                if (state.FileMobile.register) {
                    yield call(pushNotification.show, state.FileMobile.register);
                }
            }
        }
    }

    /**
     * Opens audio menu
     * @param action
     * @returns {IterableIterator<PutEffect<Action> | *>}
     */
    function* bridgeOpenAudioRecord (action) {
        const {stepData, config} = action.payload;
        yield put(actions.formRender.audio.openMenu({status: true}));
        yield put(actions.formRender.audio.infoAudio(Object.assign({}, stepData, {appUid: config.app_uid})));
    }

    /**
     * Gets and uploads audio file
     * @param action
     * @returns {IterableIterator<*>}
     */
    function* getAudio (action) {
        let state = yield select(),
            file,
            nameFile,
            extensionFile;

        if (action.payload) {
            file = yield call(Utils.moveToAudioDirectory, action.payload.path);
        } else {
            file = yield call(MobileControls.FileControl.showPicker, "Choose a file");
        }
        const {data} = state.FormRender.audio;
        yield put(actions.formRender.audio.openControls({status: false}));
        yield put(actions.formRender.audio.openMenu({status: false}));
        if (file && file.type.indexOf("audio/") !== -1) {
            yield put(actions.formRender.working({status: true}));
            nameFile = Utils.getFileName(file.path);
            extensionFile = Utils.getExtensionFile(nameFile);
            yield put(actions.file.register.request({
                app_uid: data.appUid,
                idField: data.idField,
                docUid: data.docUid,
                name: nameFile,
                path: file.path,
                type: `${data.type}/${extensionFile}`,
                extension: extensionFile
            }));
            yield take([actions.file.register.success, actions.file.register.error]);
            state = yield select();
            yield put(actions.formRender.working({status: false}));
            if (state.FileMobile.register) {
                yield call(pushNotification.show, state.FileMobile.register);
            }
        }
    }

    /**
     * Method to show signature modal and get form data
     * @param action
     * @returns {IterableIterator<PutEffect<Action> | *>}
     */
    function* bridgeOpenSignatureView (action) {
        const {stepData, config} = action.payload;
        yield put(actions.formRender.signature.show(true));
        yield put(actions.formRender.signature.data({
            idField: stepData.idField,
            appUid: config.app_uid
        }));
    }

    /**
     * Inject de information of modal to webView and upload image signature
     * @param action
     * @returns {IterableIterator<*>}
     */
    function* injectSignature (action) {
        const state = yield select(),
            signature = action.payload;
        let nameFile,
            extensionFile,
            newPathFile;
        path = `${RNFS.DocumentDirectoryPath + pathFormRender + pathData}/${state.FormRender.signature.data.appUid}`;
        if (!(yield call(RNFS.exists, path))) {
            yield call(RNFS.mkdir, path);
        }

        if (signature.pathName && state.FormRender.signature.data) {
            nameFile = Utils.getFileName(signature.pathName);
            extensionFile = Utils.getExtensionFile(nameFile);
            newPathFile = `${path}/${state.FormRender.signature.data.idField}.${extensionFile}`;
            yield call(RNFS.moveFile, signature.pathName, newPathFile);
            yield put(actions.file.register.request({
                app_uid: state.FormRender.signature.data.appUid,
                idField: state.FormRender.signature.data.idField,
                docUid: "",
                name: nameFile,
                path: newPathFile,
                type: `image/${extensionFile}`,
                extension: extensionFile
            }));
        }
    }

    /**
     * Opens the MapViewer
     * @param action
     * @returns {IterableIterator<*|PutEffect<Action>>}
     */
    function* bridgeOpenMapView (action) {
        const {stepData} = action.payload;
        yield put(actions.formRender.openMap({
            status: true,
            idField: stepData.idField
        }));
    }

    /**
     * Sets location
     * @param action
     * @returns {IterableIterator<*>}
     */
    function* injectCoordinates (action) {
        let state = yield select(),
            data = action.payload,
            initialData,
            index = 0;

        if (data.latitude && data.longitude) {
            yield put(actions.formRender.openMap({
                status: false,
                idField: null
            }));
            yield put(actions.formRender.working({status: true}));
            initialData = yield call(Utils.tryApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({}, data, {app_uid: data.caseIdTmp}),
                state,
                service: "uploadLocation"
            });
            if (initialData && initialData.response) {
                yield put(actions.formRender.inject.setLocation({
                    flowStatus: "setLocation",
                    location: Object.assign({}, data, {
                        fileName: initialData.response[index].appDocFilename,
                        id: initialData.response[index].appDocUid
                    })
                }));
            }
            yield put(actions.formRender.working({status: false}));
        }
    }

    /**
     * Get data of form from a WebView
     * @param action
     * @returns {IterableIterator<*>}
     */
    function* bridgeSendFormData (action) {
        const state = yield select(),
            task = Task.getTask(action.payload.config.act_uid);
        let caseKey,
            status = CASE.STATUS.WORKING;
        if (task && task.autoRoot === "TRUE" && state.FormRender.routeOffline) {
            status = CASE.STATUS.SENDING;
        }
        Models.Data.saveCaseData({
            params: Object.assign({status}, action.payload.stepData, action.payload.config),
            response: action.payload.stepData.data
        }, state);
        if (state.Cases.todo && Models.Todo.existCase(action.payload.config.app_uid)) {
            Models.Todo.changeStatus(action.payload.config.app_uid, status);
            caseKey = _.findKey(state.Cases.todo.response, {caseId: action.payload.config.app_uid});
            if (caseKey) {
                state.Cases.todo.response[caseKey].status = status;
            }
        }
        if (state.Cases.draft && Models.Draft.existCase(action.payload.config.app_uid)) {
            Models.Draft.changeStatus(action.payload.config.app_uid, status);
            caseKey = _.findKey(state.Cases.draft.response, {caseId: action.payload.config.app_uid});
            if (caseKey) {
                state.Cases.draft.response[caseKey].status = status;
            }
        }
        yield put(actions.formRender.routeOffline({routeOffline: false}));
    }

    /**
     * Form communication to know if the data is overwritten
     * @returns {IterableIterator<PutEffect<Action> | *>}
     */
    function* askWhichDataToUse () {
        yield put(actions.formRender.dataAvailable(true));
    }

    /**
     * Download a file from a dynaform
     * @returns {IterableIterator<PutEffect<Action> | *>}
     */
    function* downloadFile (action) {
        const state = yield select(),
            params = {
                app_uid: action.payload.config.app_uid,
                app_doc_uid: action.payload.stepData.docUID,
                name: yield call(Utils.newNameIfExist, RNFetchBlob.fs.dirs.DownloadDir, action.payload.stepData.name),
                version: action.payload.stepData.version
            };
        let dataFile;
        yield put(actions.formRender.download.progress(0));
        yield put(actions.formRender.download.file(params));
        yield put(actions.formRender.download.show(true));
        dataFile = yield call(Utils.tryApiRequest, {
            wsManager: WsManager,
            payload: params,
            state,
            service: "downloadFile"
        });
        yield put(actions.formRender.download.show(false));
        yield call(
            FileOpener.open,
            dataFile.response.data,
            dataFile.response.info().headers["Content-Type"]
        );
    }

    return {
        [actions.formRender.openCase]: openCase,
        [actions.formRender.newCase]: newCase,
        [actions.formRender.render]: render,
        [actions.formRender.routeOffLine]: routeOffline,
        [actions.formRender.backButtonPressed]: backButtonPressed,
        [actions.formRender.sendCoordinates]: injectCoordinates,
        [actions.formRender.sendSignature]: injectSignature,
        [actions.formRender.audio.selectAudio]: getAudio,
        [actions.formRender.bridge.nextStep]: bridgeNextStep,
        [actions.formRender.bridge.getForm]: bridgeGetForm,
        [actions.formRender.bridge.getFormData]: bridgeGetFormData,
        [actions.formRender.bridge.getFile]: bridgeGetFile,
        [actions.formRender.bridge.getFileVersions]: bridgeGetFileVersions,
        [actions.formRender.bridge.getPicture]: bridgeGetPicture,
        [actions.formRender.bridge.getVideo]: bridgeGetVideo,
        [actions.formRender.bridge.getAudio]: bridgeOpenAudioRecord,
        [actions.formRender.bridge.getSignature]: bridgeOpenSignatureView,
        [actions.formRender.bridge.getGeoTag]: bridgeOpenMapView,
        [actions.formRender.bridge.receiveFormData]: bridgeSendFormData,
        [actions.formRender.bridge.askWhichDataToUse]: askWhichDataToUse,
        [actions.formRender.bridge.downloadFile]: downloadFile
    };
};
