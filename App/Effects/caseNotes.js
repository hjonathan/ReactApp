import {call, put, select} from "redux-saga/effects";
import actions from "../Actions";
import Utils from "../Utils";

export default (WsManager) => {
    /**
     * Function Generator for cases notes request
     * @param action
     */
    function* caseNotesRequest (action) {
        let state = yield select();
        try {
            const caseNotesList = yield call(WsManager.casesNotes, Utils.mergePropsStateApi(state), action.payload);
            if (caseNotesList.error) {
                yield put(actions.caseNotes.error(this.tryError(postCaseNote.error)));
            } else {
                yield put(actions.caseNotes.success(caseNotesList));
            }
        } catch (e) {
            yield put(actions.caseNotes.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Function Generator for post a case note request
     * @param action
     */
    function* postCaseNote (action) {
        let state = yield select();
        try {
            const postCaseNotes = yield call(WsManager.postCaseNote, Utils.mergePropsStateApi(state), action.payload);
            if (postCaseNotes.error) {
                yield put(actions.postCaseNote.success({
                    status: null
                }));
                yield put(actions.postCaseNote.error({
                    error: postCaseNotes.error.code,
                    error_description: postCaseNotes.error.message
                }));
            } else {
                yield put(actions.postCaseNote.success({
                    status: "ok"
                }));
                yield put(actions.postCaseNote.error({
                    error: null,
                    error_description: ""
                }));
            }
        } catch (e) {
            yield put(actions.postCaseNote.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Function Generator for post a case note request
     * @param action
     */
    function* requestDataUsers (action) {
        let state = yield select();
        try {
            yield call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: action.payload,
                state,
                service: "userDataRequest",
                action: actions.notesUsers
            });
        } catch (e) {
            yield put(actions.notesUsers.error({error: "error", error_description: e.toString()}));
        }
    }

    return {
        [actions.caseNotes.request]: caseNotesRequest,
        [actions.postCaseNote.request]: postCaseNote,
        [actions.notesUsers.request]: requestDataUsers
    };
};
