import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {DataSchema, RealmObject, TodoSchema} from "./Schemas";
import {CASE} from "../Libs/Const";

/**
 * The methods for the model TodoCase
 */
class TodoCase extends BaseModel {
    constructor () {
        super(TodoSchema.schema.name);
    }

    /**
     * Save the list when the action cases/inbox/success is executed
     * @param listTodo
     */
    saveList (listTodo) {
        let dbData;
        RealmObject.write(() => {
            listTodo.todo.response.map((todoCase) => {
                let otherCase = RealmObject.objects(DataSchema.schema.name).filtered(`caseId = "${todoCase.caseId}" AND type != "${CASE.INBOX}"`);
                RealmObject.delete(otherCase);
                dbData = _.values(RealmObject.objects(DataSchema.schema.name).filtered(`caseId = "${todoCase.caseId}" AND type = "${CASE.INBOX}"`)).shift();
                if (dbData) {
                    todoCase.status = dbData.status;
                    RealmObject.create(TodoSchema.schema.name, todoCase, true);
                    return;
                }
                RealmObject.create(TodoSchema.schema.name, todoCase, true);
                return;
            });
        });
    }

    /**
     * Return all rows Todo
     */
    getTodoOffline () {
        let result = RealmObject.objects(TodoSchema.schema.name).sorted("delegateDate", true);
        return result.map(x => _.assign({}, x));
    }

    /**
     * Return all rows in status sending
     * @returns {any[]}
     */
    getTodoSending () {
        let result = RealmObject.objects(TodoSchema.schema.name).filtered("status = \"sending\"");
        return result.map(x => _.assign({}, x));
    }

    /**
     * Return a rows of case Todo
     */
    getTodoCase (caseId) {
        return _.values(RealmObject.objects(TodoSchema.schema.name).filtered(`caseId = "${caseId}"`)).shift();
    }

    /**
     * Check if a cases exist in Todo through its caseId
     * @param caseId string
     * @returns {boolean}
     */
    existCase (caseId) {
        const result = RealmObject.objects(TodoSchema.schema.name).filtered(`caseId = "${caseId}"`);
        return result.length > 0;
    }

    /**
     * Change status of row
     * @param caseId
     * @param status
     */
    changeStatus (caseId, status) {
        let dbTodo;
        RealmObject.write(() => {
            dbTodo = _.values(RealmObject.objects(TodoSchema.schema.name).filtered(`caseId = "${caseId}"`)).shift();
            if (dbTodo) {
                dbTodo.status = status;
                RealmObject.create(TodoSchema.schema.name, dbTodo, true);
            }
        });
    }

    /**
     * Remove the specified data case of storage.
     * @param value
     */
    destroyCase (value) {
        RealmObject.write(() => {
            let data = RealmObject.objects(TodoSchema.schema.name).filtered(`caseId = "${value}"`);
            RealmObject.delete(data);
        });
    }

    /**
     * Delete multiple Cases
     */
    destroyObject () {
        RealmObject.write(() => {
            let allObjects = RealmObject.objects(TodoSchema.schema.name);
            RealmObject.delete(allObjects); // Deletes all cases in Inbox
        });
    }
}

export default new TodoCase();
