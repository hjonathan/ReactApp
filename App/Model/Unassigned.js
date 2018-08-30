import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, UnassignedSchema} from "./Schemas";

/**
 * The methods for the model UnassignedCase
 */
class UnassignedCase extends BaseModel {
    constructor () {
        super(UnassignedSchema.schema.name);
    }
    /**
     * Return all rows Unassigned
     */
    getUnassignedOffline () {
        let result = RealmObject.objects(UnassignedSchema.schema.name);
        return result.map(x => _.assign({}, x));
    }
    /**
     * Save the list when the action cases/unassigned/success is executed
     * @param listUnassigned
     */
    saveList (listUnassigned) {
        RealmObject.write(() => {
            listUnassigned.data.map((unassignedCase) => {
                RealmObject.create(UnassignedSchema.schema.name, unassignedCase, true);
                return;
            });
        });
    }
    /**
     * Delete multiple Cases
     */
    destroyObject () {
        RealmObject.write(() => {
            let allObjects = RealmObject.objects(UnassignedSchema.schema.name);
            RealmObject.delete(allObjects); // Deletes all cases in Unassigned
        });
    }
}

export default new UnassignedCase();
