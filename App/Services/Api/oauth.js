import RegServices from "./Registry";

export default (confServer, globalKeys) => {
    let confApi = Object.assign({}, confServer, globalKeys);
    return {
        /**
         * Connect with /oauth2/token
         * @param keys
         * @param params
         * @returns {*|Promise.<TResult>|Promise}
         */
        login (keys, params) {
            const service = RegServices.getUrl(Object.assign({}, keys), "AUTHENTICATE_USER"),
                clientSecret = confApi.clientSecret,
                clientId = confApi.clientId;

            let body = Object.assign({
                grant_type: "password",
                scope: "*",
                client_secret: clientSecret,
                client_id: clientId
            }, params);
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(response => response.json());
        },
        /**
         * Connect with /authentication/gmail
         * @param keys
         * @param params
         * @returns {*|Promise.<TResult>|Promise}
         */
        googleLogin (keys, params) {
            const service = RegServices.getUrl(Object.assign({}, keys), "SIGN_IN_TO_PM_WITH_GOOGLE");
            let body = Object.assign({
                scope: "*"
            }, params);
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(response => response.json());
        },
        /**
         * Connect with /light/config
         * @param keys
         * @param params
         * @returns {*|Promise.<TResult>|Promise}
         */
        settings (keys, params) {
            const service = RegServices.getUrl(Object.assign({}, keys), "REQUEST_SYS_CONFIG");
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then(response => response.json());
        },
        /**
         * Connect with /light/logout
         * @param keys
         * @param params
         * @returns {*|Promise.<TResult>|Promise}
         */
        logout (keys, params) {
            const service = RegServices.getUrl(Object.assign({}, keys, params), "LOGOUT_USER");
            let body = {
                access: keys.access_token,
                refresh: keys.refresh_token
            };
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                },
                body: JSON.stringify(body)
            }).then(response => response.json());
        }
    };
};
