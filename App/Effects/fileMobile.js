import {call, put, select} from "redux-saga/effects";
import actions from "../Actions";
import Utils from "../Utils";

export default (WsManager) => {
    /**
     * Calls to endpoint for upload file and saves the path file
     * @param data
     * @returns {IterableIterator<*>}
     */
    function* uploadFile (data) {
        let state = yield select(),
            storeFile = "text.txt",
            uploadedFile = null,
            params,
            index = 0;

        params = {
            app_uid: data.params.app_uid,
            app_doc_uid: data.response[index].appDocUid,
            name: data.params.name,
            path: data.params.path,
            type: data.params.type,
            extension: data.params.extension
        };
        if (!data.error) {
            yield call(Utils.savePath, params.path);
            yield put(actions.formRender.inject.setFiles({
                flowStatus: "setFiles",
                response: {
                    files: [Object.assign({}, data.response[index], {
                        id: data.response[index].appDocUid,
                        extension: data.params.extension,
                        filePath: storeFile
                    })],
                    idField: data.params.idField
                }
            }));
            uploadedFile = yield call(Utils.tryApiRequest, {
                wsManager: WsManager,
                payload: params,
                state,
                service: "uploadFile"
            });
            if (uploadedFile) {
                yield put(actions.file.register.success(Object.assign(params, data.response[index])));
                if (uploadedFile.error) {
                    yield put(actions.file.register.error(uploadedFile.error));
                }
            }
        }
    }
    /**
     * Effect for gets the appDocUid and uploadFile
     * @param  action
     */
    function* registerFile (action) {
        let state = yield select(),
            initDataFile;
        // Gets appDocUid
        initDataFile = yield call(Utils.tryApiRequest, {
            wsManager: WsManager,
            payload: action.payload,
            state,
            service: "getAppDocUid"
        });
        if (initDataFile.response) {
            yield call(uploadFile, initDataFile);
        }
        // TODO: The error handler will be resolved on the ticket PRE-85
    }

    return {
        [actions.file.register.request]: registerFile,
        [actions.file.upload.request]: uploadFile
    };
};
