import MobileControls from "../../App/MobileControls";
import {fromGallery} from "../../App/MobileControls/imagePicker";

jest.mock('react-native-image-picker', () => require.requireActual('../../__mocks__/react-native-image-picker').default);

describe("Image Control", () => {
    test("Image Picker - from Gallery Success", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "fromGallery");
        MobileControls.ImageControl.fromGallery({
            mediaType: "image",
            response: {data: "fakeFile"}
        }).then((data) => {
            expect(data).toEqual({data: "fakeFile"});
        });
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from Gallery Cancel", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "fromGallery");
        MobileControls.ImageControl.fromGallery({
            mediaType: "image",
            response: {didCancel: true}
        }).then((data) => {
            expect(data).toEqual(null);
        });
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from Gallery Error", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "fromGallery");
        MobileControls.ImageControl.fromGallery({
            mediaType: "image",
            response: {error: true}
        }).then((data) => {
            expect(data).toEqual(null);
        });
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from Camera Success", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "fromCamera");
        MobileControls.ImageControl.fromCamera({
            mediaType: "image",
            response: {data: "fakeFile"}
        }).then((data) => {
            expect(data).toEqual({data: "fakeFile"});
        });
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from Camera Cancel", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "fromCamera");
        MobileControls.ImageControl.fromCamera({
            mediaType: "image",
            response: {didCancel: true}
        }).then((data) => {
            expect(data).toEqual({data: "fakeFile"});
        });
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from Camera Error", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "fromCamera");
        MobileControls.ImageControl.fromCamera({
            mediaType: "image",
            response: {error: true}
        }).then((data) => {
            expect(data).toEqual({data: "fakeFile"});
        });
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from showImagePicker Camera", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "showImagePicker");
        MobileControls.ImageControl.showImagePicker({mediaType: "image"},
            {
                response: {
                    customButton: "camera"
                }
            }).then(data => data);
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from showImagePicker Gallery", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "showImagePicker");
        MobileControls.ImageControl.showImagePicker({mediaType: "image"},
            {
                response: {
                    customButton: "gallery"
                }
            }).then(data => data);
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from showImagePicker Default", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "showImagePicker");
        MobileControls.ImageControl.showImagePicker({mediaType: "image"},
            {
                response: {
                    customButton: ""
                }
            }).then(data => data);
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from showImagePicker Empty", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "showImagePicker");
        MobileControls.ImageControl.showImagePicker({mediaType: ""},
            {response: {}}).then(data => data);
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from showImagePicker Cancel", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "showImagePicker");
        MobileControls.ImageControl.showImagePicker({mediaType: "image"},
            {
                response: {
                    didCancel: true
                }
            }).then(data => data);
        expect(spy).toHaveBeenCalled();
    });

    test("Image Picker - from showImagePicker Error", () => {
        const spy = jest.spyOn(MobileControls.ImageControl, "showImagePicker");
        MobileControls.ImageControl.showImagePicker({mediaType: "image"},
            {
                response: {
                    error: true
                }
            }).then(data => data);
        expect(spy).toHaveBeenCalled();
    });
});