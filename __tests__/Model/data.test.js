import {RealmObject, DataSchema} from "../../App/Model/Schemas";
import Data from '../../App/Model/Data';
import {CASE} from "../../App/Libs/Const";

describe("Testing Data realm", () => {
    const state = {
        Cases: {
            routeName: CASE.INBOX
        }
    };

    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });

    test("Realm object", () => {
        let data = null;
        RealmObject.write(() => {
            data = RealmObject.create(DataSchema.schema.name, {
                caseId: "0111",
                caseIndex: 1,
                formId: "4783964",
                data: "{}"
            }, true);
        });
        expect(data.caseId).toBe("0111");
        RealmObject.write(() => {
            data = RealmObject.create(DataSchema.schema.name, {
                caseId: "0112",
                caseIndex: 2,
                formId: "4783964",
                data: "{}"
            }, true);
        });
        expect(data.caseId).toBe("0112")
    });

    test("Data -> saveData", () => {
        let data = Data.saveData({
            app_uid: "0111",
            del_index: "3",
            dyn_uid: "4783964",
            data: {var001: 'value001'},
            status: CASE.STATUS.NONE
        });
        expect(data.saved.caseId).toBe("0111");
        data = Data.saveData({
            app_uid: "0133",
            del_index: "3",
            dyn_uid: "4783964",
            data: {var001: 'value001'},
            status: CASE.STATUS.NONE
        });
        expect(data.saved.caseId).toBe("0133");
    });

    test("Data -> saveCaseData", () => {
        let data = Data.saveCaseData({params: {
                app_uid: "0111",
                del_index: "3",
                dyn_uid: "4783964",
            },
            response: {var001: 'value001'}
        }, state);
        expect(data.saved.caseId).toBe("0111");
        data = Data.saveCaseData({params: {
                app_uid: "0133",
                del_index: "3",
                dyn_uid: "4783964",
            },
            response: {var001: 'value001'}
        }, state);
        expect(data.saved.caseId).toBe("0133");
    });

    test("Data -> getDataCase", () => {
        Data.saveData({
            app_uid: "0111",
            del_index: "3",
            dyn_uid: "4783964",
            data: {var001: 'value001'},
            status: CASE.STATUS.NONE
        });
        let data = Data.getDataCase("0111");
        expect(data.caseId).toBe("0111");
    });

    test("Data -> getAllCaseOffline", () => {
        Data.saveData({
            app_uid: "0111",
            del_index: "3",
            dyn_uid: "4783964",
            data: {var001: 'value001'},
            status: CASE.STATUS.NONE
        });
        let data = Data.getAllCaseOffline();
        expect(data.shift().caseId).toBe("0111");
    });

    test("Data -> filterCaseIdWIP", () => {
        Data.saveCaseData({params: {
                app_uid: "DC133",
                del_index: "3",
                dyn_uid: "4783964",
                status: CASE.STATUS.WORKING
            },
            response: {var001: 'value001'}
        }, state);
        let data = Data.filterCaseIdWIP("DC133");
        expect(data.caseId).toBe("DC133");
    });

    test("Data -> changeStatus", () => {
        Data.saveCaseData({params: {
                app_uid: "DC133",
                del_index: "3",
                dyn_uid: "4783964",
                status: CASE.STATUS.WORKING
            },
            response: {var001: 'value001'}
        }, state);
        Data.changeStatus("DC133", CASE.STATUS.SENDING);
        let data = Data.getDataCase("DC133");
        expect(data.status).toBe(CASE.STATUS.SENDING);
    });

    test("Data -> destroyDataCase", () => {
        Data.destroyDataCase("0111");
        let data = Data.getDataCase("0111");
        expect(data).toBe(undefined)
    });

    test("Data -> destroyObject", () => {
        Data.destroyObject();
        let data = Data.getAllCaseOffline();
        expect(data).toEqual([])
    });
});
