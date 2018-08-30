import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {
    flowStatus: null,
    nextStep: {
        data: null,
        path: null,
        error: null
    },
    routed: {
        isRouted: false,
        users: null
    },
    formPath: null,
    formDataPath: null,
    stepData: null,
    dataFile: null,
    fileInput: null,
    fileVersions: null,
    routeCase: null,
    routeOffline: false,
    dataAvailable: false,
    requestMap: null,
    working: {
        status: false
    },
    signature: {
        show: false,
        data: null
    },
    audio: {
        menu: false,
        panel: false,
        data: null
    },
    download: {
        show: false,
        progress: 0,
        file: null
    }
};

export default handleActions(
    {
        /**
         * Reducer for formRender/nextStep/success action
         * @param state
         * @param action
         * @returns {*}
         */
        [actions.formRender.nextStep.success]: (state, action) => ({
            ...state,
            nextStep: {
                ...state.nextStep,
                data: action.payload.status.response
            },
            flowStatus: null
        }),
        /**
         * Reducer for formRender/nextStep/error action
         * @param state
         * @param action
         */
        [actions.formRender.nextStep.error]: (state, action) => ({
            ...state,
            nextStep: {
                ...state.nextStep,
                error: action.payload.error
            },
            flowStatus: null
        }),
        /**
         * Reducer for formRender/nextStep/reset action
         * @param state
         * @param action
         */
        [actions.formRender.nextStep.reset]: (state, action) => ({
            ...state,
            nextStep: {
                data: null,
                path: null,
                error: null
            },
            flowStatus: null
        }),
        /**
         * Reducer for formRender/inject/continueStep action
         * @param state
         * @param action
         * @returns {*}
         */
        [actions.formRender.inject.continueStep]: (state, action) => Object.assign({}, state, {
            flowStatus: action.payload.flowStatus,
            nextStep: {
                ...state.nextStep,
                path: action.payload.nextStepPath
            },
            requestMap: null
        }),
        /**
         * Reducer for formRender/inject/loadForm action
         * @param state
         * @param action
         * @returns {*}
         */
        [actions.formRender.inject.loadForm]: (state, action) => Object.assign({}, state, {
            flowStatus: action.payload.flowStatus,
            formPath: action.payload.formPath
        }),
        /**
         * Reducer for formRender/inject/setFormData action
         * @param state
         * @param action
         * @returns {*}
         */
        [actions.formRender.inject.setFormData]: (state, action) => Object.assign({}, state, {
            flowStatus: action.payload.flowStatus,
            formDataPath: action.payload.formDataPath,
            stepData: action.payload.stepData
        }),
        /**
         * formRender/inject/setFiles
         * @param state
         * @param action
         * @returns {{flowStatus, dataFile: {}}}
         */
        [actions.formRender.inject.setFiles]: (state, action) => ({
            ...state,
            flowStatus: action.payload.flowStatus,
            dataFile: action.payload.response || null
        }),
        /**
         * formRender/inject/setFileVersions
         * @param state
         * @param action
         * @returns {{flowStatus, fileVersions: []}}
         */
        [actions.formRender.inject.setFileVersions]: (state, action) => ({
            ...state,
            flowStatus: action.payload.flowStatus,
            fileVersions: action.payload.response
        }),
        /**
         * formRender/inject/setLocation
         * @param state
         * @param action
         * @returns {{flowStatus: *, location: *}}
         */
        [actions.formRender.inject.setLocation]: (state, action) => ({
            ...state,
            flowStatus: action.payload.flowStatus,
            location: action.payload.location,
            requestMap: null
        }),
        /**
         * formRender/openMap
         * @param state
         * @param action
         * @returns {{requestMap: *}}
         */
        [actions.formRender.openMap]: (state, action) => ({
            ...state,
            requestMap: {
                status: action.payload.status,
                idField: action.payload.idField
            }
        }),
        /**
         * Reducer for formRender/inject/getFormData
         * @param state
         * @param action
         * @returns {{flowStatus: *}}
         */
        [actions.formRender.inject.getFormData]: (state, action) => ({
            ...state,
            flowStatus: action.payload.flowStatus
        }),
        /**
         * Reducer for formRender/inject/hideFieldLoading
         * @param state
         * @param action
         * @returns {{flowStatus: *, fileInput: *}}
         */
        [actions.formRender.inject.hideFieldLoading]: (state, action) => ({
            ...state,
            flowStatus: action.payload.flowStatus,
            fileInput: action.payload.fileInput
        }),
        /**
         * Reducer for formRender/inject/setCacheLibraryMap action
         * @param state
         * @param action
         * @returns {{signature: {}}}
         */
        [actions.formRender.inject.setCacheLibraryMap]: (state, action) => ({
            ...state,
            flowStatus: action.payload.flowStatus
        }),
        /**
         * Reducer for formRender/routed/route action
         * @param state
         * @param action
         * @returns {*}
         */
        [actions.formRender.routed.route]: (state, action) => ({
            ...state,
            routed: {
                ...state.routed,
                isRouted: action.payload.isRouted
            },
            requestMap: null
        }),
        /**
         * Reducer for formRender/routed/users action
         * @param state
         * @param action
         * @returns {{routeCase: {}, assigmentInfo: {}}}
         */
        [actions.formRender.routed.users]: (state, action) => ({
            ...state,
            routed: {
                ...state.routed,
                users: Object.assign({}, state.routed.users, action.payload)
            },
            requestMap: null
        }),
        /**
         * Reducer for formRender/reset action
         * @param state
         * @param action
         * @returns {*}
         */
        [actions.formRender.reset]: () => (initialState),
        /**
         * Reducer for formRender/newCase action
         * @param state
         * @param action
         * @returns {*}
         */
        [actions.formRender.newCase]: (state, action) => Object.assign({}, state, {
            routeCase: false
        }),
        /**
         * Reducer for formRender/routeOffline action
         * @param state
         * @param action
         * @returns {{routeOffline: (boolean|actions.formRender.routeOffline)}}
         */
        [actions.formRender.routeOffline]: (state, action) => ({
            ...state,
            routeOffline: action.payload.routeOffline,
            requestMap: null
        }),
        /**
         * Reducer for formRender/dataAvailable action
         * @param state
         * @param action
         * @returns {{dataAvailable: (boolean)}}
         */
        [actions.formRender.dataAvailable]: (state, action) => ({
            ...state,
            dataAvailable: action.payload
        }),
        /**
         * Reducer for formRender/working
         * @param state
         * @param action
         * @returns {{working: {status: *}}}
         */
        [actions.formRender.working]: (state, action) => ({
            ...state,
            working: {
                ...state,
                status: action.payload.status
            }
        }),
        /**
         * Reducer for formRender/signature/show action
         * @param state
         * @param action
         * @returns {{signature: {}}}
         */
        [actions.formRender.signature.show]: (state, action) => ({
            ...state,
            signature: {
                show: action.payload,
                data: null
            }
        }),
        /**
         * Reducer for formRender/signature/data action
         * @param state
         * @param action
         * @returns {{signature: {}}}
         */
        [actions.formRender.signature.data]: (state, action) => ({
            ...state,
            signature: {
                ...state.signature,
                data: action.payload
            }
        }),
        /**
         * Reducer for formRender/audio/openMenu
         * @param state
         * @param action
         * @returns {{audio: {menu: *, data: null}}}
         */
        [actions.formRender.audio.openMenu]: (state, action) => ({
            ...state,
            audio: {
                ...state.audio,
                menu: action.payload.status
            }
        }),
        /**
         * Reducer for formRender/audio/openControls
         * @param state
         * @param action
         * @returns {{audio: {panel: *, data: null}}}
         */
        [actions.formRender.audio.openControls]: (state, action) => ({
            ...state,
            audio: {
                ...state.audio,
                panel: action.payload.status
            }
        }),
        /**
         * Reducer for formRender/audio/infoAudio
         * @param state
         * @param action
         * @returns {{audio: {data: *}}}
         */
        [actions.formRender.audio.infoAudio]: (state, action) => ({
            ...state,
            audio: {
                ...state.audio,
                data: action.payload
            }
        }),
        /**
         * Reducer for formRender/download/file action
         * @param state
         * @param action
         * @returns {{signature: {}}}
         */
        [actions.formRender.download.file]: (state, action) => ({
            ...state,
            download: {
                ...state.download,
                file: action.payload
            }
        }),
        /**
         * Reducer for formRender/download/show action
         * @param state
         * @param action
         * @returns {{signature: {}}}
         */
        [actions.formRender.download.show]: (state, action) => ({
            ...state,
            download: {
                ...state.download,
                show: action.payload
            }
        }),
        /**
         * Reducer for formRender/download/progress action
         * @param state
         * @param action
         * @returns {{signature: {}}}
         */
        [actions.formRender.download.progress]: (state, action) => ({
            ...state,
            download: {
                ...state.download,
                progress: action.payload
            }
        })
    },
    initialState
);
