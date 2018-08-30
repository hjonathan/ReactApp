import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, NewCaseSchema} from "./Schemas";

/**
 * Model for NewCase
 */
class NewCase extends BaseModel {
    constructor () {
        super(NewCaseSchema.schema.name);
    }

    /**
     * Latest caseNumber of new cases
     * @returns {number}
     */
    latestCase () {
        let dbNewCase = RealmObject.objects(NewCaseSchema.schema.name).sorted("caseNumber", true)[0];
        return dbNewCase && dbNewCase.caseNumber ? dbNewCase.caseNumber : "0";
    }

    /**
     * Store a newly created resource in storage.
     * @param listNewCase
     */
    saveList (listNewCase) {
        RealmObject.write(() => {
            listNewCase.data.response.map((newCase) => {
                let dbNewCase = RealmObject.objects(NewCaseSchema.schema.name).filtered(`caseId = "${newCase.caseId}"`);
                if (dbNewCase.length <= 0) {
                    RealmObject.create(NewCaseSchema.schema.name, newCase);
                }
                return;
            });
        });
    }

    /**
     * Return all case in offline
     * @returns {number}
     */
    getCaseUpload () {
        return _.values(RealmObject.objects(NewCaseSchema.schema.name).filtered("status = \"offline\""));
    }

    /**
     * Return all rows status sending of list NewCases
     */
    getNeCaseSending () {
        let result = RealmObject.objects(NewCaseSchema.schema.name).filtered("status = \"sending\"");
        return result.map(x => _.assign({}, x));
    }

    /**
     * Change status of row
     * @param caseId
     * @param status
     */
    changeStatus (caseId, status) {
        RealmObject.write(() => {
            let dbNewCase = RealmObject.objects(NewCaseSchema.schema.name).filtered(`caseId = "${caseId}"`);
            if (dbNewCase.length > 0) {
                RealmObject.create(NewCaseSchema.schema.name, {caseId, status}, true);
            }
        });
    }

    /**
     * Remove the specified case of storage.
     * @param caseId
     */
    destroyCase (caseId) {
        RealmObject.write(() => {
            let data = RealmObject.objects(NewCaseSchema.schema.name).filtered(`caseId = "${caseId}"`);
            RealmObject.delete(data);
        });
    }
}

export default (new NewCase());
