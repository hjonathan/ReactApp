import RegServices from "./Registry";
import OfflineCase from "../../Libs/Offline/Case";

export default () => ({

    /**
     * Connect with
     * /light/project/{prj_uid}/dynaformprocessed/{dyn_uid}?app_uid={app_uid}&del_index={del_index}
     * @param keys
     * @param params
     * @returns {*|Promise.<TResult>|Promise}
     */
    dynaformProcessed (keys, params) {
        const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_FORM_DEFINITION_PREPROCESSED");
        if (keys.isConnected) {
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            }).then(response => response.json());
        }
        return OfflineCase.formWithData(params);
    }
});
