import {call, select} from 'redux-saga/effects';
import {testSaga, expectSaga} from "redux-saga-test-plan";
import net from '../../App/Effects/net';
import actions from "../../App/Actions";
import * as Api from "../../App/Services/Api";
import Utils from "../../App/Utils";
import * as Models from "../../App/Model";
import {CASE} from "../../App/Libs/Const";
import {RealmObject} from "../../App/Model/Schemas";
import Mobile from "../../App/Model/MobileControl";

describe('Effect Net', async () => {
    const error = new Error('My Error'),
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
        sagas;

    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = net(WsManager);
        RealmObject.write(() => {
            RealmObject.deleteAll();
        });
    });

    beforeEach(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll();
        });
    });

    test('connected*', async () => {
        testSaga(sagas["net/connected/request"], {payload: payload})
            .next()
            .put({
                type: "net/connected/update",
                payload: {
                    payload: {}
                }
            })
            .next()
            .isDone();
        testSaga(sagas["net/connected/request"])
            .next()
            .throw(error)
            .put({
                type: 'net/connected/error',
                payload: { error: { error: 'error', error_description: error.toString() } }
            })
            .next()
            .isDone();
    });

    test('syncDown*', async () => {
        testSaga(sagas["net/syncDown/request"], {payload: payload})
            .next()
            .select()
            .next({Net: {isConnected: true}})
            .put({
                type: "net/progressDialog",
                payload: true
            })
            .next({})
            .call(Models.StartCase.destroyObject)
            .next({})
            .call(Models.Todo.destroyObject)
            .next({})
            .call(Models.Draft.destroyObject)
            .next({})
            .call(Models.Step.destroyObject)
            .next({})
            .call(Models.Form.destroyObject)
            .next({})
            .call(Models.Data.destroyObject)
            .next({})
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: payload,
                state: {Net: {isConnected: true}},
                service: "newCasesRequest",
                action: actions.cases.newcases
            })
            .next({})
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: payload,
                state: {Net: {isConnected: true}},
                service: "casesTodo",
                action: actions.cases.inbox
            })
            .next({})
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: payload,
                state: {Net: {isConnected: true}},
                service: "casesDraft",
                action: actions.cases.draft
            })
            .next({})
            .call(Models.StartCase.startCaseOffline)
            .next({})
            .call(Models.Todo.getTodoOffline)
            .next({})
            .put({
                type: "net/progressDialog",
                payload: false
            })
            .next()
            .isDone();
        testSaga(sagas["net/syncDown/request"])
            .next()
            .throw(error)
            .put({
                type: 'net/syncDown/error',
                payload: { error: { error: 'error', error_description: error.toString() } }
            })
            .next()
            .isDone();
    });

    test('syncUp*', async () => {
        const casesOffline = [{
                caseId: "100",
                processId: "110",
                taskId: "111"
            }],
            casesOfflineList = [{
                caseId: "100",
                process: {
                    processId: "110"
                },
                task: {
                    taskId: "111",
                    autoRoot: "TRUE"
                }
            }],
            caseAssignment = () => {
            };

        testSaga(sagas["net/syncUp/request"])
            .next()
            .throw(error)
            .put({
                type: 'net/syncUp/error',
                payload: { error: { error: 'error', error_description: error.toString() } }
            })
            .next()
            .isDone();

        testSaga(sagas["net/syncUp/request"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(Models.NewCase.getNeCaseSending)
            .next(casesOffline)
            .next(casesOffline)
            .next(state)
            .call(WsManager.executeTriggerAfter,
                {
                    url: "https://poc-1.processmaer.net",
                    workspace: "workflowpoc1",
                    token: "token"
                },
                {
                    pro_uid: "110",
                    act_uid: "111",
                    app_uid: undefined,
                    step_uid: null
                })
            .next()
            .next()
            .call(Models.NewCase.destroyCase, "100")
            .next()
            .call(Models.Data.destroyDataCase, "100")
            .next()
            .call(Models.Todo.getTodoSending)
            .next(casesOfflineList)
            .next(state)
            .call(WsManager.executeTriggerAfter,
                {
                    url: "https://poc-1.processmaer.net",
                    workspace: "workflowpoc1",
                    token: "token"
                },
                {
                    pro_uid: "110",
                    act_uid: "111",
                    app_uid: '100',
                    step_uid: null
                })
            .next()
            .next()
            .call(Models.Data.destroyDataCase, "100")
            .next()
            .call(Models.Todo.destroyCase, "100")
            .next()
            .call(Models.Draft.getDraftSending)
            .next(casesOfflineList)
            .next(state)
            .call(WsManager.executeTriggerAfter,
                {
                    url: "https://poc-1.processmaer.net",
                    workspace: "workflowpoc1",
                    token: "token"
                },
                {
                    pro_uid: "110",
                    act_uid: "111",
                    app_uid: '100',
                    step_uid: null
                })
            .next()
            .next()
            .call(Models.Data.destroyDataCase, "100")
            .next()
            .call(Models.Draft.destroyCase, "100")
            .next({})
            .put({
                type: "net/syncUp/upload",
                payload: false
            })
            .next({})
            .put({
                type: "cases/forceRefresh",
                payload: {forceRefresh: true}
            })
            .next()
            .isDone();
    });

    test('syncDownCase*', async () => {
        const payload = {
            caseId: "100", delIndex: 1, process:{processId: "110"}, task:{taskId: "111"},state: CASE.STATUS.WORKING
            },
            forms = {response:[{formId: "100"}]};
        testSaga(sagas["net/case/list"], {payload: payload})
            .next(state)
            .select()
            .next({payload})
            .throw(error)
            .put({
                type: 'net/syncDown/error',
                payload: { error: { error: 'error', error_description: error.toString() } }
            })
            .next()
            .isDone();
        testSaga(sagas["net/case/list"], {payload: payload})
            .next(state)
            .select()
            .next({payload})
            .call(Models.Data.getDataCase, "100")
            .next({state: "none"})
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: { app_uid: '100', pro_uid: '110', act_uid: '111', del_index: 1 },
                state: {payload},
                service: "caseVariables",
                action: actions.cases.data
            })
            .next({})
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: { prj_uid: '110', act_uid: '111' },
                state: {payload},
                service: "steps",
                action: actions.project.task.steps
            })
            .next(forms)
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: {
                    prj_uid: payload.process.processId,
                    dyn_uid: '100'
                },
                state: {payload},
                service: "dynaformProcessed",
                action: actions.dynaform.processed
            })
            .next()
            .isDone();

    });

    test('syncDownNewCase*', async () => {
        const payload = {
                caseId: "100", delIndex: 1, processId: "110", taskId: "111",
                forms: [{formId: "100"}]
            };
        testSaga(sagas["net/case/new"], {payload: payload})
            .next(state)
            .select()
            .next({payload})
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: {prj_uid: payload.processId, act_uid: payload.taskId},
                state: {payload},
                service: "steps",
                action: actions.project.task.steps
            })
            .next()
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: {prj_uid: payload.processId, dyn_uid: "100"},
                state: {payload},
                service: "dynaformProcessed",
                action: actions.dynaform.processed
            })
            .next()
            .isDone();

    });

    test('syncControlData* default data', async () => {
        let dataOffLine,
            caseId = "12345",
            caseIdFk = "FK12345",
            state = {
                Settings: {
                    server: {}
                },
                Oauth: {
                    credentials: {}
                }
            };

        Models.Data.saveData({
            app_uid: "FK12345",
            del_index: "1",
            dyn_uid: "4783964",
            data: {
                textVar001: "text1",
                locationVar001: {
                    id: 'FK12345'
                }
            },
            status: CASE.STATUS.NONE
        });
        dataOffLine = Models.Data.getDataCase("FK12345");

        return expectSaga(sagas["net/mobile/syncData"], dataOffLine, caseId, caseIdFk)
            .provide([
                [select(), state]
            ])
            .returns({
                formId: dataOffLine.formId,
                data: dataOffLine.data
            })
            .run();
    });

    test('syncControlData* processed data', async () => {
        let mobileControl1 = {
                idField: "locationVar001",
                caseId: "FK12345",
                data: JSON.stringify({
                    latitude: -16.54450367,
                    longitude: -68.0799821,
                    render: true,
                    idFiled: "locationVar001",
                    delIndex: 1,
                    app_uid: "FK12345"
                }),
                delIndex: 1,
                type: "geoMap",
                service: "uploadLocation"
            },
            dataOffLine,
            caseId = "12345",
            caseIdFk = "FK12345",
            state = {
                Settings: {
                    server: {}
                },
                Oauth: {
                    credentials: {}
                }
            },
            result = {
                response: [{
                    appDocUid: "112233"
                }]
            },
            processedRes = {
                data: {
                    textVar001: "text1",
                    locationVar001: {
                        id: "112233"
                    }
                }
            };

        Models.Data.saveData({
            app_uid: "FK12345",
            del_index: "1",
            dyn_uid: "4783964",
            data: {
                textVar001: "text1",
                locationVar001: {
                    id: 'FK12345'
                }
            },
            status: CASE.STATUS.NONE
        });
        dataOffLine = Models.Data.getDataCase("FK12345");
        Mobile.addLocation(mobileControl1);

        return expectSaga(sagas["net/mobile/syncData"], dataOffLine, caseId, caseIdFk)
            .provide([
                [select(), state],
                [call(Utils.tryApiRequest, {
                    wsManager: WsManager,
                    payload: Object.assign({}, JSON.parse(mobileControl1.data), {app_uid: caseId}),
                    state,
                    service: "uploadLocation"
                }), result],
                [call(Utils.exchangeIds, {
                    idField: mobileControl1.idField,
                    appDocUid: result.response[0].appDocUid
                }, JSON.parse(dataOffLine.data)), processedRes]
            ])
            .returns({
                formId: dataOffLine.formId,
                data: JSON.stringify(processedRes.data)
            })
            .run();
    });
});
