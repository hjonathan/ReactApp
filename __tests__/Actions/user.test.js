import {createActions} from "redux-actions"
import user from "../../App/Actions/user"

const actions = createActions(user);

describe('Actions User', () => {
    test('Actions for User Information', () => {
        expect(actions.userData.request()).toEqual({type: "userData/request"});
        expect(actions.userData.success({})).toEqual({type: "userData/success", payload: {status: {}}});
        expect(actions.userData.error({})).toEqual({type: "userData/error", payload: {error: {}}});
    });
});