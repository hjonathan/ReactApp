import {call, put, select} from 'redux-saga/effects'
import actions from "../Actions"
import Utils from "../Utils"

export default (WsManager) => {
    /**
     * Method to perform the token exchange for a server id
     */
    function* getDeviceIdOfServer() {
        let state = yield select();
        try {
            const response = yield call(WsManager.saveToken, Object.assign({}, Utils.mergePropsStateApi(state), state.Notification));
            if (!response.error) {
                yield put(actions.notification.device.success(response));
            }
        } catch (e) {
            yield put(actions.notification.device.error({error: "error", error_description: e.toString()}));
        }
    }

    return {
        [actions.notification.device.request]: getDeviceIdOfServer
    };
};
