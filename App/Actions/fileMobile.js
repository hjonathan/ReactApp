const actions = {
    file: {
        formDataFile: {
            request: x => x,
            success: response => ({response}),
            error: error => ({error})
        },
        register: {
            request: x => x,
            success: x => x,
            error: error => ({error})
        },
        upload: {
            request: x => x,
            success: response => ({response}),
            error: error => ({error})
        }
    }
};

export default actions;
