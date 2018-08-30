const actions = {
    /**
     * Actions for settings Screen
     */
    settings: {
        updateUrl: x => x,
        updateWorkspace: x => x,
        updateSettings: x => x,
        backButtonPressed: x => x,
        error: error => ({error})
    }
};

export default actions;
