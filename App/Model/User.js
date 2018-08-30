import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, UserSchema} from "./Schemas";

/**
 * The methods for the model User
 */
class User extends BaseModel {
    constructor () {
        super(UserSchema.schema.name);
    }

    /**
     * Save the user data logged when the action userData/success is executed
     * @param user
     */
    createUser (user) {
        RealmObject.write(() => {
            RealmObject.create(UserSchema.schema.name, user.status, true);
        });
    }

    /**
     * Save the list when the action cases/userInfo/success is executed
     * @param params
     */
    createBatch (params) {
        RealmObject.write(() => {
            params.data.map((user) => {
                RealmObject.create(UserSchema.schema.name, user, true);
                return;
            });
        });
    }

    /**
     * Return rows User data
     */
    getUser (userId) {
        return _.values(RealmObject.objects(UserSchema.schema.name).filtered(`userId = "${userId}"`)).shift();
    }

    /**
     * Return all rows Users
     */
    getUserOffline () {
        return _.values(RealmObject.objects(UserSchema.schema.name));
    }
}

export default new User();
