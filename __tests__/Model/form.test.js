import {RealmObject, FormSchema} from "../../App/Model/Schemas";
import Form from '../../App/Model/Form';

describe("Testing Form realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll(); // Deletes all
        });
    });
    test("Form object", () => {
        let data = null;
        let form = {
            formId: '0001',
            formTitle: 'Form',
            formDescription: 'Test',
            formContent: "{}",
            formUpdateDate: '',
        };
        RealmObject.write(() => {
            data = RealmObject.create(FormSchema.schema.name, form, true);
        });
        expect(data.formId).toBe("0001");
    });

    test("Form -> saveList", () => {
        let form = {
                formId: "0002",
                formTitle: "Form",
                formDescription: "Test",
                formContent: {},
                formUpdateDate: "",
            },
            payload = {
                status: {
                    response: form,
                    params: {
                        prj_uid: "4128693835aec7967269239098939412",
                        dyn_uid: "8791935275aec79c41e3588064171373"
                    }
                }
            };
        let data = Form.saveList(payload);
        expect(data).toBe(undefined);
        data = Form.saveList(payload);
        expect(data).toBe(undefined);
    });

    test("Form -> getFormOffline", () => {
        let form = {
                formId: "0003",
                formTitle: "Form",
                formDescription: "Test",
                formContent: {var01: "val01"},
                formUpdateDate: "",
            },
            payload = {
                status: {
                    response: form,
                    params: {
                        prj_uid: "4128693835aec7967269239098939412",
                        dyn_uid: "8791935275aec79c41e3588064171373"
                    }
                }
            };
        Form.saveList(payload);
        let data = Form.getFormOffline('0003');
        expect(data.formContent).toEqual({var01:"val01"});
    });

    test("Form -> destroyObject", () => {
        Form.destroyObject();
        let data = Form.getFormOffline('0001');
        expect(data).toEqual(null);
    });
});
