/**
 * Find the step in state by prj_uid, act_uid, dyn_uid
 * @param state
 * @param prjUid
 * @param actUid
 * @param dynUid
 * @returns {*}
 */
export function findStep (state, prjUid, actUid, dynUid) {
    if (state.Project[prjUid] && state.Project[prjUid].tasks[actUid]) {
        let {steps} = state.Project[prjUid].tasks[actUid];
        for (let index = 0; index <= steps.length; index += 1) {
            if (steps[index].formId === dynUid) {
                return steps[index];
            }
        }
    }
    return null;
}
/**
 * Find the step zero in state by prj_uid, act_uid
 * @param state
 * @param prjUid
 * @param actUid
 * @returns {*}
 */
export function findStepsZeroByTaskId (state, prjUid, actUid) {
    if (state.Project[prjUid] && state.Project[prjUid].tasks[actUid]) {
        return state.Project[prjUid].tasks[actUid].steps[0];
    }
    return null;
}
/**
 * Return all object route of respective routeName
 * @param navigationReducer
 * @param routeName
 * @returns {*}
 */
export function findRouteByRouteName (navigationReducer, routeName) {
    let objectRoute = null;
    if (navigationReducer.routes && navigationReducer.routes.length > 0) {
        let {routes} = navigationReducer;
        for (let index = 0; index < routes.length; index += 1) {
            if (Object.prototype.hasOwnProperty.call(routes[index], "routeName") &&
                routes[index].routeName === routeName) {
                objectRoute = routes[index];
                break;
            }
            if (routes[index].routes) {
                objectRoute = findRouteByRouteName(routes[index], routeName);
                if (objectRoute) {
                    break;
                }
            }
        }
    }
    return objectRoute;
}
