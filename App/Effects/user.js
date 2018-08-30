import {call, put, select} from "redux-saga/effects";
import {NavigationActions} from "react-navigation";
import actions from "../Actions";
import Utils from "../Utils";

export default (WsManager) => {
    /**
     * Function Generator for request user data
     * @param action
     */
    function* requestUserData (action) {
        let state = yield select();
        try {
            let userData = yield call(WsManager.userData, Object.assign({}, Utils.mergePropsStateApi(state), state.Net, {User: state.User}), action.payload);
            if (userData.error) {
                yield put(actions.userData.error(this.tryError(userData.error)));
            } else {
                yield put(actions.userData.success(userData));
                yield put(NavigationActions.setParams({
                    key: "Drawer",
                    params: {userData}
                }));
            }
        } catch (e) {
            yield put(actions.userData.error({
                error: "error",
                error_description: e.toString()
            }));
        }
    }

    return {
        [actions.userData.request]: requestUserData
    };
};
