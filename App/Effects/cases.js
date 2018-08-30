import {call, put, select} from "redux-saga/effects";
import {NavigationActions} from "react-navigation";
import actions from "../Actions";
import UtilsApi from "../Utils/api";
import UtilsEffects from "../Utils/effects";
import {CASE} from "../Libs/Const";

export default (WsManager) => {
    /**
     * Request cases inbox
     * @param action
     */
    function* casesTodoRequest (action) {
        let state = yield select();
        try {
            yield call(UtilsEffects.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: action.payload,
                state,
                service: "casesTodo",
                action: actions.cases.inbox
            });
        } catch (e) {
            yield put(actions.cases.inbox.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Request cases unassigned
     * @param action
     */
    function* casesUnassignedRequest (action) {
        let state = yield select();
        try {
            const cases = yield call(WsManager.casesUnassigned, Object.assign({}, UtilsApi.mergePropsStateApi(state), state.Net), action.payload);
            if (cases.error) {
                yield put(actions.cases.unassigned.error(this.tryError(cases.error)));
            } else {
                yield put(actions.cases.unassigned.success(cases));
            }
        } catch (e) {
            yield put(actions.cases.unassigned.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Request cases participated
     * @param action
     */
    function* casesParticipatedRequest (action) {
        let state = yield select();
        try {
            const cases = yield call(WsManager.casesParticipated, Object.assign({}, UtilsApi.mergePropsStateApi(state), state.Net), action.payload);
            if (cases.error) {
                yield put(actions.cases.participated.error(this.tryError(cases.error)));
            } else {
                yield put(actions.cases.participated.success(cases));
            }
        } catch (e) {
            yield put(actions.cases.participated.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Request cases draft
     * @param action
     */
    function* casesDraftRequest (action) {
        let state = yield select();
        try {
            yield call(UtilsEffects.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: action.payload,
                state,
                service: "casesDraft",
                action: actions.cases.draft
            });
        } catch (e) {
            yield put(actions.cases.draft.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Request cases history
     * @param action
     */
    function* historyRequest (action) {
        let state = yield select();
        try {
            const response = yield call(WsManager.caseHistory, UtilsApi.mergePropsStateApi(state), action.payload);
            if (response.error) {
                yield put(actions.cases.history.error(this.tryError(response.error)));
            } else {
                yield put(actions.cases.history.success(response));
            }
        } catch (e) {
            yield put(actions.cases.history.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Function Generator for Case Information request to Processmaker
     * coming from dispatcher and open the case information
     * @param action
     */
    function* caseInfoRequest (action) {
        let state = yield select();
        try {
            const info = yield call(WsManager.caseInfoRequest, UtilsApi.mergePropsStateApi(state), action.payload);
            if (info.error) {
                if (info.error.code) {
                    yield put(actions.cases.info.error({
                        error: info.error.code,
                        error_description: info.error.message
                    }));
                } else {
                    yield put(actions.cases.info.error(info));
                }
            } else {
                yield put(actions.cases.info.success(info));
            }
        } catch (e) {
            yield put(actions.cases.info.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Function Generator for New Cases request to ProcessMaker
     * @param action
     */
    function* newCasesRequest (action) {
        let state = yield select();
        try {
            yield call(UtilsEffects.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: action.payload,
                state,
                service: "newCasesRequest",
                action: actions.cases.newcases
            });
        } catch (e) {
            yield put(actions.cases.newcases.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Function to claim a case coming from a dispatcher.
     * @param {*} action
     */
    function* caseClaimRequest (action) {
        let state = yield select();
        try {
            const claim = yield call(WsManager.caseClaimRequest, UtilsApi.mergePropsStateApi(state), action.payload);
            if (claim.error) {
                if (claim.error.code) {
                    yield put(actions.cases.claim.error({
                        error: claim.error.code,
                        error_description: claim.error.message
                    }));
                } else {
                    yield put(actions.cases.claim.error(claim));
                }
            } else if (claim.status === "ok") {
                yield put(actions.cases.claim.success(claim));
            } else {
                yield put(actions.cases.claim.error(claim));
            }
        } catch (e) {
            yield put(actions.cases.claim.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Generator function for Counters information.
     * @param {*} action
     */
    function* countersRequest (action) {
        let state = yield select();
        try {
            const counters = yield call(WsManager.countersRequest, Object.assign({}, UtilsApi.mergePropsStateApi(state), state.Net), action.payload);
            if (counters.error) {
                yield put(actions.cases.counters.error(this.tryError(counters.error)));
            } else {
                yield put(NavigationActions.setParams({
                    key: CASE.INBOX,
                    params: {userData: state.User, counters}
                }));
                yield put(NavigationActions.setParams({
                    key: CASE.DRAFT,
                    params: {userData: state.User, counters}
                }));
                yield put(NavigationActions.setParams({
                    key: CASE.PARTICIPATED,
                    params: {userData: state.User, counters}
                }));
                yield put(NavigationActions.setParams({
                    key: CASE.UNASSIGNED,
                    params: {userData: state.User, counters}
                }));
            }
        } catch (e) {
            yield put(actions.cases.counters.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Request users data
     * @param action
     */
    function* userInfoRequest (action) {
        let state = yield select();
        try {
            const response = yield call(WsManager.userDataRequest, Object.assign({}, UtilsApi.mergePropsStateApi(state), state.Net), action.payload);
            if (response.error) {
                yield put(actions.cases.userInfo.error(this.tryError(response.error)));
            } else {
                yield put(actions.cases.userInfo.success(response));
            }
        } catch (e) {
            yield put(actions.cases.userInfo.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Function to get assigment info from rest service.
     * @param {*} action
     */
    function* caseAssignmentRequest (action) {
        let state = yield select();
        try {
            const assigment = yield call(
                WsManager.caseAssignmentRequest,
                UtilsApi.mergePropsStateApi(state),
                action.payload
            );
            if (assigment.error) {
                if (assigment.error.code) {
                    yield put(actions.cases.assigmentInfo.error({
                        error: assigment.error.code,
                        error_description: assigment.error.message
                    }));
                } else {
                    yield put(actions.cases.assigmentInfo.error(assigment));
                }
            } else {
                yield put(actions.cases.assigmentInfo.success(assigment));
            }
        } catch (e) {
            yield put(actions.cases.assigmentInfo.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Function to route case using restler service.
     * @param {*} action
     */
    function* caseRouteRequest (action) {
        let state = yield select();
        try {
            yield call(UtilsEffects.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: action.payload,
                state,
                service: "caseRouteRequest",
                action: actions.cases.routeCase
            });
        } catch (e) {
            yield put(actions.cases.routeCase.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Request cases variables
     * @param action
     */
    function* caseVariablesRequest (action) {
        let state = yield select();
        try {
            yield call(UtilsEffects.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: action.payload,
                state,
                service: "caseVariables",
                action: actions.cases.data
            });
        } catch (e) {
            yield put(actions.cases.draft.error({error: "error", error_description: e.toString()}));
        }
    }

    return {
        [actions.cases.inbox.request]: casesTodoRequest,
        [actions.cases.unassigned.request]: casesUnassignedRequest,
        [actions.cases.participated.request]: casesParticipatedRequest,
        [actions.cases.draft.request]: casesDraftRequest,
        [actions.cases.history.request]: historyRequest,
        [actions.cases.info.request]: caseInfoRequest,
        [actions.cases.newcases.request]: newCasesRequest,
        [actions.cases.claim.request]: caseClaimRequest,
        [actions.cases.counters.request]: countersRequest,
        [actions.cases.userInfo.request]: userInfoRequest,
        [actions.cases.assignmentInfo.request]: caseAssignmentRequest,
        [actions.cases.routeCase.request]: caseRouteRequest,
        [actions.cases.data.request]: caseVariablesRequest
    };
};
