/* eslint-disable no-undef */
export default function () {
    window.JsInterface = {
        /**
         * Executes nextStep bridge function
         * @param config
         */
        nextStep (config) {
            let data = {
                type: "nextStep",
                data: JSON.parse(config)
            };
            __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(data));
        },
        /**
         * Executes getForm bridge function
         * @param formId
         * @param FormUpdateDate
         */
        getForm (formId, FormUpdateDate) {
            let data = {
                type: "getForm",
                data: {
                    dyn_uid: formId,
                    formUpdateDate: FormUpdateDate
                }
            };
            __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(data));
        },
        /**
         * Executes getFormData function
         * @param config
         */
        getFormData (config) {
            let data = {
                type: "getFormData",
                data: JSON.parse(config)
            };
            __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(data));
        },
        /**
         * Executes file picker function
         * @param strData {object}
         */
        getFile (strData) {
            let data = strData ? JSON.parse(strData) : null;
            if (data) {
                let object = {
                    type: "getFile",
                    data
                };
                __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
            }
        },
        /**
         * Executes file versions
         * @param strData {object}
         */
        getFileVersions (strData) {
            let data = strData ? JSON.parse(strData) : null;
            if (data) {
                let object = {
                    type: "getFileVersions",
                    data
                };
                __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
            }
        },
        /**
         * Executes image picker function
         * @param strData {object}
         */
        getPicture (strData) {
            let data = strData ? JSON.parse(strData) : null;
            if (data) {
                let object = {
                    type: "getPicture",
                    data
                };
                __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
            }
        },
        /**
         * Executes video picker function
         * @param strData
         */
        getVideo (strData) {
            let data = strData ? JSON.parse(strData) : null;
            if (data) {
                let object = {
                    type: "getVideo",
                    data
                };
                __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
            }
        },
        /**
         * Executes audio picker function
         * @param strData
         */
        getAudio (strData) {
            let data;
            try {
                data = strData ? JSON.parse(strData) : null;
                if (data) {
                    let object = {
                        type: "getAudio",
                        data
                    };
                    __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * Executes map dialog
         * @param params
         */
        getGeoTag (params) {
            let data = params ? JSON.parse(params) : null;
            if (data) {
                let object = {
                    type: "getGeoTag",
                    data
                };
                __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
            }
        },
        /**
         * Executes receiveFormData function
         * @param data
         */
        receiveFormData (data) {
            let object;
            object = {
                type: "receiveFormData",
                data: data ? JSON.parse(data) : null
            };
            __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
        },
        /**
         * Executes askWhichDataToUse function
         */
        askWhichDataToUse () {
            let object;
            object = {
                type: "askWhichDataToUse"
            };
            __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
        },
        /**
         * Executes getSignature function
         */
        getSignature (strData) {
            let data = strData ? JSON.parse(strData) : null;
            if (data) {
                let object = {
                    type: "getSignature",
                    data
                };
                __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
            }
        },
        /**
         * Executes downloadFile function
         */
        downloadFile (strData) {
            let data,
                object;
            try {
                data = strData ? JSON.parse(strData) : null;
                if (data) {
                    object = {
                        type: "downloadFile",
                        data
                    };
                    __REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(object));
                }
            } catch (e) {
                console.error(e); // error in the above
            }
        }
    };
}
