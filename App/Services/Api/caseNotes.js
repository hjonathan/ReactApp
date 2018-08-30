import RegServices from "./Registry";

export default () => {
    return {
        /**
         * Connect with /light/case/{app_uid}/notes
         * @param keys
         * @param params
         * @returns {*|Promise.<TResult>|Promise}
         */
        casesNotes(keys, params) {
            const service = RegServices.getUrl(Object.assign({}, keys, params), "GET_CASE_NOTES_LIST");
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + keys.access_token
                }
            }).then(response => {
                return response.json()
            });
        },
        /**
         * Connect with /light/case/{app_uid}/note
         * @param keys
         * @param params
         * @returns {*|Promise.<TResult>|Promise}
         */
        postCaseNote(keys, params) {
            const service = RegServices.getUrl(Object.assign({}, keys, params), "ADD_NOTE");
            let body = Object.assign({}, params);
            delete body.app_uid;
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + keys.access_token
                },
                body: JSON.stringify(body)
            }).then(response => {
                return response.json()
            });
        }
    }
}
