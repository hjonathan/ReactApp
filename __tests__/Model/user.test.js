import {RealmObject, UserSchema} from "../../App/Model/Schemas";
import User from '../../App/Model/User';

describe("Testing User realm", () => {
    beforeAll(() => {
        RealmObject.write(() => {
            RealmObject.deleteAll();
        });
    });

    test("Realm object", () => {
        let data = null;
        let user = {
            userId: '0001',
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
        RealmObject.write(() => {
            data = RealmObject.create(UserSchema.schema.name, user, true);
        });
        expect(data.userId).toBe("0001");
    });

    test("User -> createUser", () => {
        let user = {
            userId: '0002',
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
        let data = User.createUser({status: user});
        expect(data).toBe(undefined);
        data = User.createUser({status: user});
        expect(data).toBe(undefined);
    });

    test("User -> createBatch", () => {
        let user = {
            userId: '0003',
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
        let data = User.createBatch({data: [user]});
        expect(data).toBe(undefined);
        data = User.createBatch({data: [user]});
        expect(data).toBe(undefined);
    });
});
