import * as List from "./List";
import {CASE} from "../../Libs/Const";

/**
 * Schema for model Participated
 */
export default class ParticipatedSchema {
    static schema = {
        name: "ParticipatedSchema",
        primaryKey: "caseId",
        properties: {
            caseId: {type: "string"},
            delIndex: {type: "string"},
            currentUser: {type: List.UsersSchema.schema.name},
            task: {type: List.TaskSchema.schema.name},
            process: {type: List.ProcessSchema.schema.name},
            caseNumber: {type: "string"},
            caseTitle: {type: "string"},
            delegateDate: {type: "string?"},
            prevUser: {type: List.UsersSchema.schema.name},
            dueDate: {type: "string"},
            date: {type: "string?"},
            status: {type: "string?", default: CASE.STATUS.NONE}
        }
    };
}
