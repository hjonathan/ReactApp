import React from "react";

const constants = {
    defaultFunction: () => new Promise((resolve, reject) => {})
};

class RNSettings extends React.Component {
    static constants = constants;

    render () {
        return null;
    }
}

RNSettings.getSetting = constants.defaultFunction;
RNSettings.openSetting = constants.defaultFunction;
export default RNSettings;
