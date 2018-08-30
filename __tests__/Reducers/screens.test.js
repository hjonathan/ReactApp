import reducers from "../../App/Reducers/screens";

describe("Reducer screens.js", () => {
    test("actions.screens.all.disableItemList", () => {
        expect(reducers({}, {
            type: "screens/all/disableItemList",
            payload: {}
        })).toEqual({
            All: {
                disableItemList: {}
            }
        });
    });
});