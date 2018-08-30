import {RealmObject, StepSchema} from "../../App/Model/Schemas";
import Step from '../../App/Model/Step';

describe("Testing Step realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });

    beforeEach(() => {
        RealmObject.write(() => {
            RealmObject.create(StepSchema.schema.name, step1, true);
            RealmObject.create(StepSchema.schema.name, step2, true);
            RealmObject.create(StepSchema.schema.name, step3, true);
        });
    });

    const step1 = {
            id: "ID0001",
            processId: "P001",
            taskId: "T001",
            stepId: "S0001",
            stepUidObj: "SO001",
            stepMode: "EDIT",
            stepCondition: "",
            stepPosition: 1,
            index: 1,
            formId: "F001",
            formTitle: "Form Test",
            formDescription: "",
            formUpdateDate: "",
            triggers: {
                before: false,
                after: false,
            }
        },
        step2 = {
            id: 'ID0002',
            processId: 'P001',
            taskId: 'T002',
            stepId: 'S0001',
            stepUidObj: 'SO001',
            stepMode: 'EDIT',
            stepCondition: '',
            stepPosition: 1,
            index: 1,
            formId: 'F002',
            formTitle: 'Form Test',
            formDescription: '',
            formUpdateDate: '',
            triggers: {
                before: false,
                after: false,
            }
        },
        step3 = {
            id: 'ID0003',
            processId: 'P001',
            taskId: 'T003',
            stepId: 'S0001',
            stepUidObj: 'SO001',
            stepMode: 'EDIT',
            stepCondition: '',
            stepPosition: 1,
            index: 1,
            formId: 'F003',
            formTitle: 'Form Test',
            formDescription: '',
            formUpdateDate: '',
            triggers: {
                before: false,
                after: false,
            }
        };

    test("Realm object", () => {
        let data = null,
            step = {
                id: "ID1001",
                processId: "P101",
                taskId: "T101",
                stepId: "S1001",
                stepUidObj: "SO101",
                stepMode: "EDIT",
                stepCondition: "",
                stepPosition: 1,
                index: 1,
                formId: "F001",
                formTitle: "Form Test",
                formDescription: "",
                formUpdateDate: "",
                triggers: {
                    before: false,
                    after: false,
                }
            };
        RealmObject.write(() => {
            data = RealmObject.create(StepSchema.schema.name, step, true);
        });
        expect(data.id).toBe("ID1001");
    });

    test("Step -> create", () => {
        let data = Step.create(step2);
        expect(data).toBe(undefined);
        data = Step.create(step2);
        expect(data).toBe(undefined);
    });

    test("Step -> createOffline", () => {
        let data = Step.createOffline({response:[step3], params: {prj_uid:'P002', act_uid: 'T002'}});
        expect(data).toBe(undefined);
        data = Step.createOffline({data:[step3], params: {prj_uid:'P002', act_uid: 'T002'}});
        expect(data).toBe(undefined);
    });

    test("Step -> getStepOffline", () => {
        let data = Step.getStepOffline('P001', 'T001');
        expect(data.length).toBe(1);
    });

    test("Step -> latestStepId", () => {
        let data = Step.latestStepId('P001', 'T001');
        expect(data).toEqual('S0001');
        Step.destroyObject();
        data = Step.latestStepId('P001', 'T001');
        expect(data).toEqual(null);
    });

    test("Step -> destroyObject", () => {
        Step.destroyObject();
        let data = Step.latestStepId();
        expect(data).toEqual(expect.arrayContaining([]));
    });
});
