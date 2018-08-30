import RNFetchBlob from "react-native-fetch-blob";
import RegServices from "./Registry";
import store from "../../Store";
import actions from "../../Actions";

export default () => ({
    /**
     * Gets AppDocUid and initial data
     * Connects to /light/case/{app_uid}/upload
     * @param keys
     * @param params
     */
    getAppDocUid (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_FORM_ID_TO_UPLOAD");
        let appDocType = params.docUid ? "INPUT" : "ATTACHED";
        if (params.docType) {
            appDocType = params.docType;
        }
        let body = JSON.stringify([{
            name: params.name,
            appDocType,
            docUid: params.docUid,
            fieldName: params.idField ? params.idField : undefined,
            appDocUid: params.appDocUID ? params.appDocUID : undefined
        }]);
        if (keys.isConnected) {
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                },
                body
            })
                .then(response => response.json());
        }
        return null;
    },

    /**
     * Uploads mobile control file
     * Connects to /light/case/{app_uid}/upload/{app_doc_uid}
     * @param keys
     * @param params
     */
    uploadFile (keys, params) {
        const url = RegServices.getUrl(Object.assign({}, keys, params), "UPLOAD_FILE"),
            data = new FormData();
        data.append("form[]", {
            uri: encodeURI(`file://${params.path}`),
            type: params.type,
            name: encodeURI(params.name)
        });
        if (keys.isConnected) {
            return fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${keys.access_token}`
                },
                body: data
            })
                .then(response => response.json());
        }
        return null;
    },

    /**
     * Get list versions for file
     * Connects to /cases/{app_uid}/input-document/{app_doc_uid}/versions
     * @param keys
     * @param params
     */
    fileVersions (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_FILE_VERSIONS");
        if (keys.isConnected) {
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return null;
    },
    /**
     * Download file of api
     * Connects to /cases/{app_uid}/input-document/{app_doc_uid}/file?v={version}
     * @param keys
     * @param params
     */
    downloadFile (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_FORM_DEFINITIONS");
        if (keys.isConnected) {
            return RNFetchBlob
                .config({
                    path: `${RNFetchBlob.fs.dirs.DownloadDir}/${params.name}`
                })
                .fetch("GET", service, {
                    Authorization: `Bearer ${keys.access_token}`
                })
                .progress((received, total) => {
                    store.dispatch(actions.formRender.download.progress(parseInt((received / total) * 100, 10)));
                })
                .then(response => response);
        }
        return null;
    }
});
