import React from "react";

const constants = {
    defaultFunction: () => {}
};

class ClearCache extends React.Component {
    static constants = constants;

    render () {
        return null;
    }
}

ClearCache.runClearCache = constants.defaultFunction;
export default ClearCache;
