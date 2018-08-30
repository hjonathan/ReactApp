import {handleActions} from "redux-actions";
import actions from "../Actions";
import defaultPreferences from "../conf.json";

const initialState = {
    server: {
        workspace: null,
        url: null,
        lang: defaultPreferences.lang,
        clientId: defaultPreferences.clientId,
        clientSecret: defaultPreferences.clientSecret
    },
    error: null
};

export default handleActions(
    {
        /**
         * Reducer for "settings/updateUrl" action
         * @param state
         * @param action
         */
        [actions.settings.updateUrl]: (state, action) => ({
            ...state,
            server: {
                url: action.payload.url,
                workspace: state.server.workspace,
                clientId: state.server.clientId,
                clientSecret: state.server.clientSecret
            },
            error: null
        }),
        /**
         * Reducer for "settings/updateWorkspace"
         * @param state
         * @param action
         */
        [actions.settings.updateWorkspace]: (state, action) => ({
            ...state,
            server: {
                url: state.server.url,
                workspace: action.payload.workspace,
                clientId: state.server.clientId,
                clientSecret: state.server.clientSecret
            },
            error: null
        }),
        /**
         * Reducer for "settings/updateSettings" action
         * @param state
         * @param action
         */
        [actions.settings.updateSettings]: (state, action) => ({
            ...state,
            server: {
                url: action.payload.url,
                workspace: action.payload.workspace,
                lang: action.payload.lang,
                clientId: state.server.clientId,
                clientSecret: state.server.clientSecret
            },
            error: null
        }),
        /**
         * Reducer for "settings/error" action
         * @param state
         * @param action
         */
        [actions.settings.error]: (state, action) => ({
            ...state,
            error: action.payload.error
        })
    },
    initialState
);
