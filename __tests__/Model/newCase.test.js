import {RealmObject, NewCaseSchema, DraftSchema} from "../../App/Model/Schemas";
import NewCase from '../../App/Model/NewCase';
import {CASE} from "../../App/Libs/Const";

describe("Testing NewCase realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });

    beforeEach(() => {
        NewCase.destroyObject();
    });

    const newCase1 = {
            caseId: "001",
            delIndex: 1,
            userId: "13",
            taskId: "113",
            processId: "1113",
            caseNumber: "1",
            date: new Date(),
            status: CASE.STATUS.OFFLINE,
        },
        newCase2 = {
            caseId: "002",
            delIndex: 1,
            userId: "13",
            taskId: "113",
            processId: "1113",
            caseNumber: "2",
            date: new Date(),
            status: CASE.STATUS.SENDING,
        };

    test("NewCase object", () => {
        let data = null;
        RealmObject.write(() => {
            data = RealmObject.create(NewCaseSchema.schema.name, newCase1, true);
        });
        expect(data.caseId).toBe("001");
    });

    test("NewCase -> latestCase", () => {
        NewCase.saveList({data: {response: [newCase1]}});
        let data = NewCase.latestCase();
        expect(data).toBe("1");
        NewCase.destroyCase("001");
        data = NewCase.latestCase();
        expect(data).toBe("0");
    });

    test("NewCase -> saveList", () => {
        let data = NewCase.saveList({data: {response: [newCase2]}});
        expect(data).toBe(undefined);
        data = NewCase.saveList({data: {response: [newCase2]}});
        expect(data).toBe(undefined);
    });

    test("NewCase -> getCaseUpload", () => {
        NewCase.saveList({data: {response: [newCase1]}});
        let data = NewCase.getCaseUpload();
        expect(data[0].caseId).toEqual('001');
    });

    test("NewCase -> getNeCaseSending", () => {
        NewCase.saveList({data: {response: [newCase2]}});
        let data = NewCase.getNeCaseSending();
        expect(data.length).toBe(1);
    });

    test("NewCase -> changeStatus", () => {
        NewCase.saveList({data: {response: [newCase2]}});
        NewCase.changeStatus("002", CASE.STATUS.SENDING);
        let data = NewCase.getNeCaseSending();
        expect(data.length).toEqual(1);
    });

    test("NewCase -> destroyCase", () => {
        try {
            RealmObject.write(() => {
                RealmObject.deleteAll();
                RealmObject.create(NewCaseSchema.schema.name, newCase1, true);
            });
        } catch (e) {
        }
        NewCase.destroyCase('001');
        let data = NewCase.getCaseUpload();
        expect(data.length)
            .toEqual(0);
    });
});
