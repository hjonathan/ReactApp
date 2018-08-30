import Case from "../../App/Libs/Offline/Case";
import {DataSchema, FormSchema, RealmObject, StepSchema} from "../../App/Model/Schemas";

describe("Test Class Cases", () => {
    const params = {
            delIndex: 1,
            userId: "000001",
            act_uid: "10001",
            prj_uid: "20001"
        },
        step1 = {
            id: "ST01",
            processId: "PR001",
            taskId: "TK001",
            stepId: "ST001",
            stepUidObj: "STO001",
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
        step3 = {
            id: 'ST03',
            processId: 'PR001',
            taskId: 'TK001',
            stepId: 'ST003',
            stepUidObj: 'STO003',
            stepMode: 'EDIT',
            stepCondition: '',
            stepPosition: 3,
            index: 1,
            formId: 'F001',
            formTitle: 'Form Test',
            formDescription: '',
            formUpdateDate: '',
            triggers: {
                before: false,
                after: false,
            }
        },
        paramsNextStep = {
            prj_uid: "PR001",
            act_uid: "TK001",
            app_uid: "C001",
            step_pos: 1
        };
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll();
        });
    });

    beforeEach(() => {
        try {
            RealmObject.write(() => {
                RealmObject.deleteAll();
            });
        } catch (e) {
        }
    });

    test("Case getNextStep else value", () => {
        expect(Case.getNextStep({
            prj_uid: "1002",
            act_uid: "2002",
            app_uid: "ST01",
            step_pos: 1
        })).toEqual({
            conditionalSteps: {
                PAGE: "cases_Step?TYPE=ASSIGN_TASK&UID=-1&POSITION=10000&ACTION=ASSIGN",
                POSITION: 1,
                TYPE: "DERIVATION",
                UID: -1
            }
        });
    });

    test("Case getNextStep if evaluate conditional STRING", () => {
        let step2 = {
            id: 'ST02',
            processId: 'PR001',
            taskId: 'TK001',
            stepId: 'ST002',
            stepUidObj: 'STO002',
            stepMode: 'EDIT',
            stepCondition: '@@test1 == \'si\'',
            stepPosition: 2,
            index: 1,
            formId: 'F001',
            formTitle: 'Form Test',
            formDescription: '',
            formUpdateDate: '',
            triggers: {
                before: false,
                after: false,
            }
        };
        try {
            RealmObject.write(() => {
                RealmObject.create(StepSchema.schema.name, step1, true);
                RealmObject.create(StepSchema.schema.name, step2, true);
                RealmObject.create(StepSchema.schema.name, step3, true);
                RealmObject.create(DataSchema.schema.name, {
                    caseId: "C001",
                    caseIndex: 1,
                    formId: "4783964",
                    data: "{\"test1\":\"si\",\"test2\":\"222\"}"
                }, true);
            });
        } catch (e) {
        }
        expect(Case.getNextStep(paramsNextStep))
            .toEqual({
                conditionalSteps: {
                    PAGE: "cases_Step?TYPE=DYNAFORM&UID=STO002&POSITION=2&ACTION=EDIT",
                    POSITION: 2,
                    TYPE: "DYNAFORM",
                    UID: "STO002"
                },
                triggers: {"status": "200"},
                variables: {
                    "test1": "si",
                    "test2": "222"
                }
            });
        try {
            RealmObject.write(() => {
                RealmObject.create(StepSchema.schema.name, step1, true);
                RealmObject.create(StepSchema.schema.name, step2, true);
                RealmObject.create(StepSchema.schema.name, step3, true);
                RealmObject.create(DataSchema.schema.name, {
                    caseId: "C001",
                    caseIndex: 1,
                    formId: "4783964",
                    data: "{\"test1\":\"no\",\"test2\":\"222\"}"
                }, true);
            });
        } catch (e) {
        }
        expect(Case.getNextStep(paramsNextStep))
            .toEqual({
                conditionalSteps: {
                    PAGE: "cases_Step?TYPE=DYNAFORM&UID=STO003&POSITION=3&ACTION=EDIT",
                    POSITION: 3,
                    TYPE: "DYNAFORM",
                    UID: "STO003"
                },
                triggers: {"status": "200"},
                variables: {
                    "test1": "no",
                    "test2": "222"
                }
            });
    });

    test("Case getNextStep if evaluate conditional INT", () => {
        let step2 = {
            id: 'ST02',
            processId: 'PR001',
            taskId: 'TK001',
            stepId: 'ST002',
            stepUidObj: 'STO002',
            stepMode: 'EDIT',
            stepCondition: '@%test1 == 1',
            stepPosition: 2,
            index: 1,
            formId: 'F001',
            formTitle: 'Form Test',
            formDescription: '',
            formUpdateDate: '',
            triggers: {
                before: false,
                after: false,
            }
        };
        try {
            RealmObject.write(() => {
                RealmObject.create(StepSchema.schema.name, step1, true);
                RealmObject.create(StepSchema.schema.name, step2, true);
                RealmObject.create(StepSchema.schema.name, step3, true);
                RealmObject.create(DataSchema.schema.name, {
                    caseId: "C001",
                    caseIndex: 1,
                    formId: "4783964",
                    data: "{\"test1\":1,\"test2\":\"222\"}"
                }, true);
            });
        } catch (e) {
        }
        expect(Case.getNextStep(paramsNextStep))
            .toEqual({
                conditionalSteps: {
                    PAGE: "cases_Step?TYPE=DYNAFORM&UID=STO002&POSITION=2&ACTION=EDIT",
                    POSITION: 2,
                    TYPE: "DYNAFORM",
                    UID: "STO002"
                },
                triggers: {"status": "200"},
                variables: {
                    "test1": 1,
                    "test2": "222"
                }
            });
        try {
            RealmObject.write(() => {
                RealmObject.create(StepSchema.schema.name, step1, true);
                RealmObject.create(StepSchema.schema.name, step2, true);
                RealmObject.create(StepSchema.schema.name, step3, true);
                RealmObject.create(DataSchema.schema.name, {
                    caseId: "C001",
                    caseIndex: 1,
                    formId: "4783964",
                    data: "{\"test1\":100,\"test2\":\"222\"}"
                }, true);
            });
        } catch (e) {
        }
        expect(Case.getNextStep(paramsNextStep))
            .toEqual({
                conditionalSteps: {
                    PAGE: "cases_Step?TYPE=DYNAFORM&UID=STO003&POSITION=3&ACTION=EDIT",
                    POSITION: 3,
                    TYPE: "DYNAFORM",
                    UID: "STO003"
                },
                triggers: {"status": "200"},
                variables: {
                    "test1": 100,
                    "test2": "222"
                }
            });
    });

    test("Case getNextStep if evaluate conditional FLOAT", () => {
        let step2 = {
            id: 'ST02',
            processId: 'PR001',
            taskId: 'TK001',
            stepId: 'ST002',
            stepUidObj: 'STO002',
            stepMode: 'EDIT',
            stepCondition: '@#test1 == 1.2',
            stepPosition: 2,
            index: 1,
            formId: 'F001',
            formTitle: 'Form Test',
            formDescription: '',
            formUpdateDate: '',
            triggers: {
                before: false,
                after: false,
            }
        };
        try {
            RealmObject.write(() => {
                RealmObject.create(StepSchema.schema.name, step1, true);
                RealmObject.create(StepSchema.schema.name, step2, true);
                RealmObject.create(StepSchema.schema.name, step3, true);
                RealmObject.create(DataSchema.schema.name, {
                    caseId: "C001",
                    caseIndex: 1,
                    formId: "4783964",
                    data: "{\"test1\":1.2,\"test2\":\"222\"}"
                }, true);
            });
        } catch (e) {
        }
            expect(Case.getNextStep(paramsNextStep))
                .toEqual({
                    conditionalSteps: {
                        PAGE: "cases_Step?TYPE=DYNAFORM&UID=STO002&POSITION=2&ACTION=EDIT",
                        POSITION: 2,
                        TYPE: "DYNAFORM",
                        UID: "STO002"
                    },
                    triggers: {"status": "200"},
                    variables: {
                        "test1": 1.2,
                        "test2": "222"
                    }
                });
        try {
            RealmObject.write(() => {
                RealmObject.create(StepSchema.schema.name, step1, true);
                RealmObject.create(StepSchema.schema.name, step2, true);
                RealmObject.create(StepSchema.schema.name, step3, true);
                RealmObject.create(DataSchema.schema.name, {
                    caseId: "C001",
                    caseIndex: 1,
                    formId: "4783964",
                    data: "{\"test1\":111.0,\"test2\":\"222\"}"
                }, true);
            });
        } catch (e) {
        }
        expect(Case.getNextStep(paramsNextStep))
            .toEqual({
                conditionalSteps: {
                    PAGE: "cases_Step?TYPE=DYNAFORM&UID=STO003&POSITION=3&ACTION=EDIT",
                    POSITION: 3,
                    TYPE: "DYNAFORM",
                    UID: "STO003"
                },
                triggers: {"status": "200"},
                variables: {
                    "test1": 111.0,
                    "test2": "222"
                }
            });
    });

    test("Case getNextStep if evaluate conditional ORIGINAL TYPE", () => {
        let step2 = {
            id: 'ST02',
            processId: 'PR001',
            taskId: 'TK001',
            stepId: 'ST002',
            stepUidObj: 'STO002',
            stepMode: 'EDIT',
            stepCondition: '@=test1 == 5',
            stepPosition: 2,
            index: 1,
            formId: 'F001',
            formTitle: 'Form Test',
            formDescription: '',
            formUpdateDate: '',
            triggers: {
                before: false,
                after: false,
            }
        };
        try {
            RealmObject.write(() => {
                RealmObject.create(StepSchema.schema.name, step1, true);
                RealmObject.create(StepSchema.schema.name, step2, true);
                RealmObject.create(StepSchema.schema.name, step3, true);
                RealmObject.create(DataSchema.schema.name, {
                    caseId: "C001",
                    caseIndex: 1,
                    formId: "4783964",
                    data: "{\"test1\":5,\"test2\":\"222\"}"
                }, true);
            });
        } catch (e) {
        }
        expect(Case.getNextStep(paramsNextStep))
            .toEqual({
                conditionalSteps: {
                    PAGE: "cases_Step?TYPE=DYNAFORM&UID=STO002&POSITION=2&ACTION=EDIT",
                    POSITION: 2,
                    TYPE: "DYNAFORM",
                    UID: "STO002"
                },
                triggers: {"status": "200"},
                variables: {
                    "test1": 5,
                    "test2": "222"
                }
            });
        try {
            RealmObject.write(() => {
                RealmObject.create(StepSchema.schema.name, step1, true);
                RealmObject.create(StepSchema.schema.name, step2, true);
                RealmObject.create(StepSchema.schema.name, step3, true);
                RealmObject.create(DataSchema.schema.name, {
                    caseId: "C001",
                    caseIndex: 1,
                    formId: "4783964",
                    data: "{\"test1\":111.0,\"test2\":\"222\"}"
                }, true);
            });
        } catch (e) {
        }
        expect(Case.getNextStep(paramsNextStep))
            .toEqual({
                conditionalSteps: {
                    PAGE: "cases_Step?TYPE=DYNAFORM&UID=STO003&POSITION=3&ACTION=EDIT",
                    POSITION: 3,
                    TYPE: "DYNAFORM",
                    UID: "STO003"
                },
                triggers: {"status": "200"},
                variables: {
                    "test1": 111.0,
                    "test2": "222"
                }
            });
    });

    test("Case formWithData", () => {
        let params = {
                dyn_uid: "4783964",
                app_uid: "C001"
            },
            form = {
                formId: "4783964",
                formTitle: "form001",
                formDescription: "Test",
                formContent: "{\"name\":\"form001\",\"description\":\"\",\"items\":[{\"type\":\"form\",\"variable\":\"\",\"var_uid\":\"\",\"dataType\":\"\",\"id\":\"8791935275aec79c41e3588064171373\",\"name\":\"form001\",\"description\":\"\",\"mode\":\"edit\",\"script\":\"\",\"language\":\"en\",\"externalLibs\":\"\",\"printable\":false,\"items\":[[{\"type\":\"title\",\"id\":\"title0000000001\",\"label\":\"title_1\",\"colSpan\":12}],[{\"type\":\"text\",\"variable\":\"textVar001\",\"var_uid\":\"9071600975aec79ca5f78c6042287796\",\"dataType\":\"string\",\"protectedValue\":false,\"id\":\"textVar001\",\"name\":\"textVar001\",\"label\":\"text_1\",\"defaultValue\":\"\",\"placeholder\":\"\",\"hint\":\"\",\"required\":false,\"requiredFieldErrorMessage\":\"\",\"textTransform\":\"none\",\"validate\":\"\",\"validateMessage\":\"\",\"maxLength\":1000,\"formula\":\"\",\"mode\":\"parent\",\"operation\":\"\",\"dbConnection\":\"workflow\",\"dbConnectionLabel\":\"PM Database\",\"sql\":\"\",\"var_name\":\"textVar001\",\"colSpan\":12,\"data\":{}}],[{\"type\":\"submit\",\"id\":\"submit0000000001\",\"name\":\"submit0000000001\",\"label\":\"submit_1\",\"colSpan\":12}]],\"variables\":[{\"var_uid\":\"9071600975aec79ca5f78c6042287796\",\"prj_uid\":\"4128693835aec7967269239098939412\",\"var_name\":\"textVar001\",\"var_field_type\":\"string\",\"var_field_size\":10,\"var_label\":\"string\",\"var_dbconnection\":\"workflow\",\"var_dbconnection_label\":\"PM Database\",\"var_sql\":\"\",\"var_null\":0,\"var_default\":\"\",\"var_accepted_values\":\"[]\",\"inp_doc_uid\":\"\"}]}]}",
                formUpdateDate: "",
            };
        try {
            RealmObject.write(() => {
                RealmObject.create(DataSchema.schema.name, {
                    caseId: "C001",
                    caseIndex: 1,
                    formId: "4783964",
                    data: "{\"textVar001\":\"text test\",\"textVar001_label\":\"text test\",\"test2\":222}"
                }, true);
                RealmObject.create(FormSchema.schema.name, form, true);
            });
        } catch (e) {
        }
        expect(Case.formWithData(params).formContent.items[0].items[1][0].data).toEqual({label: "text test", value: "text test"});

    });
});
