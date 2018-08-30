/**
 * Schema for model NewCase
 */
import {CASE} from "../../Libs/Const";

export default class NewCaseSchema {
    static schema = {
        name: "NewCaseSchema",
        primaryKey: "caseId",
        properties: {
            caseId: {type: "string"},
            delIndex: {type: "int", default: 1},
            userId: {type: "string"},
            taskId: {type: "string"},
            processId: {type: "string"},
            caseNumber: {type: "string"},
            date: {type: "date"},
            status: {type: "string", default: CASE.STATUS.NONE}
        }
    };
}
