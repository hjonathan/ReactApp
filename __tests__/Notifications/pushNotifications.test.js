import {pushNotification} from "../../App/Libs/Notifications";

jest.mock('react-native-push-notification', () => require.requireActual('../../__mocks__/react-native-push-notification').default);

describe("Push Notifications", () => {
    test("configure", () => {
        const spy = jest.spyOn(pushNotification, "configure");
        pushNotification.configure();
        expect(spy).toHaveBeenCalled();
    });
    test("show", () => {
        const spy = jest.spyOn(pushNotification, "show"),
            params = {
                file: { name: "imageTest.jpg" }
            };
        pushNotification.show(params);
        expect(spy).toHaveBeenCalled();
    });
    test("show error", () => {
        const spy = jest.spyOn(pushNotification, "show"),
            params = {
                error: true,
                file: { name: "imageTest.jpg" }
            };
        pushNotification.show(params);
        expect(spy).toHaveBeenCalled();
    });
    test("hide", () => {
        const spy = jest.spyOn(pushNotification, "hide");
        pushNotification.hide();
        expect(spy).toHaveBeenCalled();
    });
    test("hideAll", () => {
        const spy = jest.spyOn(pushNotification, "hideAll");
        pushNotification.hideAll();
        expect(spy).toHaveBeenCalled();
    });
});
