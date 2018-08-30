import reducers from "../../App/Reducers/formData";

describe("Reducer formData.js", () => {
    test("actions.formData.local.save", () => {
        expect(reducers({}, {
            type: "formData/local/save",
            payload: {
                data: {},
                app_uid: "123"
            }
        })).toEqual({
            "123": {}
        });
    });
    test("actions.formData.server.error", () => {
        expect(reducers({}, {
            type: "formData/server/error",
            payload: {
                error: {}
            }
        })).toEqual({
            server: {
                error: {}
            }
        });
    });
});
