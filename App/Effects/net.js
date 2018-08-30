import {call, put, select} from "redux-saga/effects";
import actions from "../Actions";
import Utils from "../Utils";
import I18n from "../I18n";
import * as Models from "../Model";
import Step from "../Model/Step";
import {CASE} from "../Libs/Const";

export default (WsManager) => {
    /**
     * Function Generator for connect request
     * @param action
     */
    function* connected (action) {
        try {
            yield put(actions.net.connected.update(action));
        } catch (e) {
            yield put(actions.net.connected.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Save information of a new case list in database
     * @param payload
     * @returns {IterableIterator<*>}
     */
    function* syncDownNewCase ({payload}) {
        let fs,
            form = payload.forms,
            state = yield select();
        yield call(Utils.tryEffectsApiRequest, {
            wsManager: WsManager,
            payload: {prj_uid: payload.processId, act_uid: payload.taskId},
            state,
            service: "steps",
            action: actions.project.task.steps
        });
        if (form) {
            for (fs = 0; fs < form.length; fs += 1) {
                yield call(Utils.tryEffectsApiRequest, {
                    wsManager: WsManager,
                    payload: {prj_uid: payload.processId, dyn_uid: form[fs].formId},
                    state,
                    service: "dynaformProcessed",
                    action: actions.dynaform.processed
                });
            }
        }
    }

    /**
     * Save information of a case list todo and draft in database
     * @param caseData
     */
    function* syncDownCase ({payload}) {
        let caseData,
            fs,
            form,
            existSteps,
            state = yield select();
        try {
            caseData = yield call(Models.Data.getDataCase, payload.caseId);
            if (!caseData || caseData.status !== CASE.STATUS.WORKING) {
                yield call(Utils.tryEffectsApiRequest, {
                    wsManager: WsManager,
                    payload: {
                        app_uid: payload.caseId,
                        pro_uid: payload.process.processId,
                        act_uid: payload.task.taskId,
                        del_index: payload.delIndex
                    },
                    state,
                    service: "caseVariables",
                    action: actions.cases.data
                });
            }
            existSteps = Step.existSteps(payload.process.processId, payload.task.taskId);
            if (!existSteps) {
                form = yield call(Utils.tryEffectsApiRequest, {
                    wsManager: WsManager,
                    payload: {
                        prj_uid: payload.process.processId,
                        act_uid: payload.task.taskId
                    },
                    state,
                    service: "steps",
                    action: actions.project.task.steps
                });
                if (form.response) {
                    for (fs = 0; fs < form.response.length; fs += 1) {
                        yield call(Utils.tryEffectsApiRequest, {
                            wsManager: WsManager,
                            payload: {
                                prj_uid: payload.process.processId,
                                dyn_uid: form.response[fs].formId
                            },
                            state,
                            service: "dynaformProcessed",
                            action: actions.dynaform.processed
                        });
                    }
                }
            }
        } catch (e) {
            yield put(actions.net.syncDown.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Run the necessary endpoints to download the required data
     * @param action
     */
    function* syncDown (action) {
        try {
            let co,
                casesOffline,
                state = yield select();
            if (state.Net.isConnected) {
                yield put(actions.net.progressDialog(true));
                yield call(Models.StartCase.destroyObject);
                yield call(Models.Todo.destroyObject);
                yield call(Models.Draft.destroyObject);
                yield call(Models.Step.destroyObject);
                yield call(Models.Form.destroyObject);
                yield call(Models.Data.destroyObject);
                yield call(Utils.tryEffectsApiRequest, {
                    wsManager: WsManager,
                    payload: action.payload,
                    state,
                    service: "newCasesRequest",
                    action: actions.cases.newcases
                });
                yield call(Utils.tryEffectsApiRequest, {
                    wsManager: WsManager,
                    payload: action.payload,
                    state,
                    service: "casesTodo",
                    action: actions.cases.inbox
                });
                yield call(Utils.tryEffectsApiRequest, {
                    wsManager: WsManager,
                    payload: action.payload,
                    state,
                    service: "casesDraft",
                    action: actions.cases.draft
                });
                casesOffline = yield call(Models.StartCase.startCaseOffline);
                if (casesOffline) {
                    for (co = 0; co < casesOffline.length; co += 1) {
                        yield call(syncDownNewCase, {payload: casesOffline[co]});
                    }
                }
                casesOffline = yield call(Models.Todo.getTodoOffline);
                if (casesOffline) {
                    for (co = 0; co < casesOffline.length; co += 1) {
                        yield call(syncDownCase, {payload: casesOffline[co]});
                    }
                }
                yield put(actions.net.progressDialog(false));
            } else {
                Utils.showToast({message: I18n.t("Message_Internet")});
            }
        } catch (e) {
            yield put(actions.net.syncDown.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Syncs OffLine data saved and server data
     * @param dataOffline
     * @param caseId
     * @param caseIdFk
     * @returns {IterableIterator<*>}
     */
    function* syncControlData (dataOffline, caseId, caseIdFk) {
        let arrControls = Models.MobileControl.filterBy(caseIdFk || caseId),
            state = yield select(),
            control,
            data,
            i,
            result,
            index = 0,
            response,
            newData = {},
            max = arrControls && arrControls.length,
            FormDataOffLine = dataOffline.dataJSON;

        if (max) {
            for (i = 0; i < max; i += 1) {
                control = arrControls[i];
                data = JSON.parse(control.data);
                result = yield call(Utils.tryApiRequest, {
                    wsManager: WsManager,
                    payload: Object.assign({}, data, {app_uid: caseId}),
                    state,
                    service: control.service
                });
                if (result && result.response) {
                    response = result.response[index];
                    newData = yield call(Utils.exchangeIds, {
                        idField: control.idField,
                        appDocUid: response.appDocUid
                    }, FormDataOffLine);
                    if (Object.keys(newData).length) {
                        FormDataOffLine = Object.assign({}, FormDataOffLine, newData.data);
                        newData.data = JSON.stringify(newData.data);
                    }
                }
            }
        } else {
            newData.data = JSON.stringify(FormDataOffLine);
        }
        newData.formId = dataOffline.formId;
        return newData;
    }

    /**
     * Get new cases and save data in server
     * @param state
     * @param casesOffline
     * @returns {IterableIterator<*>}
     */
    function* getNewCasesOffline (state, casesOffline) {
        const cases = yield call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({
                    prj_uid: casesOffline.processId,
                    act_uid: casesOffline.taskId
                }),
                state,
                service: "newCase",
                action: actions.cases.create
            }),
            dataCasesOffline = yield call(Models.Data.getDataCase, casesOffline.caseId);
        let caseData = {},
            data;

        if (dataCasesOffline && cases) {
            caseData = yield syncControlData(dataCasesOffline, cases.response.caseId, casesOffline.caseId);
            data = JSON.parse(caseData.data);
            yield call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({
                    app_uid: cases.response.caseId,
                    dyn_uid: caseData.formId,
                    del_index: cases.response.caseIndex,
                    data
                }),
                state,
                service: "saveFormData",
                action: actions.formData.server
            });
            Models.MobileControl.destroyControl();
        }
        return (cases && cases.response) || null;
    }

    /**
     * Case assignment and Route case offline
     * @param taskId
     * @param caseId
     * @param caseIndex
     * @returns {IterableIterator<*|CallEffect>}
     */
    function* caseAssignment (taskId, caseId, caseIndex) {
        const state = yield select(),
            assignment = yield call(
                WsManager.caseAssignmentRequest,
                Utils.mergePropsStateApi(state),
                Object.assign({
                    act_uid: taskId,
                    app_uid: caseId,
                    del_index: caseIndex
                })
            );
        if (!assignment.error && assignment.length > 0) {
            let tasks = [],
                taskHasManual = false,
                usrId,
                as;
            for (as = 0; as < assignment.length; as += 1) {
                if (!Object.prototype.hasOwnProperty.call(assignment[as], "routeFinishFlag") &&
                    !assignment[as].routeFinishFlag) {
                    usrId = assignment[as].users[0].userId;
                    tasks.push({
                        TAS_UID: assignment[as].taskId,
                        USR_UID: usrId,
                        TAS_ASSIGN_TYPE: assignment[as].taskAssignType,
                        TAS_DEF_PROC_CODE: assignment[as].taskDefProcCode,
                        DEL_PRIORITY: assignment[as].delPriority,
                        TAS_PARENT: assignment[as].taskParent,
                        SOURCE_UID: assignment[as].sourceUid
                    });
                }
                if (assignment[as].taskAssignType != null && assignment[as].taskAssignType === "MANUAL") {
                    taskHasManual = true;
                }
            }
            if (!taskHasManual) {
                yield call(
                    WsManager.caseRouteRequest,
                    Utils.mergePropsStateApi(state),
                    Object.assign({
                        app_uid: caseId,
                        del_index: caseIndex,
                        tasks
                    })
                );
            }
        }
    }

    /**
     * This function check if task is autoRoot
     * @param taskId
     * @returns {IterableIterator<boolean>}
     */
    function* isRouted (taskId) {
        const task = yield Models.StartCase.startCaseTaskId(taskId);
        if (task) {
            return task.autoRoot === "TRUE";
        }
        return false;
    }

    /**
     * Get cases and save data in server
     * @param caseId
     * @returns {IterableIterator<*>}
     */
    function* syncUpCaseData (caseId) {
        const state = yield select(),
            dataCasesOffline = yield call(Models.Data.getDataCase, caseId);
        let caseData,
            data;

        if (dataCasesOffline && dataCasesOffline.formId) {
            caseData = yield syncControlData(dataCasesOffline, caseId);
            data = JSON.parse(caseData.data);
            yield call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({
                    app_uid: caseId,
                    dyn_uid: dataCasesOffline.formId,
                    del_index: dataCasesOffline.caseIndex,
                    data
                }),
                state,
                service: "saveFormData",
                action: actions.formData.server
            });
            Models.MobileControl.destroyControl();
        }
    }

    /**
     * Run the necessary endpoints to create case
     * @param action
     */
    function* syncUp (action) {
        try {
            let state = yield select(),
                casesOffline = yield call(Models.NewCase.getNeCaseSending),
                caseId = [],
                caseResponse,
                stepId,
                isRoute,
                co,
                ci;

            if (casesOffline && casesOffline.length > 0) {
                for (co = 0; co < casesOffline.length; co += 1) {
                    isRoute = yield isRouted(casesOffline[co].taskId);
                    if (isRoute) {
                        caseResponse = yield call(getNewCasesOffline, state, casesOffline[co]);
                        if (caseResponse) {
                            caseId.push(casesOffline[co].caseId);
                            stepId = Models.Step.latestStepId(casesOffline[co].processId, casesOffline[co].taskId);
                            yield call(
                                WsManager.executeTriggerAfter,
                                Utils.mergePropsStateApi(state),
                                Object.assign({
                                    pro_uid: casesOffline[co].processId,
                                    act_uid: casesOffline[co].taskId,
                                    app_uid: caseResponse.caseId,
                                    step_uid: stepId
                                })
                            );
                            yield call(
                                caseAssignment,
                                casesOffline[co].taskId,
                                caseResponse.caseId,
                                caseResponse.caseIndex
                            );
                        }
                    }
                }
                for (ci = 0; ci < caseId.length; ci += 1) {
                    yield call(Models.NewCase.destroyCase, caseId[ci]);
                    yield call(Models.Data.destroyDataCase, caseId[ci]);
                }
            }
            caseId = [];
            casesOffline = yield call(Models.Todo.getTodoSending);
            if (casesOffline && casesOffline.length > 0) {
                for (co = 0; co < casesOffline.length; co += 1) {
                    if (casesOffline[co].task.autoRoot === "TRUE") {
                        yield call(syncUpCaseData, casesOffline[co].caseId);
                        caseId.push(casesOffline[co].caseId);
                        stepId = Models.Step.latestStepId(casesOffline[co].process.processId, casesOffline[co].task.taskId);
                        yield call(
                            WsManager.executeTriggerAfter,
                            Utils.mergePropsStateApi(state),
                            Object.assign({
                                pro_uid: casesOffline[co].process.processId,
                                act_uid: casesOffline[co].task.taskId,
                                app_uid: casesOffline[co].caseId,
                                step_uid: stepId
                            })
                        );
                        yield call(
                            caseAssignment,
                            casesOffline[co].task.taskId,
                            casesOffline[co].caseId,
                            casesOffline[co].delIndex
                        );
                    }
                }
                for (ci = 0; ci < caseId.length; ci += 1) {
                    yield call(Models.Data.destroyDataCase, caseId[ci]);
                    yield call(Models.Todo.destroyCase, caseId[ci]);
                }
            }
            caseId = [];
            casesOffline = yield call(Models.Draft.getDraftSending);
            if (casesOffline && casesOffline.length > 0) {
                for (co = 0; co < casesOffline.length; co += 1) {
                    if (casesOffline[co].task.autoRoot === "TRUE") {
                        yield call(syncUpCaseData, casesOffline[co].caseId);
                        caseId.push(casesOffline[co].caseId);
                        stepId = Models.Step.latestStepId(casesOffline[co].process.processId, casesOffline[co].task.taskId);
                        yield call(
                            WsManager.executeTriggerAfter,
                            Utils.mergePropsStateApi(state),
                            Object.assign({
                                pro_uid: casesOffline[co].process.processId,
                                act_uid: casesOffline[co].task.taskId,
                                app_uid: casesOffline[co].caseId,
                                step_uid: stepId
                            })
                        );
                        yield call(
                            caseAssignment,
                            casesOffline[co].task.taskId,
                            casesOffline[co].caseId,
                            casesOffline[co].delIndex
                        );
                    }
                }
                for (ci = 0; ci < caseId.length; ci += 1) {
                    yield call(Models.Data.destroyDataCase, caseId[ci]);
                    yield call(Models.Draft.destroyCase, caseId[ci]);
                }
            }
            yield put(actions.net.syncUp.upload(false));
            yield put(actions.cases.forceRefresh({forceRefresh: true}));
        } catch (e) {
            yield put(actions.net.syncUp.error({error: "error", error_description: e.toString()}));
        }
    }

    return {
        [actions.net.connected.request]: connected,
        [actions.net.syncDown.request]: syncDown,
        [actions.net.syncUp.request]: syncUp,
        [actions.net.case.list]: syncDownCase,
        [actions.net.case.new]: syncDownNewCase,
        [actions.net.mobile.syncData]: syncControlData
    };
};
