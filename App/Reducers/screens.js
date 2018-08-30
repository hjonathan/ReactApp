import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {
    All: {
        disableItemList: null
    }
};

export default handleActions(
    {
        /**
         *
         * @param state
         * @param action
         */
        [actions.screens.all.disableItemList]: (state, action) => ({
            ...state,
            All: {
                disableItemList: action.payload
            }
        })
    },
    initialState
);
