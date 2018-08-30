const actions = {
    notification: {
        token: {
            save: x => x,
            request: x => x,
        },
        device: {
            request: x => x,
            success: x => x,
            error: error => ({error})
        }
    },
};

export default actions;