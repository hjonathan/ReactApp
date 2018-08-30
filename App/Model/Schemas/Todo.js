import * as List from "./List";
import {CASE} from "../../Libs/Const";

/**
 * Schema for model Todo
 */
export default class TodoSchema {
    static schema = {
        name: "TodoSchema",
        primaryKey: "caseId",
        properties: {
            caseId: {type: "string"},
            delIndex: {type: "string"},
            user: {type: List.UserOwnerSchema.schema.name},
            task: {type: List.TaskSchema.schema.name},
            process: {type: List.ProcessSchema.schema.name},
            caseNumber: {type: "string"},
            caseTitle: {type: "string"},
            date: {type: "string?"},
            delegateDate: {type: "string?"},
            delRiskDate: {type: "string?"},
            prevUser: {type: List.UsersSchema.schema.name},
            dueDate: {type: "string"},
            status: {type: "string?", default: CASE.STATUS.NONE}
        }
    };
}
