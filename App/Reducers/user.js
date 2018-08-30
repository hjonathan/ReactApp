import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {};
export default handleActions(
    {
        /**
         * Reducer for "userData/success" action
         * @param state
         * @param action
         */
        [actions.userData.success]: (state, action) => action.payload.status
    },
    initialState
);
