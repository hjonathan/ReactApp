import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {
    server: {
        info: null,
        error: null
    }
};

export default handleActions(
    {
        /**
         * Reducer for formData/local/save action
         * @param state
         * @param action
         * @returns {{}}
         */
        [actions.formData.local.save]: (state, action) => ({
            ...state,
            [action.payload.app_uid]: action.payload.data
        }),
        /**
         * Reducer for formData/server/error action
         * @param state
         * @param action
         * @returns {{}}
         */
        [actions.formData.server.error]: (state, action) => ({
            ...state,
            server: {
                ...state.server,
                error: action.payload.error
            }
        })
    },
    initialState
);
