import Utils from "../../App/Utils/api";

describe('Utils api', () => {
    test('mergePropsStateApi', () => {
        let state = {
            Settings: {server: {ws: "ws"}, config: {conf: "conf"}},
            Oauth: {credentials: {token: "token"}}
        };
        expect(Utils.mergePropsStateApi(state)).toEqual({
            ws: "ws",
            token: "token"
        });
    });
    test('getSettings', () => {
        let state = {
            Settings: {server: {ws: "ws"}, config: {conf: "conf"}},
            Oauth: {credentials: {token: "token"}}
        };
        expect(Utils.getSettings(state)).toEqual({server: {ws: "ws"}, config: {conf: "conf"}});
    });
    test('tryError', () => {
        let error = {
            code: 400,
            message: "message"
        };
        expect(Utils.tryError(error)).toEqual({
            error: 400,
            error_description: "message"
        });
    });
});