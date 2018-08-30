import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {
    token: {},
    device: {},
    error: null
};

export default handleActions(
    {
        /**
         * Reducer for "token/save" action
         * @param state
         * @param action
         */
        [actions.notification.token.save]: (state, action) => ({
            ...state,
            token: action.payload
        }),

        /**
         * Reducer for "device/success" action
         * @param state
         * @param action
         */
        [actions.notification.device.success]: (state, action) => ({
            ...state,
            device: action.payload
        })
    },
    initialState
);
