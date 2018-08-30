import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, StartCaseSchema} from "./Schemas";
import {TaskSchema} from "./Schemas/List";

/**
 * The methods for the model Task
 */
class Task extends BaseModel {
    constructor () {
        super(TaskSchema.schema.name);
    }

    /**
     * Return all task with offline enable equal true
     */
    allTaskIdOffline () {
        const tasks = _.values(RealmObject.objects(TaskSchema.schema.name).filtered("offlineEnabled = \"TRUE\"")),
            taskStartCase = _.values(RealmObject.objects(StartCaseSchema.schema.name).filtered("offlineEnabled = \"TRUE\""));
        return _.union(tasks.map(t => t.taskId), taskStartCase.map(t => t.taskId));
    }

    /**
     * Return all task with offline enable equal true
     */
    getTask (taskId) {
        return _.values(RealmObject.objects(TaskSchema.schema.name).filtered(`taskId = "${taskId}"`)).shift();
    }
}

export default new Task();
