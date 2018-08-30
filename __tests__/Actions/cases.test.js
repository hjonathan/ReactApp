import actions from "../../App/Actions"

describe('Actions Cases', () => {
    test('Actions for cases', () => {
        expect(actions.cases.reset()).toEqual({type: "cases/reset"});
        expect(actions.cases.forceRefresh()).toEqual({type: "cases/forceRefresh"});

        expect(actions.cases.create.request()).toEqual({type: "cases/create/request"});
        expect(actions.cases.create.success({})).toEqual({type: "cases/create/success", payload: {status: {}}});
        expect(actions.cases.create.error({})).toEqual({type: "cases/create/error", payload: {error: {}}});

        expect(actions.cases.inbox.request()).toEqual({type: "cases/inbox/request"});
        expect(actions.cases.inbox.success({})).toEqual({type: "cases/inbox/success", payload: {todo: {}}});
        expect(actions.cases.inbox.error({})).toEqual({type: "cases/inbox/error", payload: {error: {}}});

        expect(actions.cases.unassigned.request()).toEqual({type: "cases/unassigned/request"});
        expect(actions.cases.unassigned.success({})).toEqual({type: "cases/unassigned/success", payload: {data: {}}});
        expect(actions.cases.unassigned.error({})).toEqual({type: "cases/unassigned/error", payload: {error: {}}});

        expect(actions.cases.participated.request()).toEqual({type: "cases/participated/request"});
        expect(actions.cases.participated.success({})).toEqual({type: "cases/participated/success", payload: {data: {}}});
        expect(actions.cases.participated.error({})).toEqual({type: "cases/participated/error", payload: {error: {}}});

        expect(actions.cases.draft.request()).toEqual({type: "cases/draft/request"});
        expect(actions.cases.draft.success({})).toEqual({type: "cases/draft/success", payload: {data: {}}});
        expect(actions.cases.draft.error({})).toEqual({type: "cases/draft/error", payload: {error: {}}});

        expect(actions.cases.history.request()).toEqual({type: "cases/history/request"});
        expect(actions.cases.history.success({})).toEqual({type: "cases/history/success", payload: {data: {}}});
        expect(actions.cases.history.error({})).toEqual({type: "cases/history/error", payload: {error: {}}});

        expect(actions.cases.info.request()).toEqual({type: "cases/info/request"});
        expect(actions.cases.info.success({})).toEqual({type: "cases/info/success", payload: {info: {}}});
        expect(actions.cases.info.error({})).toEqual({type: "cases/info/error", payload: {error: {}}});

        expect(actions.cases.claim.request()).toEqual({type: "cases/claim/request"});
        expect(actions.cases.claim.success({})).toEqual({type: "cases/claim/success", payload: {claim: {}}});
        expect(actions.cases.claim.error({})).toEqual({type: "cases/claim/error", payload: {error: {}}});

        expect(actions.cases.counters.request()).toEqual({type: "cases/counters/request"});
        expect(actions.cases.counters.success({})).toEqual({type: "cases/counters/success", payload: {counters: {}}});
        expect(actions.cases.counters.error({})).toEqual({type: "cases/counters/error", payload: {error: {}}});

        expect(actions.cases.userInfo.request()).toEqual({type: "cases/userInfo/request"});
        expect(actions.cases.userInfo.success({})).toEqual({type: "cases/userInfo/success", payload: {data: {}}});
        expect(actions.cases.userInfo.error({})).toEqual({type: "cases/userInfo/error", payload: {error: {}}});

        expect(actions.cases.newcases.request()).toEqual({type: "cases/newcases/request"});
        expect(actions.cases.newcases.success({})).toEqual({type: "cases/newcases/success", payload: {newcases: {}}});
        expect(actions.cases.newcases.error({})).toEqual({type: "cases/newcases/error", payload: {error: {}}});

        expect(actions.cases.assignmentInfo.request()).toEqual({type: "cases/assignmentInfo/request"});
        expect(actions.cases.assignmentInfo.success({})).toEqual({type: "cases/assignmentInfo/success", payload: {assigmentInfo: {}}});
        expect(actions.cases.assignmentInfo.error({})).toEqual({type: "cases/assignmentInfo/error", payload: {error: {}}});

        expect(actions.cases.routeCase.request()).toEqual({type: "cases/routeCase/request"});
        expect(actions.cases.routeCase.success({})).toEqual({type: "cases/routeCase/success", payload: {routeCaseInfo: {}}});
        expect(actions.cases.routeCase.error({})).toEqual({type: "cases/routeCase/error", payload: {error: {}}});

        expect(actions.cases.routeName("Test")).toEqual({type: "cases/routeName", payload: "Test"});

        expect(actions.cases.data.request()).toEqual({type: "cases/data/request"});
        expect(actions.cases.data.success({})).toEqual({type: "cases/data/success", payload: {}});
        expect(actions.cases.data.error({})).toEqual({type: "cases/data/error", payload: {error: {}}});
    });
});
