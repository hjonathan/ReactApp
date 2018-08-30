const actions = {
    /**
     * Actions for Connection
     */
    net: {
        connected: {
            request: status => ({status}),
            update: x => x,
            error: error => ({error})
        },
        syncDown: {
            request: status => ({status}),
            error: error => ({error})
        },
        syncUp: {
            upload: x => x,
            request: status => ({status}),
            error: error => ({error})
        },
        mobile: {
            syncData: x => x
        },
        case: {
            new: x => x,
            list: x => x
        },
        progressDialog: x => x
    }
};

export default actions;
