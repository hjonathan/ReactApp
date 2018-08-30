import ImagePicker from "react-native-image-picker";
import I18N from "../I18n";

const options = {
    noData: true,
    title: null,
    takePhotoButtonTitle: null,
    chooseFromLibraryButtonTitle: null,
    customButtons: [
        {name: "camera", title: I18N.t("selectCameraStringPictureDialog")},
        {name: "gallery", title: I18N.t("selectGalleryStringPictureDialog")}
    ],
    storageOptions: {
        skipBackup: true
    }
};

/**
 * Selects an image from gallery
 * @returns {Promise<any>}
 */
export const fromGallery = (params) => {
    let data = null,
        mergedOptions = Object.assign({}, options, params);
    return new Promise((resolve, reject) => {
        ImagePicker.launchImageLibrary(mergedOptions, (response) => {
            if (!Object.prototype.hasOwnProperty.call(response, "didCancel") &&
                !Object.prototype.hasOwnProperty.call(response, "error")) {
                data = response;
            }
            resolve(data);
        });
    });
};

/**
 * Opens the camera for take a picture
 * @returns {Promise<any>}
 */
export const fromCamera = (params) => {
    let data = null,
        mergedOptions = Object.assign({}, options, params);
    return new Promise((resolve, reject) => {
        ImagePicker.launchCamera(mergedOptions, (response) => {
            if (!Object.prototype.hasOwnProperty.call(response, "didCancel") &&
                !Object.prototype.hasOwnProperty.call(response, "error")) {
                data = response;
            }
            resolve(data);
        });
    });
};

/**
 * Opens a dialog for select an image from gallery or access to the camera
 * @returns {Promise<any>}
 */
export const showImagePicker = (params, extra) => {
    let extraData = params.mediaType === "image" ? {mediaType: "photo"} : params,
        globalOptions = Object.assign({}, options, extra);
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(globalOptions, (response) => {
            if (!Object.prototype.hasOwnProperty.call(response, "didCancel") &&
                !Object.prototype.hasOwnProperty.call(response, "error")) {
                if (Object.prototype.hasOwnProperty.call(response, "customButton")) {
                    switch (response.customButton) {
                        case "camera":
                            fromCamera(extraData).then((data) => {
                                resolve(data);
                            });
                            break;
                        case "gallery":
                            fromGallery(extraData).then((data) => {
                                resolve(data);
                            });
                            break;
                        default:
                            break;
                    }
                }
            }
        });
    });
};
