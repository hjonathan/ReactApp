import reducers from "../../App/Reducers/settings";

describe("Reducer Settings.js", () => {
    let defaultState;
    beforeEach(() => {
        defaultState = {
            server: {
                workspace: "workflow",
                url: "http://processmaker.net",
                lang: "en",
                clientId: "12345678910",
                clientSecret: "10987654321"
            }
        }
    });
    test("actions.settings.updateUrl", () => {
        expect(reducers(defaultState, {
            type: "settings/updateUrl",
            payload: {
                url: "htts://new-url.com"
            }
        })).toEqual({
            server: {
                url: "htts://new-url.com",
                workspace: "workflow",
                clientId: "12345678910",
                clientSecret: "10987654321"
            },
            error: null
        });
    });
    test("actions.settings.updateWorkspace", () => {
        expect(reducers(defaultState, {
            type: "settings/updateWorkspace",
            payload: {
                workspace: "worspace2"
            }
        })).toEqual({
            server: {
                url: "http://processmaker.net",
                workspace: "worspace2",
                clientId: "12345678910",
                clientSecret: "10987654321"
            },
            error: null
        });
    });
    test("actions.settings.updateSettings", () => {
        expect(reducers(defaultState, {
            type: "settings/updateSettings",
            payload: {
                url: "htts://new-url.com",
                workspace: "worspace2",
                lang: "fr"
            }
        })).toEqual({
            server: {
                url: "htts://new-url.com",
                workspace: "worspace2",
                lang: "fr",
                clientId: "12345678910",
                clientSecret: "10987654321"
            },
            error: null
        });
    });
    test("actions.settings.error", () => {
        expect(reducers({}, {
            type: "settings/error",
            payload: {
                error: ""
            }
        })).toEqual({error: ""});
    });
});