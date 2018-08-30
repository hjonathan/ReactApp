import Toast from "../../App/Utils/toastMessage";

jest.mock('react-native', () => ({
    Platform: {
        OS: "android"
    },
    ToastAndroid: {
        SHORT: "",
        LONG: "",
        TOP: "",
        show: jest.fn(),
        showWithGravity: jest.fn()
    }
}));

describe("Toast Message", () => {
    test("showToast", () => {
        const spy = jest.spyOn(Toast, "showToast");
        Toast.showToast();
        Toast.showToast("message test");
        Toast.showToast("message test", "LONG");
        expect(spy).toHaveBeenCalled();
    });
    test("showToastWithGravity", () => {
        const spy = jest.spyOn(Toast, "showToastWithGravity");
        Toast.showToastWithGravity();
        Toast.showToastWithGravity("message test");
        Toast.showToastWithGravity("message test", "TOP");
        expect(spy).toHaveBeenCalled();
    });
});