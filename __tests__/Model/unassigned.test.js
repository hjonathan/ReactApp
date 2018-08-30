import {RealmObject, UnassignedSchema} from "../../App/Model/Schemas";
import Unassigned from '../../App/Model/Unassigned';

describe("Testing Unassigned realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });

    beforeEach(() => {
        Unassigned.destroyObject();
        RealmObject.write(() => {
            RealmObject.create(UnassignedSchema.schema.name, unassigned1, true);
            RealmObject.create(UnassignedSchema.schema.name, unassigned2, true);
        });
    });

    const unassigned1 = {
            caseId: "0001",
            delIndex: "1",
            task: {
                taskId: "t001",
                name: "task test",
                autoRoot: "TRUE",
                offlineEnabled: "TRUE",
            },
            process: {
                processId: "p001",
                name: "Process test"
            },
            caseNumber: "1",
            caseTitle: "Case test",
            date: "",
            delegateDate: "",
            prevUser: {
                userId: "100",
                userName: "Test",
                firstName: "Data",
                lastName: "Base",
            },
            dueDate: "",
        },
        unassigned2 = {
            caseId: "0002",
            delIndex: "1",
            task: {
                taskId: "t001",
                name: "task test",
                autoRoot: "TRUE",
                offlineEnabled: "TRUE",
            },
            process: {
                processId: "p001",
                name: "Process test"
            },
            caseNumber: "1",
            caseTitle: "Case test",
            date: "",
            delegateDate: "",
            prevUser: {
                userId: "100",
                userName: "Test",
                firstName: "Data",
                lastName: "Base",
            },
            dueDate: "",
        };

    test("Realm object", () => {
        let data = null;
        RealmObject.write(() => {
            data = RealmObject.create(UnassignedSchema.schema.name, unassigned1, true);
        });
        expect(data.caseId).toBe("0001");
    });

    test("Unassigned -> saveList", () => {
        let data = Unassigned.saveList({data: [unassigned2]});
        expect(data).toBe(undefined);
        data = Unassigned.saveList({data: [unassigned2]});
        expect(data).toBe(undefined);
    });

    test("Unassigned -> getUnassignedOffline", () => {
        Unassigned.saveList({data: [unassigned1]});
        Unassigned.saveList({data: [unassigned2]});
        let data = Unassigned.getUnassignedOffline();
        expect(data.length).toBe(2);
    })
});
