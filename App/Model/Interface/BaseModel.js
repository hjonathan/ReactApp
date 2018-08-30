import {RealmObject} from "../Schemas";

/**
 * Base for the models
 */
class BaseModel {
    constructor (schemaName) {
        this.schemaName = schemaName;
    }

    /**
     * Return a listing of the resource.
     */
    index () {
        return RealmObject.objects(this.schemaName);
    }

    /**
     * Store a newly created resource in storage.
     * @param params
     */
    create (params) {
        let saved = null;
        RealmObject.write(() => {
            saved = RealmObject.create(this.schemaName, params);
        });
        return saved;
    }

    /**
     * Display the specified resource.
     * @param key
     * @param value
     * @returns {Realm.Results<T>}
     */
    read (key, value) {
        return RealmObject.objects(this.schemaName).filtered(`${key} = "${value}"`);
    }

    /**
     * Update the specified resource in storage.
     * @param key
     * @param value
     * @param params
     */
    update (key, value, params) {
        RealmObject.write(() => {
            let data = RealmObject.objects(this.schemaName).filtered(`${key} = "${value}"`);
            RealmObject.create(this.schemaName, Object.assign({}, data, params), true);
        });
    }

    /**
     * Remove the specified resource from storage.
     * @param key
     * @param value
     */
    destroy (key, value) {
        RealmObject.write(() => {
            let data = RealmObject.objects(this.schemaName).filtered(`${key} = "${value}"`);
            RealmObject.delete(data);
        });
    }

    /**
     * Delete all Object
     */
    destroyObject () {
        RealmObject.write(() => {
            let allObjects = RealmObject.objects(this.schemaName);
            RealmObject.delete(allObjects); // Deletes all
        });
    }
}

export default BaseModel;
