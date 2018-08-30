import _ from "lodash";
import actionsSelected from "./StoreActions";
import * as Models from "../../Model";

/**
 * Factory for get class model correct
 */
export default class RealmStoreFactory {
    /**
     * Returns a function of a specific model
     * @param actionType
     * @returns {*}
     */
    createStorm = (actionType) => {
        let index = _.findIndex(actionsSelected, o => (o.action === actionType ? o : false)),
            objectClass;
        if (index !== -1) {
            objectClass = actionsSelected[index];
            return (Models[objectClass.className] && Models[objectClass.className][objectClass.fn])
                ? Models[objectClass.className][objectClass.fn]
                : null;
        }
        return null;
    }
}
