const actions = {
    /**
     * Actions for data Form with communicate PMDynaform
     */
    formData: {
        local: {
            save: x => x
        },
        server: {
            update: x => x,
            success: status => ({status}),
            error: error => ({error})
        }
    }
};

export default actions