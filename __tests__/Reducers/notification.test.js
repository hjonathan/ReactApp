import reducers from "../../App/Reducers/notification";

describe('Reducer notification.js', () => {
    test('actions.notification.token.save', () => {
        const token = {
            token: '1234567',
            os:'android'
        };
        expect(reducers({}, {
            type: "notification/token/save",
            payload: token
        })).toBeTruthy();
    });
    test('actions.notification.device.success', () => {
        expect(reducers({}, {
            type: "notification/device/success",
            payload: '123456789'
        })).toBeTruthy();
    });
});