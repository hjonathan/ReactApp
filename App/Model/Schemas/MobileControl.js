/**
 * Schema for model counter
 */
export default class MobileControlSchema {
    static schema = {
        name: "MobileControl",
        primaryKey: "idField",
        properties: {
            idField: {type: "string"},
            caseId: {type: "string"},
            data: {type: "string"},
            delIndex: {type: "int?"},
            type: {type: "string"},
            service: {type: "string"}
        }
    };
}
