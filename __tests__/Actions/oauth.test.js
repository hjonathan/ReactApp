import {createActions} from "redux-actions"
import oauth from "../../App/Actions/oauth"

const actions = createActions(oauth);
describe('Actions Oauth', () => {
    test('Actions for Login (Service)', () => {
        expect(actions.login.request()).toEqual({type: "login/request"});
        expect(actions.login.success({})).toEqual({type: "login/success", payload: {credentials: {}}});
        expect(actions.login.error({})).toEqual({type: "login/error", payload: {error: {}}});
    });

    test('Actions for Logout (Service)', () => {
        expect(actions.logout.request()).toEqual({type: "logout/request"});
        expect(actions.logout.success({})).toEqual({type: "logout/success", payload: {status: {}}});
        expect(actions.logout.error({})).toEqual({type: "logout/error", payload: {error: {}}});
    });

    test('Actions for Google SigIn (Service)', () => {
        expect(actions.googleLogin.request()).toEqual({type: "googleLogin/request"});
        expect(actions.googleLogin.success({})).toEqual({type: "googleLogin/success", payload: {status: {}}});
    });

    test('Actions for Credentials (Local)', () => {
        expect(actions.credentials.update()).toEqual({type: "credentials/update"});
        expect(actions.credentials.refresh()).toEqual({type: "credentials/refresh"});
    });
});