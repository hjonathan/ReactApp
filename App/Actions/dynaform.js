const actions = {
    /**
     * Actions for dynaforms
     */
    dynaform: {
        processed: {
            request: x => x,
            success: status => ({status}),
            error: error => ({error})
        }
    }
};

export default actions