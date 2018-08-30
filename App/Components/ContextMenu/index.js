import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import I18n from "../../I18n";
import Styles from "./styles";

/**
 * Context menu class
 * Example:
 *      ...
 *      import ContextMenu from "../../Components/ContextMenu";
 *
 *      class SomeComponent extends component {
 *          render () {
 *              return (
 *                  <ContextMenu
 *                      type="audio" // audio \\ image \\ video
 *                      onClose={()=>{}} // close function
 *                      takeOne={() => {}} // creates a file function
 *                      selectFile={() => {}} // access to gallery
 *                  />
 *              );
 *          }
 *      }
 */
class ContextMenu extends Component {
    /**
     * Closes view
     */
    onCloseMenu () {
        if (this.props.onClose) {
            this.props.onClose({status: false});
        }
    }

    /**
     * Executes takeOne function
     */
    takeOne () {
        if (this.props.takeOne) {
            this.props.takeOne({status: true});
        }
    }

    /**
     * Executes selectFile function
     */
    selectFile () {
        if (this.props.selectFile) {
            this.props.selectFile();
        }
    }

    /**
     * Renders header
     * @returns {*}
     */
    renderHeader () {
        return (
            <View style={Styles.headerContainer}>
                <View style={Styles.headerTitle}>
                    <Text style={Styles.headerText}>
                        {I18n.t("selectAudioDialogtitle")}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.onCloseMenu();
                    }}
                >
                    <MaterialIcon name="clear" style={Styles.closeIcon} />
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * Renders take one button
     * @returns {*}
     */
    renderTakeButton () {
        return (
            <View style={Styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        this.takeOne();
                    }}
                >
                    <View style={Styles.button}>
                        <MaterialIcon name="mic" style={Styles.buttonIcon} />
                    </View>
                </TouchableOpacity>
                <View style={Styles.labelButton}>
                    <Text style={{textAlign: "center"}}>{I18n.t("selectAudioStringDialog")}</Text>
                </View>
            </View>
        );
    }

    /**
     * Renders gallery button
     * @returns {*}
     */
    renderGalleryButton () {
        return (
            <View style={Styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        this.selectFile();
                    }}
                >
                    <View style={Styles.button}>
                        <MaterialIcon name="graphic-eq" style={Styles.buttonIcon} />
                    </View>
                </TouchableOpacity>
                <View style={Styles.labelButton}>
                    <Text style={{textAlign: "center"}}>{I18n.t("selectGalleryStringAudioDialog")}</Text>
                </View>
            </View>
        );
    }

    /**
     * Renders component
     * @returns {*}
     */
    render () {
        return (
            <View style={Styles.mainContainer}>
                <View style={Styles.subContainer}>
                    {this.renderHeader()}
                    <View style={Styles.panelContainer}>
                        {this.renderTakeButton()}
                        {this.renderGalleryButton()}
                    </View>
                </View>
            </View>
        );
    }
}

export default ContextMenu;
