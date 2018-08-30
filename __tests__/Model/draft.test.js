import {RealmObject, DraftSchema} from "../../App/Model/Schemas";
import Draft from '../../App/Model/Draft';
import Data from '../../App/Model/Data';
import {CASE} from "../../App/Libs/Const";

describe("Testing Draft realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });

    beforeEach(() => {
        Draft.destroyObject();
        RealmObject.write(() => {
            RealmObject.create(DraftSchema.schema.name, caseDraft1, true);
            RealmObject.create(DraftSchema.schema.name, caseDraft2, true);
        });
    });

    const state = {
            Cases: {
                routeName: CASE.DRAFT
            }
        },
        caseDraft1 = {
            caseId: "0001",
            delIndex: "1",
            user: {
                userId: "1"
            },
            currentUser: {
                userId: "100",
                userName: "Test",
                firstName: "Data",
                lastName: "Base",
            },
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
            date: '2018-05-16 09:27:02',
            delegateDate: '2018-05-16 09:27:02',
            dueDate: '2018-05-16 09:27:02',
            status: CASE.STATUS.SENDING
        },
        caseDraft2 = {
            caseId: '0002',
            delIndex: '1',
            user: {
                userId: '2'
            },
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
            date: '2018-07-02 16:25:31',
            delegateDate: '2018-07-02 16:25:31',
            dueDate: '2018-07-02 16:25:31',
            status: "none"
        };

    test("Realm object", () => {
        let data = null;
        let draft = {
            caseId: '1001',
            delIndex: '1',
            user: {
                userId: '1'
            },
            currentUser: {
                userId: '101',
                userName: 'Test',
                firstName: 'Data',
                lastName: 'Base',
            },
            task: {
                taskId: 't101',
                name: 'task test',
                autoRoot: 'TRUE',
                offlineEnabled: 'TRUE',
            },
            process: {
                processId: 'p101',
                name: 'Process test'
            },
            caseNumber: '1',
            caseTitle: 'Case test',
            date: '',
            delegateDate: '',
            dueDate: ''
        };
        RealmObject.write(() => {
            data = RealmObject.create(DraftSchema.schema.name, draft, true);
        });
        expect(data.caseId).toBe("1001");
    });

    test("Draft -> saveList", () => {
        let data = Draft.saveList({data: {response:[caseDraft2]}});
        expect(data).toBe(undefined);
        Data.saveCaseData({params: {
                app_uid: "0002",
                del_index: "1",
                dyn_uid: "4783964",
                status: CASE.STATUS.WORKING
            },
            response: {var001: 'value001'}
        }, state);
        data = Draft.saveList({data: {response:[caseDraft2]}});
        expect(data).toBe(undefined);
    });

    test("Draft -> getDraftOffline", () => {
        let data = Draft.getDraftOffline();
        expect(data.length).toBe(2);
    });

    test("Draft -> getDraftSending", () => {
        let data = Draft.getDraftSending();
        expect(data.length).toBe(1);
    });

    test("Draft -> getDraftCase", () => {
        let data = Draft.getDraftCase("0002");
        expect(data.caseId).toEqual("0002");
    });

    test("Draft -> existCase", () => {
        let data = Draft.existCase("0002");
        expect(data).toEqual(true);
    });

    test("Draft -> changeStatus", () => {
        Draft.changeStatus("0002", CASE.STATUS.SENDING);
        let data = Draft.getDraftCase("0002");
        expect(data.status).toEqual(CASE.STATUS.SENDING);
    });

    test("Draft -> destroyCase", () => {
        Draft.destroyCase("0002");
        let data = Draft.getDraftOffline();
        expect(data).toEqual(expect.arrayContaining([]));
    });

    test("Draft -> destroyObject", () => {
        Draft.destroyObject();
        let data = Draft.getDraftOffline();
        expect(data).toEqual(expect.arrayContaining([]));
    });
});
