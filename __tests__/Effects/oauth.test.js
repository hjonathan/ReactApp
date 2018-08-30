import {takeEvery, delay, runSaga} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import oauth from '../../App/Effects/oauth'
import actions from "../../App/Actions"
import sinon from "sinon"
import * as Api from "../../App/Services/Api"
jest.mock('react-native-fs', () => require.requireActual('../../__mocks__/react-native-fs').default);
jest.mock('react-native-google-signin', () => require.requireActual('../../__mocks__/react-native-google-signin').default);
import {GoogleSignin} from "react-native-google-signin";

describe('Effect oauth.js', async () => {
    let WsManager,
        sagas;
    const initState = {
        Settings: {
            server: {
                url: "https://poc-1.processmaer.net",
                workspace: "workflowpoc1"
            }
        },
        Oauth: {
            isGoogleLoggedIn: false,
        },
        Net: {isConnected: true}
    };

    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = oauth(WsManager);
    });

    test('loginRequest*', async () => {
        let actionFake = {
                username: "",
                password: ""
            }, dispatched = [],
            myApi = sinon.stub(WsManager, 'login').callsFake(() => {
                return {username:'Perez'}
            });
        sinon.stub(WsManager, 'userData').callsFake(() => ({
            message: 'Deleted Successfully'
        }));
        sinon.stub(WsManager, 'countersRequest').callsFake(() => ({
            message: 'Deleted Successfully'
        }));
        let result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => (initState),
        }, sagas["login/request"], actions.login.request(actionFake)).done;
        expect(WsManager.login(actionFake)).toEqual({username:'Perez'});
        myApi.throws();
    });

    test('logoutRequest*', async () => {
        let actionFake = {}, dispatched = [];
        let myApi = sinon.stub(WsManager, 'logout').callsFake(() => ({}));
        sinon.stub(WsManager, 'resetNotification').callsFake(() => ({
            message: 'Deleted Successfully'
        }));
        let result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => (initState),
        }, sagas["logout/request"], actions.logout.request(actionFake)).done;
        expect(WsManager.logout(actionFake)).toEqual({});
        expect(WsManager.resetNotification(actionFake)).toEqual({message: 'Deleted Successfully'});
        expect(myApi.callsArg(1, actionFake)).toBeTruthy();
    });

    test('googleLoginRequest*', async () => {
        var actionFake = {
                mail: "user@processmaker.com",
                token: "ya2....",
                clientid: "102450706706553549571"
            }, dispatched = [],
            myApi = sinon.stub(WsManager, 'googleLogin').callsFake(() => {
                return "test";
            });
        let result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({state: 'test'}),
        }, sagas["googleLogin/request"], actions.login.request(actionFake));

        result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({state: 'test'}),
        }, sagas["googleLogin/request"], actions.login.request(actionFake));
        expect(myApi.callsArg(1, actionFake)).toBeTruthy();
    });
});
