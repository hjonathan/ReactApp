import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {
    isLoggedIn: false,
    isGoogleLoggedIn: false,
    credentials: null,
    error: null
};
export default handleActions(
    {
        /**
         * Reducer for "login/success" action
         * @param state
         * @param action
         */
        [actions.login.success]: (state, action) => ({
            ...state,
            credentials: action.payload.credentials,
            error: null,
            isLoggedIn: true
        }),
        /**
         * Reducer for "login/error" action
         * @param state
         * @param action
         */
        [actions.login.error]: (state, action) => ({
            ...state,
            error: action.payload.error
        }),
        /**
         * Reducer for "credentials/update" action
         * @param state
         * @param action
         */
        [actions.credentials.update]: (state, action) => ({
            ...state,
            credentials: action.payload,
            error: null
        }),
        /**
         * Reducer for "logout/success" action
         * @param state
         * @param action
         */
        [actions.logout.success]: (state, action) => ({
            ...state,
            credentials: null,
            error: null,
            isLoggedIn: false,
            isGoogleLoggedIn: false
        }),
        /**
         * Reducer for "googleLogin/success" action
         * @param state
         * @param action
         */
        [actions.googleLogin.success]: (state, action) => ({
            ...state,
            credentials: action.payload.credentials,
            error: null,
            isLoggedIn: true,
            isGoogleLoggedIn: true
        }),
        /**
         * Resets states
         * @param state
         * @param action
         * @returns {object}
         */
        [actions.oauth.reset]: () => (initialState)
    },
    initialState
);
