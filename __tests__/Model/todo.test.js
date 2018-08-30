import {RealmObject, TodoSchema} from "../../App/Model/Schemas";
import Todo from '../../App/Model/Todo';
import Data from "../../App/Model/Data";
import {CASE} from "../../App/Libs/Const";

describe("Testing Todo realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });

    beforeEach(() => {
        Todo.destroyObject();
        RealmObject.write(() => {
            RealmObject.create(TodoSchema.schema.name, caseTodo1, true);
            RealmObject.create(TodoSchema.schema.name, caseTodo2, true);
        });
    });

    const state = {
            Cases: {
                routeName: CASE.INBOX
            }
        },
        caseTodo1 = {
            caseId: "0001",
            delIndex: "1",
            user: {
                userId: "1"
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
            date: '2018-07-01 16:25:31',
            delegateDate: '2018-07-01 16:25:31',
            prevUser: {
                userId: "100",
                userName: "Test",
                firstName: "Data",
                lastName: "Base",
            },
            dueDate: '2018-07-01 16:25:31',
            status: CASE.STATUS.NONE
        },
        caseTodo2 = {
            caseId: '0002',
            delIndex: '1',
            user: {
                userId: '1'
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
            prevUser: {
                userId: '100',
                userName: 'Test',
                firstName: 'Data',
                lastName: 'Base',
            },
            dueDate: '2018-07-02 16:25:31',
            status: CASE.STATUS.SENDING
        };

    test("Realm object", () => {
        let data = null;
        let todo = {
            caseId: '1001',
            delIndex: '1',
            user: {
                userId: '1'
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
            prevUser: {
                userId: '101',
                userName: 'Test',
                firstName: 'Data',
                lastName: 'Base',
            },
            dueDate: ''
        };
        RealmObject.write(() => {
            data = RealmObject.create(TodoSchema.schema.name, todo, true);
        });
        expect(data.caseId).toBe("1001");
    });

    test("Todo -> saveList", () => {
        let data = Todo.saveList({todo: {response:[caseTodo2]}});
        expect(data).toBe(undefined);
        Data.saveCaseData({params: {
                app_uid: "0002",
                del_index: "1",
                dyn_uid: "4783964",
                status: CASE.STATUS.SENDING
            },
            response: {var001: 'value001'}
        }, state);
        data = Todo.saveList({todo: {response:[caseTodo2]}});
        expect(data).toBe(undefined);
    });

    test("Todo -> getTodoOffline", () => {
        let data = Todo.getTodoOffline();
        expect(data.length).toBe(2);
    });

    test("Todo -> getTodoSending", () => {
        let data = Todo.getTodoSending();
        expect(data.length).toBe(1);
    });

    test("Todo -> getTodoCase", () => {
        let data = Todo.getTodoCase("0002");
        expect(data.caseId).toEqual("0002");
    });

    test("Todo -> changeStatus", () => {
        Todo.changeStatus("0002", CASE.STATUS.SENDING);
        let data = Todo.getTodoCase("0002");
        expect(data.status).toEqual(CASE.STATUS.SENDING);
    });

    test("Todo -> destroyCase", () => {
        Todo.destroyCase("0002");
        let data = Todo.getTodoOffline();
        expect(data).toEqual(expect.arrayContaining([]));
    });

    test("Todo -> destroyObject", () => {
        Todo.destroyObject();
        let data = Todo.getTodoOffline();
        expect(data).toEqual(expect.arrayContaining([]));
    });
});
