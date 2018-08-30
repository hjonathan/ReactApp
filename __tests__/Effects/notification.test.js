import {takeEvery, delay, runSaga} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import notification from '../../App/Effects/notification'
import actions from "../../App/Actions"
import sinon from "sinon"
import * as Api from "../../App/Services/Api"

describe('Effect notification.js', async () => {
    let WsManager,
        sagas;
    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = notification(WsManager);
    });
    test('getDeviceIdOfServer*', async () => {
        const initState = {
            Settings: {
                error: {
                    error: "",
                    error_description: ""
                },
                server: {
                    url: "https://poc-1.processmaer.net",
                    workspace: "workflowpoc1"
                }
            },
            Oauth: {
                error: {
                    error: "error",
                    error_description: "error_description"
                }
            }
        };
        let actionFake = {
                token: {
                    token: '123456789',
                    os: 'android'
                },
            }, dispatched = [],
            myApi = sinon.stub(WsManager, 'saveToken').callsFake(() => ({
                devUid: '123456'
            }));
        let result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => (initState),
        }, sagas["notification/device/request"], actions.notification.device.request()).done;
        expect(WsManager.saveToken(actionFake)).toEqual({devUid: '123456'});
        expect(dispatched).toEqual([actions.notification.device.success({devUid: '123456'})]);
        myApi.throws();
        myApi.restore();
        expect(WsManager.saveToken(actionFake)).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null,});
        myApi.restore();
        result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({}),
        }, sagas["notification/device/request"], actions.notification.device.request()).done;
        expect(dispatched).toEqual([
            actions.notification.device.success({devUid: '123456'}),
            actions.notification.device.error({
                "error": "error",
                "error_description": "TypeError: Cannot read property 'server' of undefined"
            })
        ]);
    });
});