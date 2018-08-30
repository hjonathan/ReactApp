const fetch = (options) => {
        let promise = new Promise((resolve, reject) => {
            resolve(true);
        });
        promise.progress = () => (promise);
        promise.uploadProgress = () => (promise);
        promise.part = () => (promise);
        promise.stateChange = () => (promise);
        promise.expire = () => (promise);
        promise.cancel = () => (promise);
        promise.taskId = "";
        return promise;
    },
    config = options => ({fetch: fetch.bind(options)}),
    fs = {
        dirs: {
            DocumentDir: "",
            DownloadDir: ""
        }
    };

export default {
    fetch,
    config,
    fs
};
