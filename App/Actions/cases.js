const actions = {
    /**
     * Actions for cases
     */
    cases: {
        reset: x => x,
        forceRefresh: x => x,
        create: {
            request: x => x,
            success: status => ({status}),
            error: error => ({error})
        },
        inbox: {
            request: x => x,
            success: todo => ({todo}),
            error: error => ({error})
        },
        unassigned: {
            request: x => x,
            success: data => ({data}),
            error: error => ({error})
        },
        participated: {
            request: x => x,
            success: data => ({data}),
            error: error => ({error})
        },
        draft: {
            request: x => x,
            success: data => ({data}),
            error: error => ({error})
        },
        history: {
            request: x => x,
            success: data => ({data}),
            error: error => ({error})
        },
        info: {
            request: x => x,
            error: error => ({error}),
            success: info => ({info})
        },
        newcases: {
            request: x => x,
            error: error => ({error}),
            success: newcases => ({newcases})
        },
        claim: {
            request: x => x,
            error: error => ({error}),
            success: claim => ({claim})
        },
        counters: {
            request: x => x,
            success: counters => ({counters}),
            error: error => ({error})
        },
        userInfo: {
            request: x => x,
            success: data => ({data}),
            error: error => ({error})
        },
        assignmentInfo: {
            request: x => x,
            success: assigmentInfo => ({assigmentInfo}),
            error: error => ({error})
        },
        routeCase: {
            request: x => x,
            success: routeCaseInfo => ({routeCaseInfo}),
            error: error => ({error})
        },
        routeName: x => x,
        data: {
            request: x => x,
            success: data => data,
            error: error => ({error})
        }
    }
};

export default actions;
