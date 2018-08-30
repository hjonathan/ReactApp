import {createActions} from "redux-actions"
import settings from "../../App/Actions/screens"

const actions = createActions(settings);
describe('Actions Settings', () => {
    test('Actions for Settings (Service)', () => {
        expect(actions.screens.all.disableItemList()).toEqual({type: "screens/all/disableItemList"});
    });
});