const actions = {
    /**
     * Actions for file Stream
     */
    fs: {
        app: {
            folders: {
                create: x => x,
                remove: x => x
            },
            buildProd: {
                download: x => x
            }
        }
    }
};

export default actions