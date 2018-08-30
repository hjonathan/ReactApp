import * as List from "./List";
import {CASE} from "../../Libs/Const";

/**
 * Schema for model Unassigned
 */
export default class UnassignedSchema {
    static schema = {
        name: "UnassignedSchema",
        primaryKey: "caseId",
        properties: {
            caseId: {type: "string"},
            delIndex: {type: "string"},
            task: {type: List.TaskSchema.schema.name},
            process: {type: List.ProcessSchema.schema.name},
            caseNumber: {type: "string"},
            caseTitle: {type: "string"},
            date: {type: "string?"},
            delegateDate: {type: "string?"},
            prevUser: {type: List.UsersSchema.schema.name},
            dueDate: {type: "string"},
            status: {type: "string?", default: CASE.STATUS.NONE}
        }
    };
}
