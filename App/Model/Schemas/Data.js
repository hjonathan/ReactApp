import moment from "moment";
import {CASE, DATETIME} from "../../Libs/Const";
/**
 * Schema for model Data
 */
export default class DataSchema {
    static schema = {
        name: "DataSchema",
        primaryKey: "caseId",
        properties: {
            caseId: {type: "string"},
            caseIndex: {type: "int"},
            data: {type: "string"},
            formId: {type: "string?", default: ""},
            stepId: {type: "string?", default: ""},
            stepHistory: {type: "string?", default: "[]"},
            createDate: {type: "string?", default: moment().format(DATETIME.LOCAL)},
            updateDate: {type: "string?", default: moment().format(DATETIME.LOCAL)},
            type: {type: "string?", default: ""},
            status: {type: "string?", default: CASE.STATUS.NONE}
        }
    };

    /**
     * Returns the data in json format
     * @returns {{}}
     */
    get dataJSON () {
        return this.data ? JSON.parse(this.data) : {};
    }

    /**
     * Returns the data in json format
     * @returns {Array}
     */
    get stepHistoryArray () {
        return this.stepHistory ? JSON.parse(this.stepHistory) : [];
    }
}
