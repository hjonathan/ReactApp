import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, StartCaseSchema} from "./Schemas";

/**
 * The methods for the model StartCase
 */
class StartCase extends BaseModel {
    constructor () {
        super(StartCaseSchema.schema.name);
    }

    /**
     * Save the list when the action cases/newcases/success is executed
     * @param params
     */
    createBatch (params) {
        RealmObject.write(() => {
            params.newcases.response.map((startCase) => {
                RealmObject.create(
                    StartCaseSchema.schema.name,
                    Object.assign({id: startCase.processId + startCase.taskId}, startCase),
                    true
                );
                return;
            });
        });
    }

    /**
     * Return all rows
     */
    startCase () {
        let result = RealmObject.objects(StartCaseSchema.schema.name).sorted("categoryName");
        return result.map(x => _.assign({}, x));
    }

    /**
     * Return all rows that are offline
     */
    startCaseOffline () {
        return _.values(RealmObject.objects(StartCaseSchema.schema.name).filtered("offlineEnabled = \"TRUE\""));
    }

    /**
     * Return rows with taskId
     */
    startCaseTaskId (taskId) {
        return _.values(RealmObject.objects(StartCaseSchema.schema.name).filtered(`taskId = "${taskId}"`)).shift();
    }

    /**
     * Delete multiple Cases
     */
    destroyObject () {
        RealmObject.write(() => {
            let allObjects = RealmObject.objects(StartCaseSchema.schema.name);
            RealmObject.delete(allObjects); // Deletes all StartCase
        });
    }
}

export default new StartCase();
