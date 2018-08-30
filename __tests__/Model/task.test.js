import {RealmObject, DataSchema} from "../../App/Model/Schemas";
import Task from '../../App/Model/Task';

describe("Testing Task realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });

    test("Task -> allTaskIdOffline", () => {
        let tasks = Task.allTaskIdOffline(),
            task = Task.getTask("001");
        expect(task).toBe(undefined)
    });
});
