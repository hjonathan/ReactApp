/**
 * Schema for UserPrev and CurrentUser
 * Lists Draft, Todo, Participate and Unassigned
 */
export default class ListUsersSchema {
    static schema = {
        name: "ListUsersSchema",
        properties: {
            userId: {type: "string"},
            userName: {type: "string"},
            firstName: {type: "string"},
            lastName: {type: "string"}
        }
    };
}
