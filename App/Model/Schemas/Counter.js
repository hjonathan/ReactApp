/**
 * Schema for model counter
 */
export default class CounterSchema {
    static schema = {
        name: "CounterSchema",
        primaryKey: "userId",
        properties: {
            userId: {type: "string"},
            toDo: {type: "int?"},
            draft: {type: "int?"},
            cancelled: {type: "int?"},
            participated: {type: "int?"},
            paused: {type: "int?"},
            completed: {type: "int?"},
            unassigned: {type: "int?"}
        }
    };
}
