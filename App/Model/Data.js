import _ from "lodash";
import moment from "moment";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, DataSchema} from "./Schemas";
import {CASE, DATETIME} from "../Libs/Const";

/**
 * Model for Data
 */
class Data extends BaseModel {
    constructor () {
        super(DataSchema.schema.name);
    }

    /**
     * Save the list when the action formData/server/update is executed
     * @param params
     */
    saveData (params) {
        let saved = null,
            date = moment().format(DATETIME.LOCAL),
            data;
        RealmObject.write(() => {
            let oldData = {},
                dbCaseData = RealmObject.objects(DataSchema.schema.name).filtered(`caseId = "${params.app_uid}"`);
            if (dbCaseData.length > 0) {
                oldData = _.values(dbCaseData)[0].dataJSON;
            }
            data = {
                caseId: params.app_uid,
                caseIndex: Number(params.del_index),
                formId: params.dyn_uid,
                data: JSON.stringify(Object.assign({}, oldData, params.data)),
                createDate: moment(params.createDate).format(DATETIME.LOCAL) || date,
                updateDate: date,
                status: CASE.STATUS.OFFLINE
            };
            saved = RealmObject.create(DataSchema.schema.name, data, true);
        });
        return {saved};
    }

    /**
     * Save case data when the action cases/data/request is executed
     * @param payload
     * @param state
     * @returns {{saved: *}}
     */
    saveCaseData (payload, state) {
        const {params, response} = payload;
        let saved = null,
            date = moment().format(DATETIME.LOCAL),
            data;
        RealmObject.write(() => {
            let oldData = {},
                dbCaseData = RealmObject.objects(DataSchema.schema.name).filtered(`caseId = "${params.app_uid}"`);
            if (dbCaseData.length > 0) {
                oldData = _.values(dbCaseData)[0].dataJSON;
            }
            data = {
                caseId: params.app_uid,
                caseIndex: Number(params.del_index),
                data: JSON.stringify(Object.assign({}, oldData, response)),
                formId: params.formId || "",
                stepId: params.stepId || "",
                stepHistory: JSON.stringify(params.stepHistory) || "[]",
                createDate: moment(params.createDate).format(DATETIME.LOCAL) || date,
                updateDate: date,
                type: params.type || state.Cases.routeName,
                status: params.status || CASE.STATUS.NONE
            };
            saved = RealmObject.create(DataSchema.schema.name, data, true);
        });
        return {saved};
    }

    /**
     * Get data
     * @param caseId
     * @returns {*}
     */
    getDataCase (caseId) {
        return _.values(RealmObject.objects(DataSchema.schema.name).filtered(`caseId = "${caseId}"`)).shift();
    }

    /**
     * Get all data in status offline
     * @param caseId
     * @returns {*}
     */
    getAllCaseOffline () {
        return _.values(RealmObject.objects(DataSchema.schema.name).filtered(`status = "${CASE.STATUS.OFFLINE}"`));
    }

    /**
     * Get data of case with caseId and status is equal to working (work in progress)
     * @param caseId
     * @returns {*}
     */
    filterCaseIdWIP (caseId) {
        const result = RealmObject.objects(DataSchema.schema.name)
            .filtered(`caseId = "${caseId}" AND status = "${CASE.STATUS.WORKING}"`);
        return _.values(result.map((x) => {
            let newObject = _.assign({}, x);
            newObject.stepHistory = x.stepHistoryArray;
            newObject.data = x.dataJSON;
            return newObject;
        })).shift();
    }

    /**
     * Change status of row
     * @param caseId
     * @param status
     */
    changeStatus (caseId, status) {
        let dbData;
        RealmObject.write(() => {
            dbData = _.values(RealmObject.objects(DataSchema.schema.name).filtered(`caseId = "${caseId}"`)).shift();
            if (dbData) {
                dbData.status = status;
                RealmObject.create(DataSchema.schema.name, dbData, true);
            }
        });
    }

    /**
     * Remove the specified data case of storage.
     * @param value
     */
    destroyDataCase (value) {
        RealmObject.write(() => {
            let data = RealmObject.objects(DataSchema.schema.name).filtered(`caseId = "${value}"`);
            RealmObject.delete(data);
        });
    }
    /**
     * Delete multiple Form
     */
    destroyObject () {
        RealmObject.write(() => {
            let allObjects = RealmObject.objects(DataSchema.schema.name);
            RealmObject.delete(allObjects); // Deletes all Forms
        });
    }
}

export default new Data();
