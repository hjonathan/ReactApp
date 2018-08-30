import {takeEvery, delay, runSaga} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import oauth from '../../App/Effects/oauth'
import actions from "../../App/Actions"
import sinon from "sinon"
import Utils from "../../App/Utils"
import * as Api from "../../App/Services/Api"
jest.mock('react-native-fs', () => require.requireActual('../../__mocks__/react-native-fs').default);

describe('Effects', async () => {
    let WsManager,
        sagas;
    beforeAll(() => {
        WsManager = Api.default({}, {});
    });

    test('tryEffectsApiRequest*', async () => {
        var dispatched = [];
        sinon.stub(Utils, 'mergePropsStateApi').callsFake(() => ({}));
        sinon.stub(Utils, 'tryError').callsFake(() => ({}));

        sinon.stub(WsManager, 'login').callsFake(function (arg1, arg2) {
            if (arg2.test) {
                return {};
            } else {
                return {error: "error"};
            }
        });
        let result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({state: 'test'}),
        }, Utils.tryEffectsApiRequest, {
            wsManager: WsManager,
            payload: {},
            state: {},
            service: "login",
            action: actions.login
        }).done.then((ac) => {
            expect(ac).toEqual({error: "error"});
        });

        result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({state: 'test'}),
        }, Utils.tryEffectsApiRequest, {
            wsManager: WsManager,
            payload: {test: "test"},
            state: {},
            service: "login",
            action: actions.login
        }).done.then((ac) => {
            expect(ac).toEqual({"params": {"test": "test"}, "response": {}});
        });

    });
});