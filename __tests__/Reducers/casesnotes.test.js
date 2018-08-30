import reducers from "../../App/Reducers/caseNotes";

describe("Reducer casesNotes.js", () => {
    test("actions.caseNotes.success", () => {
        expect(reducers({}, {
            type: "caseNotes/success",
            payload: {
                notes: []
            }
        })).toEqual({
            notes: []
        });
    });
    test("actions.postCaseNote.success", () => {
        expect(reducers({}, {
            type: "postCaseNote/success",
            payload: {
                status: {}
            }
        })).toEqual({
            status: {}
        });
    });
    test("actions.postCaseNote.error", () => {
        expect(reducers({}, {
            type: "postCaseNote/error",
            payload: {
                error: {}
            }
        })).toEqual({
            error: {}
        });
    });
});