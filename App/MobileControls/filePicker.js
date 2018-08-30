import FilePickerManager from "react-native-file-picker";

/**
 * Opens a dialog for select a file from explorer
 * @returns {Promise<any>}
 */
// eslint-disable-next-line import/prefer-default-export
export const showPicker = (title, mimeType = null) => {
    let options = {title};
    if (mimeType) {
        options = {title, mimeType};
    }
    return new Promise((resolve, reject) => {
        FilePickerManager.showFilePicker(
            options,
            (response) => {
                if (response.didCancel) {
                    // User cancelled file chooser
                } else if (response.error) {
                    reject(new Error(response.error));
                } else {
                    resolve(response);
                }
            }
        );
    });
};
