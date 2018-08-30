import RegServices from "./Registry";

export default () => ({
    /**
         * Connect with "/light/user/data"
         * @param keys
         * @returns {Promise<Response>}
         */
    userData (keys) {
        const service = RegServices.getUrl(Object.assign({}, keys), "USER_DATA");
        if (keys.isConnected) {
            return fetch(service, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${keys.access_token}`
                }
            })
                .then(response => response.json());
        }
        return {};
    }
});
