import {call, put} from "redux-saga/effects";
import Utils from "./index";

export default {
    /**
     * Try a simple call to API and process the response
     * @param config
     * @returns {IterableIterator<*>}
     */
    * tryEffectsApiRequest (config) {
        let response = {},
            params;
        try {
            params = Utils.mergePropsStateApi(config.state);
            const res = yield call(
                config.wsManager[config.service],
                Object.assign({}, params, config.state.Net), config.payload
            );
            if (Object.prototype.hasOwnProperty.call(res, "error") && res.error) {
                yield put(config.action.error(Utils.tryError(res.error)));
                response = {error: res.error};
            } else {
                yield put(config.action.success({
                    response: res,
                    params: config.payload
                }));
                response = {
                    response: res,
                    params: config.payload
                };
            }
        } catch (e) {
            yield put(config.action.error({error: "error", error_description: e.toString()}));
            response = {error: e};
        }
        return response;
    },
    /**
     * Gets the response of the API
     * @param config
     * @returns {IterableIterator<*>}
     */
    * tryApiRequest (config) {
        let response = {},
            params;
        try {
            params = Utils.mergePropsStateApi(config.state);
            const res = yield call(
                config.wsManager[config.service],
                Object.assign({}, params, config.state.Net),
                config.payload
            );
            if (res.error) {
                response = {error: res.error};
            } else {
                response = {
                    response: res,
                    params: config.payload
                };
            }
        } catch (e) {
            response = {error: e};
        }
        return response;
    }
};
