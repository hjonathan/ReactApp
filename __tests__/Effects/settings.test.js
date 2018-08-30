import {testSaga} from "redux-saga-test-plan";
import settings from '../../App/Effects/settings';
import actions from "../../App/Actions";
import * as Api from "../../App/Services/Api";
import Utils from "../../App/Utils";

describe('Effect settings.js', async () => {
    const error = new Error('My Error'),
        payload = {
            previousConfig: {
                url: "https://poc-1.processmaer.org",
                workspace: "workflow"
            },
            logged: true
        },
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
            Oauth: {credentials: {token: "token"}},
            Net: {isConnected: true}
        };
    let WsManager,
        sagas;
    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = settings(WsManager);
    });

    test('backButtonPressed*', async () => {
        testSaga(sagas["settings/backButtonPressed"], {payload})
            .next(state)
            .select()
            .next(state)
            .next({})
            .put({
                type: 'logout/request',
                payload: { url: 'https://poc-1.processmaer.org', workspace: 'workflow' }
            })
            .next({})
            .put({
                type: 'Navigation/BACK', key: undefined, immediate: undefined
            })
            .next()
            .isDone();
        testSaga(sagas["settings/backButtonPressed"], {payload})
            .next(state)
            .select()
            .next(state)
            .next({error: {}})
            .put({
                type: 'settings/error',
                payload: {error: {}}
            })
            .next()
            .isDone();
        testSaga(sagas["settings/backButtonPressed"], {payload})
            .next()
            .throw(error)
            .put({
                type: 'settings/error',
                payload: { error: { message: error.toString() } }
            })
            .next()
            .isDone();
    });
});
