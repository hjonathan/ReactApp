import RegServices from "./Registry"

/**
 *
 * @param confServer
 * @param keys
 * @returns {*}
 */
export default (confServer, keys) => {
    let confApi = Object.assign({}, confServer, keys);
    return {
        /**
         * Saves the device token on the server
         * @param keys
         * @returns {Promise<Response>}
         */
        saveToken(keys) {
            const service = RegServices.getUrl(Object.assign({}, keys), "REGISTER_DEVICE_TOKEN_FOR_NOTIFICATIONS");
            let body = {
                deviceIdToken: keys.token.token,
                deviceType: keys.token.os,
                sysLanguage: 'US'
            };
            return fetch(service, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + keys.access_token
                },
                body: JSON.stringify(body)
            }).then((response) => {
                return response.json();
            });
        },

        /**
         * Delete the device token on the server
         * @param keys
         * @returns {Promise<Response>}
         */
        resetNotification(keys) {
            const service = RegServices.getUrl(Object.assign({}, keys, {dev_uid: keys.device.devUid}), "UNREGISTER_DEVICE_TOKEN_FOR_NOTIFICATIONS");
            return fetch(service, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + keys.access_token
                }
            }).then(response => {
                return response.json()
            });
        }
    }
}
