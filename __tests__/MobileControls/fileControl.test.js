import MobileControls from "../../App/MobileControls";
import {showPicker} from "../../App/MobileControls/filePicker";

jest.mock('react-native-file-picker', () => require.requireActual('../../__mocks__/react-native-file-picker').default);

describe("File Control", () => {
    test("File Choose Picker - from showPicker didCancel ", () => {
        const spy = jest.spyOn(MobileControls.FileControl, "showPicker");
        MobileControls.FileControl.showPicker("Test File Choose", "image/jpg")
            .then(data => data);
        expect(spy).toHaveBeenCalled();
    });
});
