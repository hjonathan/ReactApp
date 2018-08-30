import reducers from "../../App/Reducers/cases";

describe("Reducer cases.js", () => {
    test("actions.cases.inbox.success", () => {
        expect(reducers({}, {
            type: "cases/inbox/success",
            payload: {
                todo: []
            }
        })).toEqual({
            newcases: null,
            draft: null,
            todo: [],
            participated: null,
            unassigned: null
        });
    });
    test("actions.cases.unassigned.success", () => {
        expect(reducers({}, {
            type: "cases/unassigned/success",
            payload: {
                data: []
            }
        })).toEqual({
            newcases: null,
            draft: null,
            todo: null,
            participated: null,
            unassigned: []
        });
    });
    test("actions.cases.participated.success", () => {
        expect(reducers({}, {
            type: "cases/participated/success",
            payload: {
                data: []
            }
        })).toEqual({
            newcases: null,
            draft: null,
            todo: null,
            participated: [],
            unassigned: null
        });
    });
    test("actions.cases.draft.success", () => {
        expect(reducers({}, {
            type: "cases/draft/success",
            payload: {
                data: []
            }
        })).toEqual({
            newcases: null,
            draft: [],
            todo: null,
            participated: null,
            unassigned: null
        });
    });
    test("actions.cases.history.success", () => {
        expect(reducers({}, {
            type: "cases/history/success",
            payload: {
                data: []
            }
        })).toEqual({
            history: []
        });
    });
    test("actions.cases.info.success", () => {
        expect(reducers({}, {
            type: "cases/info/success",
            payload: {
                info: {}
            }
        })).toEqual({
            info: {}
        });
    });
    test("actions.cases.claim.success", () => {
        expect(reducers({}, {
            type: "cases/claim/success",
            payload: {
                claim: {}
            }
        })).toEqual({
            claim: {}
        });
    });
    test("actions.cases.claim.error", () => {
        expect(reducers({}, {
            type: "cases/claim/error",
            payload: {
                error: {}
            }
        })).toEqual({
            error: {}
        });
    });
    test("actions.cases.userInfo.success", () => {
        expect(reducers({}, {
            type: "cases/userInfo/success",
            payload: {
                data: []
            }
        })).toEqual({
            users: []
        });
    });
    test("actions.cases.newcases.success", () => {
        expect(reducers({}, {
            type: "cases/newcases/success",
            payload: {
                newcases: []
            }
        })).toEqual({
            newcases: []
        });
    });
    test("actions.cases.counters.success", () => {
        expect(reducers({}, {
            type: "cases/counters/success",
            payload: {
                counters: []
            }
        })).toEqual({counters: []});
    });
    test("actions.cases.counters.error", () => {
        expect(reducers({}, {
            type: "cases/counters/error",
            payload: {
                error: {}
            }
        })).toEqual({
            error: {}
        });
    });
    test("actions.cases.assignmentInfo.request", () => {
        expect(reducers({}, {
            type: "cases/assignmentInfo/request"
        })).toEqual({});
    });
    test("actions.cases.assignmentInfo.success", () => {
        expect(reducers({}, {
            type: "cases/assignmentInfo/success",
            payload: {
                assigmentInfo: {response:{}}
            }
        })).toEqual({assignment: {error: null, info: {}}});
    });
    test("actions.cases.assignmentInfo.error", () => {
        expect(reducers({}, {
            type: "cases/assignmentInfo/error",
            payload: {
                error: {}
            }
        })).toEqual({assignment: {error: {}, info: null}});
    });
    test("actions.cases.routeCase.success", () => {
        expect(reducers({}, {
            type: "cases/routeCase/success",
            payload: {
                routeCaseInfo: {}
            }
        })).toEqual({routedCase: {info: {}}});
    });
    test("actions.cases.routeCase.error", () => {
        expect(reducers({}, {
            type: "cases/routeCase/error",
            payload: {
                error: {}
            }
        })).toEqual({routedCase: {error: {}}});
    });
    test("actions.cases.routeName", () => {
        expect(reducers({}, {
            type: "cases/routeName",
            payload: "Test"
        })).toEqual({routeName: "Test"});
    });
    test("actions.cases.create.success", () => {
        expect(reducers({}, {
            type: "cases/create/success"
        })).toEqual({
            assigmentInfo: null
        });
    });
    test("actions.cases.forceRefresh", () => {
        expect(reducers({}, {
            type: "cases/forceRefresh",
            payload: {
                forceRefresh: true
            }
        })).toEqual({
            forceRefresh: true
        });
    });
    test("actions.cases.data.success", () => {
        expect(reducers({}, {
            type: "cases/data/success",
            payload: {
                var001: true
            }
        })).toEqual({data: {var001: true}});
    });
    test("actions.cases.reset", () => {
        expect(reducers({}, {
            type: "cases/reset"
        })).toEqual({
            newcases: null,
            draft: null,
            todo: null,
            participated: null,
            unassigned: null,
            info: null,
            forceRefresh: false,
            assigmentInfo: null,
            assignment: {
                info: null,
                error: null
            },
            routedCase: {
                info: null,
                error: null
            },
            routeName: null,
            users: null,
            data: {}
        });
    });
});
