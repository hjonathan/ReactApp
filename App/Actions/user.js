const actions = {
    /**
     * Action for request user data
     */
    userData: {
        request: x => x,
        success: status => ({status}),
        error: error => ({error})
    }
};

export default actions
