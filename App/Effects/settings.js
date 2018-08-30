import {call, put, select} from "redux-saga/effects";
import {NavigationActions} from "react-navigation";
import actions from "../Actions";
import Utils from "../Utils";

export default (WsManager) => {
    /**
     * Method to effect backButtonPressed in Screen settings
     * @param action
     */
    function* backButtonPressed (action) {
        try {
            let params = action.payload,
                state = yield select(),
                configServer,
                keys;
            configServer = state.Settings.server;

            if (params.previousConfig.url !== configServer.url ||
                params.previousConfig.workspace !== configServer.workspace) {
                keys = Object.assign({}, Utils.mergePropsStateApi(state), state.Net);
                const config = yield call(WsManager.settings, keys, action.payload);
                if (config.error) {
                    yield put(actions.settings.error(config.error));
                    return;
                }
                if (params.logged) {
                    yield put(actions.logout.request({
                        url: params.previousConfig.url,
                        workspace: params.previousConfig.workspace
                    }));
                }
            }
            yield put(NavigationActions.back());
        } catch (e) {
            yield put(actions.settings.error({message: e.toString()}));
        }
    }

    return {
        [actions.settings.backButtonPressed]: backButtonPressed
    };
};
