import React, {PureComponent} from "react";
import {View, Button} from "react-native";
import SignatureCapture from "react-native-signature-capture";
import Orientation from "react-native-orientation";
import PropTypes from "prop-types";
import I18n from "../../I18n";
import Styles from "./styles";
import * as Res from "../../Assets/resources";

/**
 * Class Signature
 * Example:
 * import Signature from '../Components/Signature';
 * render() {
 *      return(
 *          <Signature
 *              // This a function where the signature object returns
 *              // objectSignature.encoded - for the base64 encoded png
 *              // objectSignature.pathName - for the file path name
 *              sendSignature={(objectSignature) => {
 *                  console.log(objectSignature);
 *              }}
 *          />
 *      ),
 * }
 */
class Signature extends PureComponent {
    /**
     * Constructor Signature
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            saveDisable: true,
            orientation: null
        };
        this.signature = null;
        this.onSaveEvent = this.onSaveEvent.bind(this);
        this.onDragEvent = this.onDragEvent.bind(this);
        this.onResetButton = this.onResetButton.bind(this);
    }

    /**
     * Component will be mounted.
     */
    componentWillMount () {
        const initial = Orientation.getInitialOrientation();
        this.setState({orientation: initial});
    }

    /**
     * Reset the cases state when the component was removed
     */
    componentWillUnmount () {
        Orientation.unlockAllOrientations();
    }

    /**
     * Cancel button in modal
     */
    onCancelButton () {
        this.props.changeSignature(false);
        if (this.state.orientation === "LANDSCAPE") {
            Orientation.lockToLandscape();
        } else {
            Orientation.lockToPortrait();
        }
    }

    /**
     * Reset canvas signature
     */
    onResetButton () {
        this.signature.resetImage();
        this.setState({saveDisable: true});
    }

    /**
     * Save the signature
     */
    onSaveButton () {
        this.signature.saveImage();
        setTimeout(() => {
            this.props.changeSignature(false);
            if (this.state.orientation === "LANDSCAPE") {
                Orientation.lockToLandscape();
            } else {
                Orientation.lockToPortrait();
            }
        }, 1000);
    }

    /**
     * Save event
     * @param result
     */
    onSaveEvent (result) {
        this.props.sendSignature(result);
    }

    /**
     * Drag event
     */
    onDragEvent () {
        this.setState({saveDisable: false});
    }

    /**
     * Sets ref to the signature picture
     * @param ref
     * @returns {*}
     */
    setSignatureRef = ref => (this.signature = ref);

    /**
     * Renders Signature
     */
    render () {
        return (
            <View style={Styles.modalContainer}>
                <View style={Styles.modalOptions}>
                    <View style={Styles.buttonStyle}>
                        <Button
                            color={Res.colors.gray}
                            onPress={() => {
                                this.onCancelButton();
                            }}
                            title={I18n.t("signature_cancel")}
                        />
                    </View>
                    <View style={Styles.buttonStyle}>
                        <Button
                            color={Res.colors.gray}
                            onPress={() => {
                                this.onResetButton();
                            }}
                            title={I18n.t("signature_clear")}
                        />
                    </View>
                    <View style={Styles.buttonStyle}>
                        <Button
                            color={Res.colors.gray}
                            onPress={() => {
                                this.onSaveButton();
                            }}
                            title={I18n.t("signature_save")}
                            disabled={this.state.saveDisable}
                        />
                    </View>
                </View>
                <View style={Styles.modalSignature}>
                    <SignatureCapture
                        style={Styles.signature}
                        ref={this.setSignatureRef}
                        onSaveEvent={this.onSaveEvent}
                        onDragEvent={this.onDragEvent}
                        saveImageFileInExtStorage
                        showNativeButtons={false}
                        showTitleLabel
                        viewMode="landscape"// "landscape/portrait"
                        minStrokeWidth={4}
                        maxStrokeWidth={8}
                    />
                </View>
            </View>
        );
    }
}

Signature.propTypes = {
    sendSignature: PropTypes.func.isRequired,
    changeSignature: PropTypes.func
};

Signature.defaultProps = {
    changeSignature: () => {}
};

export default Signature;
