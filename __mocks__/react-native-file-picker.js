import React from "react";

const response = {
        didCancel: false,
        error: undefined,
        fileName: "testName",
        type: "image/jpeg"
    },
    constants = {
        defaultFunction: (params, callback) => callback(response)
    };

class FilePickerManager extends React.Component {
    static constants = constants;

    render () {
        return null;
    }
}
FilePickerManager.showFilePicker = constants.defaultFunction;
export default FilePickerManager;
