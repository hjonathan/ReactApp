import caseNotes from "../../App/Effects/caseNotes";
import actions from "../../App/Actions";
import reducers from "../../App/Reducers";
import * as Api from "../../App/Services/Api";

describe("Reducer caseNotes.js", async () => {
    let WsManager,
        sagas;
    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = caseNotes(WsManager);
    });

    test("actions.caseNotes.success", () => {
        const notes = [];
        expect(reducers({}, {
            type: "caseNotes/success",
            payload: {notes}
        }))
            .toBeTruthy();
    });

    test("actions.postCaseNote.success", async () => {
        expect(reducers({}, {
            type: "postCaseNote/success",
            payload: {status: true}
        }))
            .toBeTruthy();
    });

    test("actions.postCaseNote.error", async () => {
        expect(reducers({}, {
            type: "postCaseNote/error",
            payload: {error: true}
        }))
            .toBeTruthy();
    });

    test("actions.notesUsers.success", async () => {
        expect(reducers({}, {
            type: "notesUsers/success",
            payload: {response: {}}
        }))
            .toBeTruthy();
    });
});
