import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, ParticipatedSchema} from "./Schemas";

/**
 * The methods for the model ParticipatedCase
 */
class ParticipatedCase extends BaseModel {
    constructor () {
        super(ParticipatedSchema.schema.name);
    }
    /**
     * Return all rows Participated
     */
    getParticipatedOffline () {
        let result = RealmObject.objects(ParticipatedSchema.schema.name);
        return result.map(x => _.assign({}, x));
    }
    /**
     * Save the list when the action cases/participated/success is executed
     * @param listParticipated
     */
    saveList (listParticipated) {
        RealmObject.write(() => {
            listParticipated.data.map((participatedCase) => {
                RealmObject.create(ParticipatedSchema.schema.name, participatedCase, true);
                return;
            });
        });
    }
    /**
     * Delete multiple Cases
     */
    destroyObject () {
        RealmObject.write(() => {
            let allObjects = RealmObject.objects(ParticipatedSchema.schema.name);
            RealmObject.delete(allObjects); // Deletes all cases in Participated
        });
    }
}

export default new ParticipatedCase();
