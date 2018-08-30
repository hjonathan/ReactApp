import notification from '../../../App/Effects/notification'
import * as Api from "../../../App/Services/Api/notifications"

describe('Api notification.js', async () => {
    let WsManager,
        sagas;
    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = notification(WsManager);
    });

    test('saveToken', () => {
        let actionFake = {
                token: {
                    token: '123456789',
                    os: 'android'
                },
            };
        expect(WsManager.saveToken(actionFake)).toBeTruthy();

    });
    test('resetNotification', async () => {
        let actionFake = {
            device: {
                devUid: '123456789'
            }
        };
        expect(WsManager.resetNotification(actionFake)).toBeTruthy();
    });
});