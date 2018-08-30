const actions = {
    oauth: {
        reset: x => x
    },
    login: {
        request: x => x,
        success: credentials => ({credentials}),
        error: error => ({error})
    },
    logout: {
        request: x => x,
        success: status => ({status}),
        error: error => ({error})
    },
    googleLogin: {
        request: x => x,
        success: status => ({status})
    },
    credentials: {
        update: x => x,
        refresh: x => x
    }
};

export default actions;
