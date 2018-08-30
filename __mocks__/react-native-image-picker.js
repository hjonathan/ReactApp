import React from "react";

const constants = {
    defaultFunction: (params, callback) => callback(params.response)
};

class ImagePicker extends React.Component {
    static constants = constants;

    render () {
        return null;
    }
}

ImagePicker.launchImageLibrary = constants.defaultFunction;
ImagePicker.launchCamera = constants.defaultFunction;
ImagePicker.showImagePicker = constants.defaultFunction;
export default ImagePicker;
