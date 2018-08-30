import RegServices from "./Registry";
import * as Models from "../../Model";
import OfflineCase from "../../Libs/Offline/Case";

export default () => ({
    /**
     * Connects to /light/case/{app_uid}/{del_index}
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    casesRoute (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "VERIFY_CASE_NOT_ROUTED");
        if (keys.isConnected) {
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then((response) => {
                    if (response.status === 204) {
                        return {};
                    }
                    return response.json();
                });
        }
        return {};
    },
    /**
     * Connects to /light/todo
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    casesTodo (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_LISTS_TODO");
        if (keys.isConnected) {
            Models.Todo.destroyObject();
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return Models.Todo.getTodoOffline();
    },

    /**
     * Connects to /light/unassigned
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    casesUnassigned (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_LIST_UNASSIGNED");
        if (keys.isConnected) {
            Models.Unassigned.destroyObject();
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return Models.Unassigned.getUnassignedOffline();
    },

    /**
     * Connects to /light/participated
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    casesParticipated (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_LISTS_PARTICIPATED");
        if (keys.isConnected) {
            Models.Participated.destroyObject();
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return Models.Participated.getParticipatedOffline();
    },

    /**
     * Connects to /light/draft
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    casesDraft (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_LISTS_DRAFT");
        if (keys.isConnected) {
            Models.Draft.destroyObject();
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return Models.Draft.getDraftOffline();
    },

    /**
     * Connects to /light/history/{app_uid}
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    caseHistory (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_HISTORY_CASES");
        return fetch(service, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${keys.access_token}`
            }
        })
            .then(response => response.json());
    },

    /**
     * Connects to /light/{type}/case/{app_uid}
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    caseInfoRequest (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_CASE_INFO");
        return fetch(service, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${keys.access_token}`
            }
        })
            .then(response => response.json());
    },

    /**
     * Method to consume service from Rest Api to claim a case
     * @param {*} keys Oauth keys
     * @param {*} params Request's params
     */
    caseClaimRequest (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "CLAIM_CASE");
        return fetch(service, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${keys.access_token}`
            }
        })
            .then(response => response.json());
    },

    /**
     * Connects to get /star-case service.
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    newCasesRequest (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_NEW_CASES");
        if (keys.isConnected) {
            Models.StartCase.destroyObject();
            return fetch(service, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return Models.StartCase.startCase();
    },

    /**
     * Connects to /light/counters
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    countersRequest (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys), "GET_MAIN_MENU_COUNTERS");
        if (keys.isConnected) {
            return fetch(service, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return null;
    },

    /**
     * Connects to /light/users/data
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    userDataRequest (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_USERS_PICTURES");
        let body = Object.assign({}, params);
        if (keys.isConnected) {
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json());
        }
        return Models.User.getUserOffline();
    },

    /**
     * Connect with /light/project/{prj_uid}/activity/{act_uid}/steps
     * @param keys
     * @param params
     * @returns {*|Promise|Promise.<TResult>}
     */
    steps (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "FORMS_ARRAY");
        if (keys.isConnected) {
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return Models.Step.getStepOffline(params.prj_uid, params.act_uid);
    },

    /**
     * Connect with /light/get-next-step/{app_uid}
     * @param keys
     * @param params
     * @returns {*|Promise.<TResult>|Promise}
     */
    nextStep (keys, params) {
        let allKeys = Object.assign({}, keys, params),
            service = RegServices.getUrl(Object.assign({}, allKeys), "GET_NEXT_STEP"),
            body = {
                pro_uid: allKeys.prj_uid,
                act_uid: allKeys.act_uid,
                step_uid: allKeys.step_uid,
                step_pos: allKeys.step_pos,
                app_index: allKeys.del_index,
                dyn_uid: allKeys.dyn_uid
            };
        if (keys.isConnected) {
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json());
        }
        return OfflineCase.getNextStep(allKeys);
    },

    /**
     * Connects to /light/assignment-request
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    caseAssignmentRequest (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_ASSIGMENT_USERS");
        return fetch(service, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${keys.access_token}`
            }
        })
            .then(response => response.json());
    },

    /**
     * Connects to /light/route-case
     * @param keys
     * @param params
     * @returns {Promise<Response>}
     */
    caseRouteRequest (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "ROUTE_CASE");
        let body = Object.assign({}, params);
        return fetch(service, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${keys.access_token}`
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json());
    },

    /**
     * Connect with /light/{app_uid}/variable?dyn_uid={dyn_uid}&del_index={del_index}
     * @param keys
     * @param params
     * @returns {*|Promise|Promise.<TResult>}
     */
    saveFormData (keys, params) {
        let allKeys = Object.assign({}, keys, params),
            service = RegServices.getUrl(Object.assign({}, allKeys), "SAVE_FORM_DATA");
        if (keys.isConnected) {
            return fetch(service, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                },
                body: JSON.stringify(allKeys.data)
            })
                .then(response => response);
        }
        return Models.Data.saveData(allKeys);
    },

    /**
     * Connect with /light/{app_uid}/variables?pro_uid={pro_uid}&act_uid={act_uid}&app_index={del_index}
     * @param keys
     * @param params
     * @returns {*|Promise|Promise.<TResult>}
     */
    caseVariables (keys, params) {
        let service = RegServices.getUrl(Object.assign({}, keys, params), "GET_CASE_VARIABLES");
        if (keys.isConnected) {
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return {};
    },

    /**
     * /light/process/{prj_uid}/task/{act_uid}/start-case
     * @param keys
     * @param params
     * @returns {*|Promise.<TResult>|Promise}
     */
    newCase (keys, params) {
        let allKeys = Object.assign({}, keys, params),
            service = RegServices.getUrl(Object.assign({}, allKeys), "START_CASE");
        if (keys.isConnected) {
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return OfflineCase.createCase(allKeys)
            .then(response => response);
    },

    /**
     * /light/process/{prj_uid}/task/{act_uid}/start-case
     * @param keys
     * @param params
     * @returns {*|Promise.<TResult>|Promise}
     */
    executeTriggerAfter (keys, params) {
        let allKeys = Object.assign({}, keys, params),
            service = RegServices.getUrl(Object.assign({}, allKeys), "EXECUTE_TRIGGERS_AFTER");
        return fetch(service, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${keys.access_token}`
            }
        }).then(response => response.json());
    }
});
