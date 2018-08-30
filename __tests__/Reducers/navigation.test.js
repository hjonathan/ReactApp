import combineReducers from "../../App/Reducers/index";

describe("Reducer navigationReducer.js", () => {
    test("navigationReducer", () => {
        expect(typeof combineReducers).toEqual("function");
    });
});