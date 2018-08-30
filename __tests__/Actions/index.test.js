import {createActions} from "redux-actions"
import actions from "../../App/Actions/index"

describe('Actions', () => {
    test('CreateActions', () => {
        expect(actions).toBeInstanceOf(Object);
        expect(actions.login).toBeDefined();
        expect(actions.googleLogin).toBeDefined();
        expect(actions.credentials).toBeDefined();
        expect(actions.settings).toBeDefined();
    });
});