import * as List from "./List";
import {CASE} from "../../Libs/Const";

/**
 * Schema for model Draft list
 */
export default class DraftSchema {
    static schema = {
        name: "DraftSchema",
        primaryKey: "caseId",
        properties: {
            caseId: {type: "string"},
            delIndex: {type: "string"},
            user: {type: List.UserOwnerSchema.schema.name},
            currentUser: {type: List.UsersSchema.schema.name},
            task: {type: List.TaskSchema.schema.name},
            process: {type: List.ProcessSchema.schema.name},
            caseNumber: {type: "string"},
            caseTitle: {type: "string"},
            date: {type: "string?"},
            delegateDate: {type: "string?"},
            dueDate: {type: "string"},
            status: {type: "string?", default: CASE.STATUS.NONE}
        }
    };
}
