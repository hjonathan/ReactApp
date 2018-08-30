import {call, put, select} from 'redux-saga/effects'
import actions from "../Actions"
import Utils from "../Utils"

export default (WsManager) => {
    /**
     * Method to process the data from webView bridge call:nextStep
     * @param action
     */
    function* updateFormData(action) {
        let state = yield select();
        let payload = yield call(Utils.tryEffectsApiRequest, {
            wsManager: WsManager,
            payload: Object.assign({}, action.payload.config, action.payload.stepData),
            state: state,
            service: "saveFormData",
            action: actions.formData.server
        });
        yield put(actions.formData.local.save({
            app_uid: action.payload.config.app_uid,
            data: action.payload.stepData.data
        }));
    }

    return {
        [actions.formData.server.update]: updateFormData,
    };
};
