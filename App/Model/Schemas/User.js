/**
 * Schema for model User
 */
export default class UserSchema {
    static schema = {
        name: "UserSchema",
        primaryKey: "userId",
        properties: {
            userId: {type: "string"},
            userName: {type: "string"},
            userPhone: {type: "string?"},
            userPhoto: {type: "string?"},
            userRole: {type: "string"},
            email: {type: "string"},
            firstName: {type: "string"},
            fullName: {type: "string"},
            lastName: {type: "string?"},
            updateDate: {type: "string"}
        }
    };
}
