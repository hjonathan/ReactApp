import {createActions} from "redux-actions"
import notification from "../../App/Actions/notification"

const actions = createActions(notification);
describe('Notifications Device', () => {
    test('Notification Device Token', () => {
        expect(actions.notification.token.save()).toEqual({type: "notification/token/save"});
        expect(actions.notification.token.request()).toEqual({type: "notification/token/request"});
    });

    test('Notification Device Server', () => {
        expect(actions.notification.device.request()).toEqual({type: "notification/device/request"});
        expect(actions.notification.device.success()).toEqual({type: "notification/device/success"});
        expect(actions.notification.device.error({})).toEqual({type: "notification/device/error", payload: {error: {}}});
    });
});