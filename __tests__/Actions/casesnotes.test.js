import actions from "../../App/Actions"

describe('Actions Cases Notes', () => {
    test('Actions for cases notes (Service)', () => {
        expect(actions.caseNotes.request()).toEqual({type: "caseNotes/request"});
        expect(actions.caseNotes.success({})).toEqual({type: "caseNotes/success", payload: {notes: {}}});
        expect(actions.caseNotes.error({})).toEqual({type: "caseNotes/error", payload: {error: {}}});

        expect(actions.postCaseNote.request()).toEqual({type: "postCaseNote/request"});
        expect(actions.postCaseNote.success("")).toEqual({type: "postCaseNote/success", payload: ""});
        expect(actions.postCaseNote.error({})).toEqual({type: "postCaseNote/error", payload: {error: {}}});

        expect(actions.notesUsers.request()).toEqual({type: "notesUsers/request"});
        expect(actions.notesUsers.success("")).toEqual({type: "notesUsers/success", payload: ""});
        expect(actions.notesUsers.error({})).toEqual({type: "notesUsers/error", payload: {error: {}}});
    });
});
