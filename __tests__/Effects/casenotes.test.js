import {testSaga} from "redux-saga-test-plan";
import casesNotes from '../../App/Effects/caseNotes';
import actions from "../../App/Actions";
import * as Api from "../../App/Services/Api";
import Utils from "../../App/Utils";

describe('Effect caseNotes', async () => {
    const actionFake = {},
        payload = {},
        state = {
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
            Oauth: {credentials: {token: "token"}}
        };
    let WsManager,
        sagas,
        key,
        params;
    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = casesNotes(WsManager);
        key = {access_token: ""};
        params = {
            app_uid: "123456789"
        };
    });

    test('caseNotesRequest*', async () => {
        testSaga(sagas["caseNotes/request"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(WsManager.casesNotes, Utils.mergePropsStateApi(state), actionFake)
            .next({params: {}})
            .put({
                type: "caseNotes/success",
                payload: {
                    notes: {
                        params: {}
                    }
                }
            })
            .next()
            .isDone();
        testSaga(sagas["caseNotes/request"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(WsManager.casesNotes, Utils.mergePropsStateApi(state), actionFake)
            .next({error: {}})
            .put({
                type: "caseNotes/error",
                payload: {
                    error: {
                        error: 'error',
                        error_description: 'TypeError: this.tryError is not a function'
                    }
                }
            })
            .next()
            .isDone();
    });

    test('postCaseNote*', async () => {
        testSaga(sagas["postCaseNote/request"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(WsManager.postCaseNote, Utils.mergePropsStateApi(state), actionFake)
            .next({})
            .put({
                type: "postCaseNote/success",
                payload: { status: 'ok' }
            })
            .next({})
            .put({
                type: "postCaseNote/error",
                payload: {
                    error: { error: null, error_description: '' }
                }
            })
            .next()
            .isDone();

        testSaga(sagas["postCaseNote/request"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(WsManager.postCaseNote, Utils.mergePropsStateApi(state), actionFake)
            .next({error: {code: 400, message: "testError"}})
            .put({
                type: "postCaseNote/success",
                payload: { status: null }
            })
            .next({error: {code: 400, message: "testError"}})
            .put({
                type: "postCaseNote/error",
                payload: {
                    error: {error: 400, error_description: 'testError'}
                }
            })
            .next()
            .isDone();
    });

    test('requestDataUsers*', async () => {
        testSaga(sagas["notesUsers/request"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: payload,
                state,
                service: "userDataRequest",
                action: actions.notesUsers
            })
            .next()
            .isDone();
    });

    test('casesNotes', async () => {
        expect(Api.default().casesNotes(key, params)).toMatchSnapshot();
    });

    test('postCaseNote', async () => {
        expect(Api.default().postCaseNote(key, params)).toMatchSnapshot();
    });
});
