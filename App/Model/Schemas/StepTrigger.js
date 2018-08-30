/**
 * Schema for StepTrigger in model Step
 */
export default class StepTriggerSchema {
    static schema = {
        name: "Trigger",
        properties: {
            before: {type: "bool"},
            after: {type: "bool"}
        }
    };
}
