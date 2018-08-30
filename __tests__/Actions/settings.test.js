import {createActions} from "redux-actions"
import settings from "../../App/Actions/settings"

const actions = createActions(settings);
describe('Actions Settings', () => {
    test('Actions for Settings (Service)', () => {
        expect(actions.settings.updateUrl()).toEqual({type: "settings/updateUrl"});
        expect(actions.settings.updateWorkspace()).toEqual({type: "settings/updateWorkspace"});
        expect(actions.settings.updateSettings()).toEqual({type: "settings/updateSettings"});
        expect(actions.settings.backButtonPressed()).toEqual({type: "settings/backButtonPressed"});
    });
});
