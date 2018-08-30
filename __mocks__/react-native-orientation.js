/* eslint-disable react/prefer-stateless-function */
import React from "react";

const lockToPortrait = () => {},
    lockToLandscape = () => {},
    unlockAllOrientations = () => {},
    getInitialOrientation = () => {};

class Orientation extends React.Component {
    render () {
        return null;
    }
}
Orientation.lockToPortrait = lockToPortrait;
Orientation.lockToLandscape = lockToLandscape;
Orientation.unlockAllOrientations = unlockAllOrientations;
Orientation.getInitialOrientation = getInitialOrientation;
export default Orientation;
