import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {
    isConnected: false,
    progressShow: false,
    isUploadCase: false
};

export default handleActions(
    {
        /**
         * Reducer for action net/connection/update
         * @param state
         * @param action
         * @returns {{}}
         */
        [actions.net.connected.update]: (state, action) => ({
            ...state,
            isConnected: action.payload.isConnected
        }),
        /**
         * Reducer for action net/progressDialog
         * @param state
         * @param action
         * @returns {{}}
         */
        [actions.net.progressDialog]: (state, action) => ({
            ...state,
            progressShow: action.payload
        }),
        /**
         * Reducer for action net/syncUp/upload
         * @param state
         * @param action
         * @returns {{}}
         */
        [actions.net.syncUp.upload]: (state, action) => ({
            ...state,
            isUploadCase: action.payload
        })
    },
    initialState
);
