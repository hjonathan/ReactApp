import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {
    newcases: null,
    todo: null,
    draft: null,
    unassigned: null,
    participated: null,
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
};

export default handleActions(
    {
        /**
         * Reducer for "cases/inbox/success" action
         * @param state
         * @param action
         * @returns {Array|null}
         */
        [actions.cases.inbox.success]: (state, action) => ({
            ...state,
            newcases: null,
            todo: action.payload.todo,
            draft: null,
            unassigned: null,
            participated: null
        }),
        /**
         * Reducer for "cases/unassigned/success" action
         * @param state
         * @param action
         * @returns {Array|null}
         */
        [actions.cases.unassigned.success]: (state, action) => ({
            ...state,
            newcases: null,
            todo: null,
            draft: null,
            unassigned: action.payload.data,
            participated: null
        }),
        /**
         * Reducer for "cases/participated/success" action
         * @param state
         * @param action
         * @returns {Array|null}
         */
        [actions.cases.participated.success]: (state, action) => ({
            ...state,
            newcases: null,
            todo: null,
            draft: null,
            unassigned: null,
            participated: action.payload.data
        }),
        /**
         * Reducer for "cases/draft/success" action
         * @param state
         * @param action
         * @returns {Array}
         */
        [actions.cases.draft.success]: (state, action) => ({
            ...state,
            newcases: null,
            todo: null,
            draft: action.payload.data,
            unassigned: null,
            participated: null
        }),
        /**
         * Reducer for "cases/history/success" action
         * @param state
         * @param action
         * @returns {Array}
         */
        [actions.cases.history.success]: (state, action) => ({
            ...state,
            history: action.payload.data
        }),
        /**
         * Reducer for "cases/info/success" action
         * @param state
         * @param action
         * @returns {{info}}
         */
        [actions.cases.info.success]: (state, action) => ({
            ...state,
            info: action.payload.info
        }),
        /**
         * Reducer for "cases/claim/success" action
         * @param state
         * @param action
         * @returns {{claim: *}}
         */
        [actions.cases.claim.success]: (state, action) => ({
            ...state,
            claim: action.payload.claim
        }),
        /**
         * Reducer for "cases/claim/error" action
         * @param state
         * @param action
         * @returns {{error: *}}
         */
        [actions.cases.claim.error]: (state, action) => ({
            ...state,
            error: action.payload.error
        }),
        /**
         * Reducer for "cases/userInfo/success" action
         * @param state
         * @param action
         * @returns {{users: *}}
         */
        [actions.cases.userInfo.success]: (state, action) => ({
            ...state,
            users: action.payload.data
        }),
        /**
         * Reducer for "cases/newcases/success" action
         * @param state
         * @param action
         * @returns {{newcases}}
         */
        [actions.cases.newcases.success]: (state, action) => ({
            ...state,
            newcases: action.payload.newcases
        }),
        /**
         * Reducer for "cases/counters/success" action
         * @param state
         * @param action
         * @returns {{info}}
         */
        [actions.cases.counters.success]: (state, action) => ({
            ...state,
            counters: action.payload.counters
        }),
        /**
         * Reducer for "cases/counters/error" action
         * @param state
         * @param action
         * @returns {{info}}
         */
        [actions.cases.counters.error]: (state, action) => ({
            ...state,
            error: action.payload.error
        }),
        /**
         * Reducer for "cases/assignmentInfo/success" action
         * @param state
         * @param action
         * @returns {{assigmentInfo: null}}
         */
        [actions.cases.assignmentInfo.success]: (state, action) => ({
            ...state,
            assignment: {
                info: action.payload.assigmentInfo.response,
                error: null
            }
        }),
        /**
         * Reducer for "cases/assignmentInfo/error" action
         * @param state
         * @param action
         * @returns {{error}}
         */
        [actions.cases.assignmentInfo.error]: (state, action) => ({
            ...state,
            assignment: {
                info: null,
                error: action.payload.error
            }
        }),
        /**
         * Reducer for "cases/routeCase/success" action
         * @param state
         * @param action
         * @returns {{routeCaseInfo}}
         */
        [actions.cases.routeCase.success]: (state, action) => ({
            ...state,
            routedCase: {
                ...state.routedCase,
                info: action.payload.routeCaseInfo
            }
        }),
        /**
         * Reducer for "cases/routeCase/error" action
         * @param state
         * @param action
         * @returns {{error}}
         */
        [actions.cases.routeCase.error]: (state, action) => ({
            ...state,
            routedCase: {
                ...state.routedCase,
                error: action.payload.error
            }
        }),
        /**
         * Reducer for "cases/routeName" action
         * @param state
         * @param action
         * @returns {{routeName: ""}}
         */
        [actions.cases.routeName]: (state, action) => ({
            ...state,
            routeName: action.payload
        }),
        /**
         * Reducer for "cases/create/success" action
         * @param state
         * @param action
         * @returns {{assigmentInfo: null}}
         */
        [actions.cases.create.success]: (state, action) => ({
            ...state,
            assigmentInfo: null
        }),
        /**
         * Reducer for "cases/forceRefresh" action
         * @param state
         * @param action
         * @returns {{forceRefresh}}
         */
        [actions.cases.forceRefresh]: (state, action) => Object.assign({}, state, {
            forceRefresh: action.payload.forceRefresh
        }),
        /**
         * Reducer for "cases/data/success" action
         * @param state
         * @param action
         * @returns {{forceRefresh}}
         */
        [actions.cases.data.success]: (state, action) => ({
            ...state,
            data: action.payload
        }),
        /**
         * Resets initial states
         * @returns {object}
         */
        [actions.cases.reset]: () => (initialState)
    },
    initialState
);
