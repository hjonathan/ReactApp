import RealmStore from '../../App/Middleware/Realm/RealmStore'
import * as sinon from "sinon";

describe("Middleware Realm", () => {
    it('should pass the intercepted action to next', () => {
        const nextArgs = [];
        const fakeNext = (...args) => {
            nextArgs.push(args);
        };
        const fakeStore = {
            getState () {
                return {
                    Net: {
                        isConnected: true
                    }
                }
            }
        };
        let action = {
            type: 'userData/success', payload: {
                status: {
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
                }
            }
        };
        RealmStore(fakeStore)(fakeNext)(action);
        expect(nextArgs[0][0]).toEqual(action);
        const actionFake = {type: 'TEST'};
        RealmStore(fakeStore)(fakeNext)(actionFake);
        expect(nextArgs[0][0]).toEqual(action);
    });
});
