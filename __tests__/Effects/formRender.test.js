import {expectSaga, testSaga} from "redux-saga-test-plan";
import RNFS from "react-native-fs";
import FileOpener from "react-native-file-opener";
import actions from "../../App/Actions";
import Utils from "../../App/Utils";
import * as Api from "../../App/Services/Api";
import MobileControls from "../../App/MobileControls";
import formRender from '../../App/Effects/formRender';
import {RealmObject, StepSchema} from "../../App/Model/Schemas";
import * as Models from "../../App/Model";
import {pushNotification} from "../../App/Libs/Notifications";
import {CASE, FILENAMES, PATH, DS} from "../../App/Libs/Const";
import {AsyncStorage} from "react-native";

jest.mock('react-native-fs', () => require.requireActual('../../__mocks__/react-native-fs').default);
jest.mock('react-native-image-picker', () => require.requireActual('../../__mocks__/react-native-image-picker').default);

describe('Effect FormRender', async () => {
    const error = new Error('My Error');
    let WsManager,
        sagas,
        fakeFile = {
            fileName: "imagetest.jpg",
            path: "/store/files/",
            type: "image/jpeg"
        },
        fileAction = {
            config: {
                app_uid: "123456789"
            },
            stepData: {
                idField: "imageControl0001",
                docUid: ""
            }
        };
    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = formRender(WsManager);
        fakeFile = {
            fileName: "imagetest.jpg",
            path: "/store/files/",
            type: "image/jpeg"
        };
        fileAction = {
            config: {
                app_uid: "123456789"
            }
        };
    });

    afterAll(() => {
        RealmObject.write(() => {
            let all = RealmObject.objects(StepSchema.schema.name);
            RealmObject.delete(all); // Deletes all
        });
    });

    it("backButtonPressed*", () => {
        let payload = {
                navigation: {
                    goBack: jest.fn()
                }
            };
        testSaga(sagas["formRender/backButtonPressed"], {payload: payload})
            .next()
            .put({
                type: "screens/all/disableItemList",
                payload: false
            })
            .next()
            .put({type: "formRender/reset"})
            .next()
            .put({
                type: "formRender/inject/getFormData",
                payload: { flowStatus: 'getFormData' }
            })
            .next()
            .put({
                type: 'Navigation/BACK', key: undefined, immediate: undefined
            })
            .next()
            .isDone();
    });

    it("openCase*", () => {
        let payload = {
                type: "Navigation/NAVIGATE",
                routeName: "DrawerOpen"
            },
            state = {state: "TEST"}
        expectSaga(sagas["formRender/openCase"], payload)
            .put({
                type: "formRender/render",
                payload: {
                    payload: "test",
                    stepsPath: "test/FormRender/Steps/ret.json"
                }
            })
            .dispatch({type: "cases/counters/request", payload: payload})
            .run();
        testSaga(sagas["formRender/openCase"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(Utils.tryApiRequest, {
                wsManager: WsManager,
                payload: payload,
                state: state,
                service: "casesRoute"
            })
            .next(state)
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: payload,
                state: state,
                service: "steps",
                action: actions.project.task.steps
            })
            .next({params: {act_uid: 111}, response: [{}]})
            .next({params: {act_uid: 111}})
            .put({
                type: "formRender/render",
                payload: {
                    type: "Navigation/NAVIGATE",
                    routeName: "DrawerOpen",
                    stepsPath: "test/FormRender/Steps/111.json"
                }
            })
            .next()
            .isDone();
        testSaga(sagas["formRender/openCase"], {payload: payload})
            .next()
            .select()
            .next()
            .throw(error)
            .next()
            .isDone();
    });

    it("newCase*", () => {
        let payload = {
                act_uid: "ret",
                app_uid: "caseId",
                del_index: "caseIndex",
                case_number: "caseNumber",
                stepsPath: "test/FormRender/Steps/ret.json"
            },
            state = {state: "TEST"}
        testSaga(sagas["formRender/newCase"], {payload: payload})
            .next()
            .select()
            .next({User:{userId:"1234"}})
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({}, payload, {userId:"1234"}),
                state: {User:{userId:"1234"}},
                service: "newCase",
                action: actions.cases.create
            })
            .next({
                params: {},
                response: {
                    caseId: "caseId",
                    caseIndex: "caseIndex",
                    caseNumber: "caseNumber"
                }
            })
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: {},
                state: {User:{userId:"1234"}},
                service: "steps",
                action: actions.project.task.steps
            })
            .next({
                params: {act_uid: 111},
                response: {
                    caseId: "caseId",
                    caseIndex: "caseIndex",
                    caseNumber: "caseNumber"
                }
            })
            .next({
                params: {act_uid: 111},
                response: {
                    caseId: "caseId",
                    caseIndex: "caseIndex",
                    caseNumber: "caseNumber"
                }
            })
            .put({
                type: "formRender/render",
                payload: {
                    act_uid: 111,
                    app_uid: "caseId",
                    del_index: "caseIndex",
                    case_number: "caseNumber",
                    type: CASE.DRAFT,
                    stepsPath: "test/FormRender/Steps/undefined.json"
                }
            })
            .next()
            .isDone();

        testSaga(sagas["formRender/newCase"], {payload: payload})
            .next()
            .select()
            .next({User:{userId:"1234"},Cases:{routeName:"Test"}})
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({}, payload, {userId:"1234"}),
                state: {User:{userId:"1234"},Cases:{routeName:"Test"}},
                service: "newCase",
                action: actions.cases.create
            })
            .next({
                params: {},
                response: {
                    error: "caseId",
                    caseIndex: "caseIndex",
                    caseNumber: "caseNumber"
                }
            })
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: {},
                state: {User:{userId:"1234"},Cases:{routeName:"Test"}},
                service: "steps",
                action: actions.project.task.steps
            })
            .next({
                params: {act_uid: 111},
                response: {}
            })
            .next()
            .isDone()
    });

    it("render*", () => {
        let payload = {payload: {payload: "test"}, state: {state: "state"}},
            state = {state: "TEST"};

        testSaga(sagas["formRender/render"], {payload: payload})
            .next()
            .select()
            .next(state)
            .put({
                type: "Navigation/NAVIGATE",
                routeName: "FormRender",
                params: {
                    payload: payload,
                    state: state
                }
            })
            .next()
            .isDone()
    });

    it("routeOffline*", () => {
        const payload = {
                params: {
                    typeList: "Draft"
                }
            },
            state = {
                Cases: {
                    Draft: {}
                }
            };

        testSaga(sagas['formRender/routeOffLine'], payload)
            .next()
            .select()
            .next(state)
            .put({
                type: "formRender/inject/getFormData",
                payload: {
                    flowStatus: "getFormData"
                }
            })
            .next()
            .put({
                type: "Navigation/RESET",
                index: 0,
                actions: [{
                    type: "Navigation/NAVIGATE",
                    routeName: undefined
                }]
            })
            .next()
            .isDone();
    });

    it("bridgeGetFormData*", () => {
        let payload = {
                config: {
                    app_uid: "11111"
                }
            },
            state = {
                FormData: {
                    "11111": {
                        data1: "value1"
                    }
                }
            };

        testSaga(sagas["formRender/bridge/getFormData"], {payload: payload})
            .next()
            .select()
            .next(state)
            .next()
            .put({
                type: "formRender/inject/setFormData",
                payload: {
                    flowStatus: "setFormData",
                    formDataPath: "test/FormRender/Data/11111.json",
                    stepData: undefined
                }
            })
            .next()
            .isDone()
    });

    it("bridgeGetForm*", () => {
        let payload = {
                config: {
                    app_uid: "11111"
                },
                stepData: {}
            },
            state = {
                params: {
                    "22222": {
                        data1: "value1"
                    },
                    dyn_uid: "22222"
                },
                response: {
                    formContent: ""
                },
                Net:{isConnected: true}
            };

        testSaga(sagas["formRender/bridge/getForm"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({}, payload.config, payload.stepData),
                state: state,
                service: "dynaformProcessed",
                action: actions.dynaform.processed
            })
            .next(state)
            .call(Utils.externalLibraries, state.response.formContent)
            .next(['htt:sss'])
            .call(AsyncStorage.getItem, '@externalLibs')
            .next(state)
            .call(Utils.urlDownloadFile, 'htt:sss', 'test/FormRender/build-prod/ExternalLibs/aHR0OnNzcw==.')
            .next({info: () => ({status:200})})
            .call(RNFS.writeFile, `test${PATH.FORMRENDER + PATH.BUILDPROD}/${FILENAMES.EXTERNALMAP}`, '{"htt:sss":"ExternalLibs/aHR0OnNzcw==."}', "utf8")
            .next(state)
            .put({
                type: "formRender/inject/setCacheLibraryMap",
                payload: {
                    flowStatus: "setCacheLibraryMap"
                }
            })
            .next(state)
            .call(RNFS.exists, 'test/FormRender/Forms/22222.json')
            .next()
            .call(RNFS.writeFile, 'test/FormRender/Forms/22222.json', '""', 'utf8')
            .next(state)
            .put({
                type: "formRender/inject/loadForm",
                payload: {
                    flowStatus: "loadForm",
                    formPath: "test/FormRender/Forms/22222.json"
                }
            })
            .next()
            .isDone()
        testSaga(sagas["formRender/bridge/getForm"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({}, payload.config, payload.stepData),
                state: state,
                service: "dynaformProcessed",
                action: actions.dynaform.processed
            })
            .next(state)
            .call(Utils.externalLibraries, state.response.formContent)
            .next(['htt:sss'])
            .call(AsyncStorage.getItem, '@externalLibs')
            .next(state)
            .call(Utils.urlDownloadFile, 'htt:sss', 'test/FormRender/build-prod/ExternalLibs/aHR0OnNzcw==.')
            .next({info: () => ({status:404})})
            .call(RNFS.exists, 'test/FormRender/build-prod/ExternalLibs/aHR0OnNzcw==.')
            .next()
            .call(RNFS.writeFile, `test${PATH.FORMRENDER + PATH.BUILDPROD}/${FILENAMES.EXTERNALMAP}`, '{}', "utf8")
            .next(state)
            .put({
                type: "formRender/inject/setCacheLibraryMap",
                payload: {
                    flowStatus: "setCacheLibraryMap"
                }
            })
            .next(state)
            .call(RNFS.exists, 'test/FormRender/Forms/22222.json')
            .next()
            .call(RNFS.writeFile, 'test/FormRender/Forms/22222.json', '""', 'utf8')
            .next(state)
            .put({
                type: "formRender/inject/loadForm",
                payload: {
                    flowStatus: "loadForm",
                    formPath: "test/FormRender/Forms/22222.json"
                }
            })
            .next()
            .isDone()
    });

    it("bridgeNextStep*", () => {
        let payload = {
                config: {
                    act_uid: "act1",
                    prj_uid: "prj1",
                    dyn_uid: "dyn1",
                    app_uid: "app1"
                },
                stepData: {formId: "dyn1", data: "data"}
            },
            state = {
                Project: {
                    prj1: {
                        tasks: {
                            act1: {
                                steps: [
                                    {
                                        formId: "dyn1",
                                        stepPosition: 0,
                                        stepId: "step1"
                                    }
                                ]
                            }
                        }
                    }
                },
                Net:{isConnected: true},
                params: {act_uid: "act1", prj_uid: "prj1", dyn_uid: "dyn1"},
                response: {
                    conditionalSteps: {
                        TYPE: "DERIVATION"
                    }
                }
            };

        testSaga(sagas["formRender/bridge/nextStep"], {payload: payload})
            .next()
            .select()
            .next(state)
            .put({
                type: "formData/server/update",
                payload: payload
            })
            .next()
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: payload.config,
                state,
                service: "nextStep",
                action: actions.formRender.nextStep
            })
            .next(state)
            .put({
                type: "formRender/openMap",
                payload: {
                    status: false,
                    idField: null
                }
            })
            .next(state)
            .put({
                type: "screens/all/disableItemList",
                payload: false
            })
            .next(state)
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: payload.config,
                state,
                service: "caseAssignmentRequest",
                action: actions.cases.assignmentInfo
            })
            .next(state)
            .put({
                type: "formRender/routed/route",
                payload: {
                    isRouted: true
                }
            })
            .next()
            .isDone()
    });

    test('bridgeGetFile*', async () => {
        const action_opt1 = {
                payload: {
                    config: {
                        app_uid: "00000000001"
                    },
                    stepData: {
                        idField: "123456789",
                        docUid: "",
                        galleryEnabled: true,
                        cameraEnabled: true,
                        type: "image",
                        size: 2048,
                        sizeUnity: "KB"
                    }
                }
            },
            action_opt2 = {
                payload: {
                    config: {
                        app_uid: "00000000001"
                    },
                    stepData: {
                        idField: "123456789",
                        docUid: "",
                        galleryEnabled: true,
                        cameraEnabled: true,
                        type: "image",
                        size: 1,
                        sizeUnity: "MB"
                    }
                }
            },
            action_opt3 = {
                payload: {
                    config: {
                        app_uid: "00000000001"
                    },
                    stepData: {
                        idField: "123456789",
                        docUid: "",
                        galleryEnabled: true,
                        cameraEnabled: true,
                        type: "image",
                        size: 1,
                        sizeUnity: "TB"
                    }
                }
            },
            file = {
                fileName: "imageTest.jpg",
                path: "/downloads/imageTest.jpg",
                type: "image/jpg",
                extension: "jpg"
            };
        testSaga(sagas['formRender/bridge/getFile'], action_opt1)
            .next()
            .call(MobileControls.FileControl.showPicker, 'File Choose')
            .next(file)
            .call(RNFS.stat, file.path)
            .next({size: 1024})
            .put({
                type: "file/register/request",
                payload: {
                    galleryEnabled: true,
                    cameraEnabled: true,
                    app_uid: action_opt1.payload.config.app_uid,
                    idField: action_opt1.payload.stepData.idField,
                    docUid: action_opt1.payload.stepData.docUid,
                    name: file.fileName,
                    path: file.path,
                    type: file.type,
                    extension: file.extension,
                    size: action_opt1.payload.stepData.size,
                    sizeUnity: action_opt1.payload.stepData.sizeUnity
                }
            })
            .next()
            .take([actions.file.register.success, actions.file.register.error])
            .next()
            .select()
            .next({FileMobile: {register: {file: {appDocUid: "Doc111", docVersion: 1}}}})
            .put({
                type: "formRender/inject/hideFieldLoading",
                payload: {
                    flowStatus: "hideFieldLoading",
                    fileInput: {
                        idField: "123456789",
                        idFile: "Doc111",
                        docVersion: 1
                    }
                }
            })
            .next()
            .isDone();
        testSaga(sagas['formRender/bridge/getFile'], action_opt2)
            .next()
            .call(MobileControls.FileControl.showPicker, 'File Choose')
            .next(file)
            .call(RNFS.stat, file.path)
            .next({size: 2000000})
            .isDone();
        testSaga(sagas['formRender/bridge/getFile'], action_opt3)
            .next()
            .call(MobileControls.FileControl.showPicker, 'File Choose')
            .next(file)
            .call(RNFS.stat, file.path)
            .next({size: 2000000})
            .isDone();
    });

    test('bridgeGetFileVersions*', async () => {
        const action = {
                payload: {
                    config: {
                        app_uid: "00000000001"
                    },
                    stepData: {
                        fieldID: "multiple0001",
                        appDocUID: "doc001",
                        idField: "123456789",
                        docUid: "",
                        galleryEnabled: true,
                        cameraEnabled: true,
                        type: "image"
                    }
                }
            },
            state = {
                Net: {
                    isConnected: true
                }
            },
            file = {
                response: [],
                success: true
            };
        testSaga(sagas['formRender/bridge/getFileVersions'], action)
            .next()
            .select()
            .next(state)
            .call(Utils.tryApiRequest, {
                wsManager: WsManager,
                payload: { app_uid: '00000000001', app_doc_uid: 'doc001' },
                state,
                service: "fileVersions"
            })
            .next(file)
            .put({
                type: "formRender/inject/setFileVersions",
                payload: {
                    flowStatus: "setFileVersions",
                    response: {
                        fieldID: "multiple0001",
                        appDocUid: 'doc001',
                        response: JSON.stringify(file.response),
                        success: file.success
                    }
                }
            })
            .next()
            .isDone();
    });

    test('bridgeGetPicture*', async () => {
        const action_opt1 = {
                payload: {
                    config: {
                        app_uid: "00000000001"
                    },
                    stepData: {
                        idField: "123456789",
                        docUid: "",
                        galleryEnabled: true,
                        cameraEnabled: true,
                        type: "image"
                    }
                }
            },
            action_opt2 = {
                payload: {
                    config: {
                        app_uid: "00000000001"
                    },
                    stepData: {
                        idField: "123456789",
                        docUid: "",
                        galleryEnabled: true,
                        cameraEnabled: false,
                        type: "image"
                    }
                }
            },
            action_opt3 = {
                payload: {
                    config: {
                        app_uid: "00000000001"
                    },
                    stepData: {
                        idField: "123456789",
                        docUid: "",
                        galleryEnabled: false,
                        cameraEnabled: true,
                        type: "image"
                    }
                }
            },
            file = {
                fileName: "imageTest.jpg",
                path: "/downloads/imageTest.jpg",
                type: "image",
                extension: "jpg"
            };
        testSaga(sagas['formRender/bridge/getPicture'], action_opt1)
            .next()
            .call(MobileControls.ImageControl.showImagePicker, {mediaType: action_opt1.payload.stepData.type})
            .next(file)
            .put({
                type: "file/register/request",
                payload: {
                    app_uid: action_opt1.payload.config.app_uid,
                    idField: action_opt1.payload.stepData.idField,
                    docUid: action_opt1.payload.stepData.docUid,
                    name: file.fileName,
                    path: file.path,
                    type: file.type + "/" + file.extension,
                    extension: file.extension
                }
            })
            .next()
            .take([actions.file.register.success, actions.file.register.error])
            .next()
            .select()
            .next({FileMobile: {register: []}})
            .call(pushNotification.show, [])
            .next()
            .isDone();

        testSaga(sagas['formRender/bridge/getPicture'], action_opt2)
            .next()
            .call(MobileControls.ImageControl.fromGallery, {mediaType: action_opt2.payload.stepData.type})
            .next(file)
            .put({
                type: "file/register/request",
                payload: {
                    app_uid: action_opt2.payload.config.app_uid,
                    idField: action_opt2.payload.stepData.idField,
                    docUid: action_opt2.payload.stepData.docUid,
                    name: file.fileName,
                    path: file.path,
                    type: file.type + "/" + file.extension,
                    extension: file.extension
                }
            })
            .next()
            .take([actions.file.register.success, actions.file.register.error])
            .next()
            .select()
            .next({FileMobile: {register: []}})
            .call(pushNotification.show, [])
            .next()
            .isDone();

        testSaga(sagas['formRender/bridge/getPicture'], action_opt3)
            .next()
            .call(MobileControls.ImageControl.fromCamera, {mediaType: action_opt3.payload.stepData.type})
            .next(file)
            .put({
                type: "file/register/request",
                payload: {
                    app_uid: action_opt3.payload.config.app_uid,
                    idField: action_opt3.payload.stepData.idField,
                    docUid: action_opt3.payload.stepData.docUid,
                    name: file.fileName,
                    path: file.path,
                    type: file.type + "/" + file.extension,
                    extension: file.extension
                }
            })
            .next()
            .take([actions.file.register.success, actions.file.register.error])
            .next()
            .select()
            .next({FileMobile: {register: []}})
            .call(pushNotification.show, [])
            .next()
            .isDone();
    });

    test('bridgeGetVideo*', async () => {
        const action_opt1 = {
                payload: {
                    config: {
                        app_uid: "00000000001"
                    },
                    stepData: {
                        idField: "123456789",
                        docUid: "",
                        type: "video"
                    }
                }
            },
            file = {
                fileName: "videoTest.mp4",
                path: "/downloads/videoTest.mp4",
                type: "video",
                extension: "mp4"
            };
        testSaga(sagas['formRender/bridge/getVideo'], action_opt1)
            .next()
            .call(MobileControls.ImageControl.showImagePicker, {mediaType: action_opt1.payload.stepData.type})
            .next(file)
            .put({
                type: "file/register/request",
                payload: {
                    app_uid: action_opt1.payload.config.app_uid,
                    idField: action_opt1.payload.stepData.idField,
                    docUid: action_opt1.payload.stepData.docUid,
                    name: file.fileName,
                    path: file.path,
                    type: file.type + "/" + file.extension,
                    extension: file.extension
                }
            })
            .next()
            .take([actions.file.register.success, actions.file.register.error])
            .next()
            .select()
            .next({FileMobile: {register: []}})
            .call(pushNotification.show, [])
            .next()
            .isDone();
    });

    test('bridgeOpenAudioRecord*', async () => {
        const action = {
            payload: {
                config: {
                    app_uid: "00000000001"
                },
                stepData: {
                    idField: "123456789",
                }
            }
        };
        testSaga(sagas["formRender/bridge/getAudio"], action)
            .next()
            .put({
                type: "formRender/audio/openMenu",
                payload: {status: true}
            })
            .next()
            .put({
                type: "formRender/audio/infoAudio",
                payload: {idField: "123456789", appUid: "00000000001"}
            })
            .next()
            .isDone();
    });

    test('getAudio*', () => {
        const action = {
                payload: {
                    path: "fakePath/audiFile.m4a"
                }
            },
            actionEmpty = {
                payload: null
            },
            state = {
                FormRender: {
                    audio:{
                        data: {
                            appUid: "123456789",
                            idField: "fk123456789",
                            docUid: "987654321",
                            type: "audio"
                        }
                    }
                },
                FileMobile: {
                    register: {}
                }
            },
            file = {
                name: "audio.m4a",
                path: "fakePath/audio.m4a",
                type: "audio/m4a",
                extension: "m4a"
            },
            {data} = state.FormRender.audio;

        testSaga(sagas["formRender/audio/selectAudio"], action)
            .next()
            .select()
            .next(state)
            .call(Utils.moveToAudioDirectory, action.payload.path)
            .next(file);

        testSaga(sagas["formRender/audio/selectAudio"], actionEmpty)
            .next()
            .select()
            .next(state)
            .call(MobileControls.FileControl.showPicker, "Choose a file")
            .next(file)
            .put({
                type: "formRender/audio/openControls",
                payload: {
                    status: false
                }
            })
            .next()
            .put({
                type: "formRender/audio/openMenu",
                payload: {
                    status: false
                }
            })
            .next()
            .put({
                type: "formRender/working",
                payload: {
                    status: true
                }
            })
            .next(file)
            .put({
                type: "file/register/request",
                payload: {
                    app_uid: data.appUid,
                    idField: data.idField,
                    docUid: data.docUid,
                    name: file.name,
                    path: file.path,
                    type: `${data.type}/${file.extension}`,
                    extension: file.extension
                }
            })
            .next()
            .take([actions.file.register.success, actions.file.register.error])
            .next()
            .select()
            .next(state)
            .put({
                type: "formRender/working",
                payload: {
                    status: false
                }
            })
            .next()
            .call(pushNotification.show, state.FileMobile.register)
            .next()
            .isDone();
    });

    test('bridgeOpenSignatureView*', async () => {
        const action = {
                payload: {
                    config: {
                        app_uid: "00000000001"
                    },
                    stepData: {
                        idField: "123456789",
                    }
                }
            };
        testSaga(sagas['formRender/bridge/getSignature'], action)
            .next()
            .put({
                type: "formRender/signature/show",
                payload: true
            })
            .next()
            .put({
                type: "formRender/signature/data",
                payload: {idField: '123456789', appUid: '00000000001'}
            })
            .next()
            .isDone();
    });

    test('injectSignature*', async () => {
        const action = {
                payload: {
                    pathName: "/some/path/signature.png"
                }
            },
            state = {
                FormRender: {
                    signature: {
                        data: {
                            appUid: "000122",
                            idField: "signature0001"
                        }
                    }
                }
            };
        testSaga(sagas['formRender/sendSignature'], action)
            .next()
            .select()
            .next(state)
            .call(RNFS.exists, 'test/FormRender/Data/000122')
            .next()
            .call(RNFS.mkdir, 'test/FormRender/Data/000122')
            .next()
            .call(RNFS.moveFile, '/some/path/signature.png', 'test/FormRender/Data/000122/signature0001.png')
            .next()
            .put({
                type: "file/register/request",
                payload: {
                    app_uid: state.FormRender.signature.data.appUid,
                    idField: state.FormRender.signature.data.idField,
                    docUid: "",
                    name: "signature.png",
                    path: 'test/FormRender/Data/000122/signature0001.png',
                    type: "image/png",
                    extension: "png"
                }
            })
            .next()
            .isDone();
    });

    test('bridgeOpenMapView*', () => {
        const action = {
            payload: {
                stepData: {
                    idField: ""
                }
            }
        };

        testSaga(sagas['formRender/bridge/getGeoTag'], action)
            .next()
            .put({
                type: "formRender/openMap",
                payload: {
                    status: true,
                    idField: action.payload.stepData.idField
                }
            })
            .next()
            .isDone();
    });

    test('injectCoordinates', () => {
        const action = {payload: {
                    caseIdTmp: "",
                    latitude: -16.345,
                    longitude: 68.005
                }
            },
            actionDefault = { payload: {}},
            state = {
                Net: {
                    isConnected: true
                }
            };

        testSaga(sagas['formRender/sendCoordinates'], actionDefault)
            .next();

        testSaga(sagas['formRender/sendCoordinates'], action)
            .next()
            .select()
            .next(state)
            .put({
                type: "formRender/openMap",
                payload: {
                    status: false,
                    idField: null
                }
            })
            .next()
            .put({
                type: "formRender/working",
                payload: {
                    status: true
                }
            })
            .next(state)
            .call(Utils.tryApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({}, action.payload, {app_uid: action.payload.caseIdTmp}),
                state,
                service: 'uploadLocation'
            })
            .next({
                response: [{
                    appDocFilename: "",
                    appDocUid: ""
                }]
            })
            .put({
                type: 'formRender/inject/setLocation',
                payload: {
                    flowStatus: 'setLocation',
                    location: {
                        caseIdTmp: '',
                        latitude: -16.345,
                        longitude: 68.005,
                        fileName: '',
                        id: ''
                    }
                }
            })
            .next()
            .put({
                type: "formRender/working",
                payload: {
                    status: false
                }
            })
            .next()
            .isDone();
    });

    test('bridgeSendFormData*', async () => {
        const caseTodo = {
                caseId: "0001",
                delIndex: "1",
                user: {
                    userId: "1"
                },
                task: {
                    taskId: "t001",
                    name: "task test",
                    autoRoot: "TRUE",
                    offlineEnabled: "TRUE",
                },
                process: {
                    processId: "p001",
                    name: "Process test"
                },
                caseNumber: "1",
                caseTitle: "Case test",
                date: "2018-07-01 16:25:31",
                delegateDate: "2018-07-01 16:25:31",
                prevUser: {
                    userId: "100",
                    userName: "Test",
                    firstName: "Data",
                    lastName: "Base",
                },
                dueDate: "2018-07-01 16:25:31",
                status: "none"
            },
            caseDraft = {
                caseId: "0001",
                delIndex: "1",
                user: {
                    userId: "1"
                },
                currentUser: {
                    userId: "100",
                    userName: "Test",
                    firstName: "Data",
                    lastName: "Base",
                },
                task: {
                    taskId: "t001",
                    name: "task test",
                    autoRoot: "TRUE",
                    offlineEnabled: "TRUE",
                },
                process: {
                    processId: "p001",
                    name: "Process test"
                },
                caseNumber: "1",
                caseTitle: "Case test",
                date: '2018-05-16 09:27:02',
                delegateDate: '2018-05-16 09:27:02',
                dueDate: '2018-05-16 09:27:02',
                status: CASE.STATUS.SENDING
            };
        let payload = {
                config: {
                    act_uid: "t001",
                    prj_uid: "p001",
                    dyn_uid: "dyn1",
                    app_uid: "0001",
                    del_index: "1"
                },
                stepData: {formId: "dyn1", data: "data"}
            },
            state = {
                Cases: {
                    todo: {
                        response: [{caseId: "0001"}]
                    },
                    draft: {
                        response: [{caseId: "0001"}]
                    }
                },
                FormRender: {
                    routeOffline: true
                },
                Net:{isConnected: true}
            };
        Models.Todo.saveList({todo: {response:[caseTodo]}});
        Models.Draft.saveList({data: {response:[caseDraft]}});
        testSaga(sagas["formRender/bridge/receiveFormData"], {payload: payload})
            .next({payload: payload})
            .select()
            .next(state)
            .put({
                type: "formRender/routeOffline",
                payload: {routeOffline: false}
            })
            .next()
            .isDone()
    });

    test('askWhichDataToUse*', async () => {
        testSaga(sagas["formRender/bridge/askWhichDataToUse"])
            .next()
            .put({
                type: "formRender/dataAvailable",
                payload: true
            })
            .next()
            .isDone()
    });

    test('downloadFile*', async () => {
        let payload = {
                config: {
                    app_uid: "0001"
                },
                stepData: {
                    docUID: "doc001",
                    name: "file001",
                    version: 1
                }
            },
            dataFile = {
                response: {
                    data: "path/file",
                    info: () => ({
                        headers: {
                            "Content-Type": "image/jpg"
                        }
                    })
                }
            };
        testSaga(sagas["formRender/bridge/downloadFile"], {payload: payload})
            .next({payload})
            .select()
            .next({payload})
            .call(Utils.newNameIfExist, '', 'file001')
            .next(`1-${payload.stepData.name}`)
            .put({
                type: "formRender/download/progress",
                payload: 0
            })
            .next()
            .put({
                type: "formRender/download/file",
                payload: {
                    app_uid: '0001',
                    app_doc_uid: 'doc001',
                    name: '1-file001',
                    version: 1
                }
            })
            .next()
            .put({
                type: "formRender/download/show",
                payload: true
            })
            .next()
            .call(Utils.tryApiRequest, {
                wsManager: WsManager,
                payload: {
                    app_uid: "0001",
                    app_doc_uid: "doc001",
                    name: '1-file001',
                    version: 1
                },
                state: {payload},
                service: 'downloadFile'
            })
            .next(dataFile)
            .put({
                type: "formRender/download/show",
                payload: false
            })
            .next()
            .call(FileOpener.open, dataFile.response.data, dataFile.response.info().headers["Content-Type"] )
            .next()
            .isDone()
    });
});
