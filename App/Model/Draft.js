import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, DraftSchema, DataSchema} from "./Schemas";
import {CASE} from "../Libs/Const";

/**
 * Model for list Draft
 */
class DraftCase extends BaseModel {
    constructor () {
        super(DraftSchema.schema.name);
    }

    /**
     * Save the list when the action cases/draft/success is executed
     * @param listDraft
     */
    saveList (listDraft) {
        let dbData;
        RealmObject.write(() => {
            listDraft.data.response.map((draftCase) => {
                let otherCase = RealmObject.objects(DataSchema.schema.name).filtered(`caseId = "${draftCase.caseId}" AND type != "${CASE.DRAFT}"`);
                RealmObject.delete(otherCase);
                dbData = _.values(RealmObject.objects(DataSchema.schema.name).filtered(`caseId = "${draftCase.caseId}" AND type = "${CASE.DRAFT}"`)).shift();
                if (dbData) {
                    draftCase.status = dbData.status;
                    RealmObject.create(DraftSchema.schema.name, draftCase, true);
                    return;
                }
                RealmObject.create(DraftSchema.schema.name, draftCase, true);
                return;
            });
        });
    }

    /**
     * Return all rows of list Draft
     */
    getDraftOffline () {
        let result = RealmObject.objects(DraftSchema.schema.name).sorted("delegateDate", true);
        return result.map(x => _.assign({}, x));
    }

    /**
     * Return all rows in status sending
     * @returns {any[]}
     */
    getDraftSending () {
        let result = RealmObject.objects(DraftSchema.schema.name).filtered(`status = "${CASE.STATUS.SENDING}"`);
        return result.map(x => _.assign({}, x));
    }

    /**
     * Return a rows of case Draft
     */
    getDraftCase (caseId) {
        return _.values(RealmObject.objects(DraftSchema.schema.name).filtered(`caseId = "${caseId}"`)).shift();
    }

    /**
     * Check if a cases exist in Draft
     * @param caseId
     * @returns {boolean}
     */
    existCase (caseId) {
        const result = RealmObject.objects(DraftSchema.schema.name).filtered(`caseId = "${caseId}"`);
        return result.length > 0;
    }

    /**
     * Change status of row
     * @param caseId
     * @param status
     */
    changeStatus (caseId, status) {
        let dbDraft;
        RealmObject.write(() => {
            dbDraft = _.values(RealmObject.objects(DraftSchema.schema.name).filtered(`caseId = "${caseId}"`)).shift();
            if (dbDraft) {
                dbDraft.status = status;
                RealmObject.create(DraftSchema.schema.name, dbDraft, true);
            }
        });
    }

    /**
     * Remove the specified data case of storage.
     * @param value
     */
    destroyCase (value) {
        RealmObject.write(() => {
            let data = RealmObject.objects(DraftSchema.schema.name).filtered(`caseId = "${value}"`);
            RealmObject.delete(data);
        });
    }

    /**
     * Delete multiple Case in Draft
     */
    destroyObject () {
        RealmObject.write(() => {
            let allObjects = RealmObject.objects(DraftSchema.schema.name);
            RealmObject.delete(allObjects); // Deletes all case in Draft
        });
    }
}

export default new DraftCase();
