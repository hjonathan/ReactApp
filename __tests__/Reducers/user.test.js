import reducers from "../../App/Reducers/user";

describe("Reducer Settings.js", () => {
    test("actions.userData.success", () => {
        expect(reducers({}, {
            type: "userData/success",
            payload: {
                status: {}
            }
        })).toEqual({});
    });
});