import {RealmObject, ParticipatedSchema} from "../../App/Model/Schemas";
import Participated from '../../App/Model/Participated';

describe("Testing Participated realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });

    beforeEach(() => {
        Participated.destroyObject();
        RealmObject.write(() => {
            RealmObject.create(ParticipatedSchema.schema.name, participated1, true);
            RealmObject.create(ParticipatedSchema.schema.name, participated2, true);
        });
    });

    const participated1 = {
            caseId: '0001',
            delIndex: '1',
            currentUser: {
                userId: '101',
                userName: 'Test',
                firstName: 'Data',
                lastName: 'Base',
            },
            task: {
                taskId: 't001',
                name: 'task test',
                autoRoot: 'TRUE',
                offlineEnabled: 'TRUE',
            },
            process: {
                processId: 'p001',
                name: 'Process test'
            },
            caseNumber: '1',
            caseTitle: 'Case test',
            delegateDate: '',
            prevUser: {
                userId: '100',
                userName: 'Test',
                firstName: 'Data',
                lastName: 'Base',
            },
            dueDate: '',
            date: ''
        },
        participated2 = {
            caseId: '0002',
            delIndex: '1',
            currentUser: {
                userId: '101',
                userName: 'Test',
                firstName: 'Data',
                lastName: 'Base',
            },
            task: {
                taskId: 't001',
                name: 'task test',
                autoRoot: 'TRUE',
                offlineEnabled: 'TRUE',
            },
            process: {
                processId: 'p001',
                name: 'Process test'
            },
            caseNumber: '1',
            caseTitle: 'Case test',
            delegateDate: '',
            prevUser: {
                userId: '100',
                userName: 'Test',
                firstName: 'Data',
                lastName: 'Base',
            },
            dueDate: '',
            date: ''
        };

    test("Realm object", () => {
        let data = null;
        RealmObject.write(() => {
            data = RealmObject.create(ParticipatedSchema.schema.name, participated1, true);
        });
        expect(data.caseId).toBe("0001");
    });

    test("Participated -> saveList", () => {
        let data = Participated.saveList({data: [participated2]});
        expect(data).toBe(undefined);
        data = Participated.saveList({data: [participated2]});
        expect(data).toBe(undefined);
    });

    test("Participated -> getParticipatedOffline", () => {
        let data = Participated.getParticipatedOffline();
        expect(data.length).toBe(2);
    })
});
