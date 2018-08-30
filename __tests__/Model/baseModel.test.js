import {RealmObject, UserSchema} from "../../App/Model/Schemas";
import BaseModel from '../../App/Model/Interface/BaseModel';

describe("Testing BaseModel realm", () => {
    let bm;
    beforeAll(() => {
        try {
            RealmObject.write(() => {
                RealmObject.deleteAll();
            });
        } catch (e) {
        }
        bm = new BaseModel(UserSchema.schema.name)
    });

    test("BaseModel -> create", () => {
        let user = {
            userId: '1001',
            userName: 'camila',
            userPhone: '111111',
            userPhoto: 'kdbnsjklasdlk32i7234789cjsdk',
            userRole: 'ADMIN',
            email: 'camila@processmaker.com',
            firstName: 'Camila',
            fullName: 'Camila Llanos',
            lastName: 'Llanos',
            updateDate: ''
        };
        let data = bm.create(user);
        expect(data.userId).toBe("1001");
    });

    test("BaseModel -> index", () => {
        let data = bm.index();
        expect(data[0].userId).toBe("1001");
    });

    test("BaseModel -> read", () => {
        let data = bm.read('userId', "1001");
        expect(data[0].userId).toBe("1001");
    });

    test("BaseModel -> update", () => {
        let user = {
            userId: '1001',
            userName: 'update',
            userPhone: '111111',
            userPhoto: 'kdbnsjklasdlk32i7234789cjsdk',
            userRole: 'ADMIN',
            email: 'camila@processmaker.com',
            firstName: 'Camila',
            fullName: 'Camila Llanos',
            lastName: 'Llanos',
            updateDate: ''
        };
        let data = bm.update('userId', "1001", user);
        expect(data).toBe(undefined);
    });

    test("BaseModel -> destroy", () => {
        let data = bm.destroy('userId', "1001");
        expect(data).toBe();
    });

    test("BaseModel -> destroyObject", () => {
        let data = bm.destroyObject();
        expect(data).toBe();
    });
});
