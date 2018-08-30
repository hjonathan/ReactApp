import {RealmObject, StartCaseSchema} from "../../App/Model/Schemas";
import StartCase from '../../App/Model/StartCase';

describe("Testing StartCase realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });

    test("Realm object", () => {
        let data = null;
        let startCase = {
            id: '212',
            text: 'Test',
            processId: '1113',
            taskId: '113',
            autoRoot: "FALSE",
            offlineEnabled: "TRUE",
            categoryName: "Conta",
            forms: [
                {
                    stepId: 'S0001',
                    stepUidObj: 'SO001',
                    stepMode: 'EDIT',
                    stepCondition: '',
                    stepPosition: 1,
                    index: 1,
                    formId: 'F001',
                    title: 'Form Test',
                    formUpdateDate: '',
                    triggers: {
                        before: false,
                        after: false,
                    }
                }
            ]
        };
        RealmObject.write(() => {
            data = RealmObject.create(StartCaseSchema.schema.name, startCase, true);
        });
        expect(data.id).toBe("212");
    });

    test("StartCase -> createBatch", () => {
        let draft = [
            {
                id: '212',
                text: 'Test',
                processId: '1113',
                taskId: '113',
                autoRoot: "FALSE",
                offlineEnabled: "TRUE",
                categoryName: "Conta",
                forms: [
                    {
                        stepId: 'S0001',
                        stepUidObj: 'SO001',
                        stepMode: 'EDIT',
                        stepCondition: '',
                        stepPosition: 1,
                        index: 1,
                        formId: 'F001',
                        title: 'Form Test',
                        formUpdateDate: '',
                        triggers: {
                            before: false,
                            after: false,
                        }
                    }
                ]
            },
            {
                id: '215',
                text: 'Test',
                processId: '1113',
                taskId: '114',
                autoRoot: "FALSE",
                offlineEnabled: "FALSE",
                categoryName: "RRHH",
                forms: [
                    {
                        stepId: 'S0001',
                        stepUidObj: 'SO001',
                        stepMode: 'EDIT',
                        stepCondition: '',
                        stepPosition: 1,
                        index: 1,
                        formId: 'F001',
                        title: 'Form Test',
                        formUpdateDate: '',
                        triggers: {
                            before: false,
                            after: false,
                        }
                    }
                ]
            }
        ];
        let data = StartCase.createBatch({newcases: {response: draft}});
        expect(data).toBe(undefined);
    });

    test("StartCase -> startCase", () => {
        let data = StartCase.startCase();
        expect(data.length).toBe(2);
    });

    test("StartCase -> startCaseOffline", () => {
        let data = StartCase.startCaseOffline();
        expect(data[0].id).toBe("212");
    });

    test("StartCase -> startCaseTaskId", () => {
        let data = StartCase.startCaseTaskId("114");
        expect(data.id).toBe("215");
    });

    test("StartCase -> destroyObject", () => {
        StartCase.destroyObject();
        let data = StartCase.startCaseOffline();
        expect(data).toEqual(expect.arrayContaining([]));
    });
});
