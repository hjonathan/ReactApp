import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, MobileControlSchema} from "./Schemas";

/**
 * Mobile control model
 */
class MobileControl extends BaseModel {
    constructor () {
        super(MobileControlSchema.schema.name);
    }

    /**
     * Adds new location
     * @param control
     */
    addLocation (control) {
        RealmObject.write(() => {
            RealmObject.create(MobileControlSchema.schema.name, control, true);
        });
    }

    /**
     * Gets all locations
     * @returns {Array}
     */
    getLocations () {
        return _.values(RealmObject.objects(MobileControlSchema.schema.name));
    }

    /**
     * Filters id by attribute
     * @param idLoc
     * @returns {Array}
     */
    filterBy (idLoc) {
        return _.values(RealmObject.objects(MobileControlSchema.schema.name).filtered(`caseId="${idLoc}"`));
    }

    /**
     * Removes specific location by idField
     * @param idControl
     */
    removeLocation (idControl) {
        let location;
        RealmObject.write(() => {
            location = RealmObject.objects(MobileControlSchema.schema.name).filtered(`idField="${idControl}"`);
            RealmObject.delete(location);
        });
    }

    /**
     * Removes data model
     */
    destroyControl () {
        let locations;
        RealmObject.write(() => {
            locations = RealmObject.objects(MobileControlSchema.schema.name);
            RealmObject.delete(locations);
        });
    }
}

export default new MobileControl();
