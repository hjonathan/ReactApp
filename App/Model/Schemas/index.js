import Realm from "realm";
import CounterSchema from "./Counter";
import * as Lists from "./List";
import TodoSchema from "./Todo";
import DraftSchema from "./Draft";
import ParticipatedSchema from "./Participated";
import UnassignedSchema from "./Unassigned";
import StartCaseSchema, {StartCaseStepSchema} from "./StartCase";
import UserSchema from "./User";
import StepSchema from "./Step";
import StepTriggerSchema from "./StepTrigger";
import FormSchema from "./Form";
import NewCaseSchema from "./NewCase";
import DataSchema from "./Data";
import MobileControlSchema from "./MobileControl";

/**
 * Return the Realm instance
 * @type {Realm}
 */
export const RealmObject = new Realm({
    schema: [
        UserSchema,
        CounterSchema,
        Lists.ProcessSchema,
        Lists.TaskSchema,
        Lists.UserOwnerSchema,
        Lists.UsersSchema,
        TodoSchema,
        DraftSchema,
        ParticipatedSchema,
        UnassignedSchema,
        StartCaseSchema,
        StartCaseStepSchema,
        StepSchema,
        StepTriggerSchema,
        FormSchema,
        NewCaseSchema,
        DataSchema,
        MobileControlSchema
    ],
    schemaVersion: 1.0
});

/**
 * Return all Schemas
 */
export {
    UserSchema,
    CounterSchema,
    TodoSchema,
    DraftSchema,
    ParticipatedSchema,
    UnassignedSchema,
    StartCaseSchema,
    StepSchema,
    FormSchema,
    NewCaseSchema,
    DataSchema,
    MobileControlSchema
};
