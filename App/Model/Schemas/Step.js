import StepTriggerSchema from "./StepTrigger";

/**
 * Schema for model Step
 */
export default class StepSchema {
    static schema = {
        name: "StepSchema",
        primaryKey: "id",
        properties: {
            id: {type: "string"},
            processId: {type: "string"},
            taskId: {type: "string"},
            stepId: {type: "string"},
            stepUidObj: {type: "string"},
            stepMode: {type: "string"},
            stepCondition: {type: "string?"},
            stepPosition: {type: "int"},
            index: {type: "int"},
            formId: {type: "string"},
            formTitle: {type: "string"},
            formDescription: {type: "string?"},
            formUpdateDate: {type: "string"},
            triggers: {type: StepTriggerSchema.schema.name}
        }
    };
}
