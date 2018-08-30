/**
 * Schema for Task
 * Lists Draft, Todo, Participate and Unassigned
 */
export default class ListTaskSchema {
    static schema = {
        name: "ListTaskSchema",
        properties: {
            taskId: {type: "string"},
            name: {type: "string"},
            autoRoot: {type: "string?"},
            offlineEnabled: {type: "string?"}
        }
    };
}
