import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {
    app_uid: null,
    notes: [],
    users: [],
    error: null
};
export default handleActions(
    {
        /**
         * Reducer for "caseNotes/success" action
         * @param state
         * @param action
         */
        [actions.caseNotes.success]: (state, action) => ({
            ...state,
            notes: action.payload.notes
        }),
        /**
         * Reducer for "postCaseNote/success" action
         * @param state
         * @param action
         */
        [actions.postCaseNote.success]: (state, action) => ({
            ...state,
            status: action.payload.status
        }),
        /**
         * @param state
         * @param action
         */
        [actions.notesUsers.success]: (state, action) => ({
            ...state,
            users: action.payload.response
        }),
        /**
         * Reducer for "postCaseNote/error" action
         * @param state
         * @param action
         */
        [actions.postCaseNote.error]: (state, action) => ({
            ...state,
            error: action.payload.error
        })
    },
    initialState
);
