import reducers from "../../App/Reducers/Login";

describe("Reducer login.js", () => {
    test("actions.login.success", () => {
        expect(reducers({}, {
            type: "login/success",
            payload: {
                credentials: {}
            }
        })).toEqual({
            credentials: {},
            error: null,
            isLoggedIn: true
        });
    });
    test("actions.login.error", () => {
        expect(reducers({}, {
            type: "login/error",
            payload: {
                error: {}
            }
        })).toEqual({
            error: {}
        });
    });
    test("actions.credentials.update", () => {
        expect(reducers({}, {
            type: "credentials/update",
            payload: {}
        })).toEqual({
            credentials: {},
            error: null
        });
    });
    test("actions.logout.success", () => {
        expect(reducers({}, {
            type: "logout/success"
        })).toEqual({
            credentials: null,
            error: null,
            isLoggedIn: false,
            isGoogleLoggedIn: false
        });
    });
    test("actions.googleLogin.success", () => {
        expect(reducers({}, {
            type: "googleLogin/success",
            payload: {
                credentials: {}
            }
        })).toEqual({
            credentials: {},
            error: null,
            isLoggedIn: true,
            isGoogleLoggedIn: true
        });
    });
    test("actions.oauth.reset", () => {
        expect(reducers({}, {
            type: "oauth/reset"
        })).toEqual({
            isLoggedIn: false,
            isGoogleLoggedIn: false,
            credentials: null,
            error: null
        });
    });
});