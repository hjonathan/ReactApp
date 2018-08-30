/**
 * Schema for Process
 * Lists Draft, Todo, Participate and Unassigned
 */
export default class ListProcessSchema {
    static schema = {
        name: "ListProcessSchema",
        properties: {
            processId: {type: "string"},
            name: {type: "string"}
        }
    };
}
