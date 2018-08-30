import StepTriggerSchema from "./StepTrigger";

/**
 * Sub-Schema for model startCase
 */
export class StartCaseStepSchema {
    static schema = {
        name: "StartCaseStepItem",
        properties: {
            stepId: {type: "string"},
            stepUidObj: {type: "string"},
            stepMode: {type: "string"},
            stepCondition: {type: "string?"},
            stepPosition: {type: "int"},
            index: {type: "int"},
            formId: {type: "string"},
            title: {type: "string"},
            description: {type: "string?"},
            formUpdateDate: {type: "string"},
            triggers: {type: StepTriggerSchema.schema.name}
        }
    };
}

/**
 * Schema for model StartCase
 */
export default class StartCaseSchema {
    static schema = {
        name: "StartCaseSchema",
        primaryKey: "id",
        properties: {
            id: {type: "string"},
            text: {type: "string"},
            processId: {type: "string"},
            taskId: {type: "string"},
            autoRoot: {type: "string"},
            offlineEnabled: {type: "string"},
            categoryId: {type: "string?"},
            categoryName: {type: "string?"},
            forms: {type: "list", objectType: StartCaseStepSchema.schema.name}
        }
    };
}
