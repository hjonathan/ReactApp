export default {
    /**
     * Merge Objects from state to Api
     * @param state
     * @returns {*}
     */
    mergePropsStateApi (state) {
        return Object.assign({}, state.Settings.server, state.Oauth.credentials);
    },
    /**
     * GEt the Settings object from State
     * @param state
     * @returns {navigatorStack.Settings|{screen, navigationOptions}|Settings|{error, server}|*|getScreenOptions.Settings}
     */
    getSettings (state) {
        return state.Settings;
    },
    /**
     * Try the error from services api
     * @param error
     * @returns {*}
     */
    tryError (error) {
        if (error.code) {
            return {
                error: error.code,
                error_description: error.message
            };
        }
        return error;
    }
};
