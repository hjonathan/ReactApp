import oauth from "./oauth";
import caseNotes from "./caseNotes";
import user from "./user";
import cases from "./cases";
import dynaform from "./dynaform";
import fileUpload from "./file";
import uploadLocation from "./uploadLocation";
import notifications from "./notifications";

let arrayApi = [oauth, user, cases, caseNotes, dynaform, notifications, fileUpload, uploadLocation];

/**
 * Container of Api Services
 * @param confServer
 * @param keys
 * @returns {{}}
 */
export default (confServer, keys) => {
    let confApi = {},
        value,
        i;
    for (i = 0; i < arrayApi.length; i += 1) {
        value = arrayApi[i];
        confApi = Object.assign(confApi, value(confServer, keys));
    }

    /**
     * Try the error from services api
     * @param error
     * @returns {*}
     */
    this.tryError = (error) => {
        if (error.code) {
            return {
                error: error.code,
                error_description: error.message
            };
        }
        return error;
    };
    return confApi;
};
