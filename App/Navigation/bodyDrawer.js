import React, {Component} from "react";
import {TouchableOpacity, View, Text, Image, ScrollView, Linking} from "react-native";
import {
    DrawerItems,
    NavigationActions
} from "react-navigation";
import Modal from "react-native-modal";
import Actions from "../Actions";
import Styles from "./styles";
import NavigatorButton from "../Components/NavigatorButton/NavigatorButton";
import * as Res from "../Assets/resources";
import I18n from "../I18n";
import config from "../conf.json";

/**
 * Body for drawer option (Inbox, Draft, Unassigned, Participated)
 */
class BodyDrawer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalVisibleLogOut: false
        };
    }

    /**
     * Close modal handler
     */
    closeModal () {
        this.setState({modalVisible: false});
    }

    /**
     * Close Modal Logout handler.
     */
    closeModalLogOut () {
        this.setState({modalVisibleLogOut: false});
    }

    /**
     * Close Body Drawer.
     */
    closeBodyDrawer () {
        this.props.navigation.closeDrawer();
    }
    /**
     * Renders header
     * @returns {*}
     */
    renderHeader () {
        let userData = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.userData) {
            userData = this.props.navigation.state.params.userData;
        }
        return (
            <View style={Styles.contentHeader}>
                <Image
                    style={Styles.avatar}
                    source={{uri: `data:image/gif;base64,${userData.userPhoto ? userData.userPhoto : null}`}}
                />
                <Text style={Styles.userInfo}>
                    {userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : null}
                </Text>
            </View>
        );
    }

    /**
     * Renders NavButtons subItems
     * @returns {*}
     */
    renderSubItems () {
        return (
            <View>
                <NavigatorButton
                    title={I18n.t("menu_drawer_settings_item_settings")}
                    icon="cog"
                    onPress={() => {
                        const settings = NavigationActions.navigate({
                            routeName: "Settings",
                            params: {
                                logged: true
                            }
                        });
                        this.props.navigation.dispatch(settings);
                    }}
                />
                <NavigatorButton
                    title={I18n.t("menu_drawer_settings_item_help")}
                    icon="question-circle"
                    onPress={() => {
                        Linking.openURL(config.helpUrl);
                    }}
                />
                <NavigatorButton
                    title={I18n.t("manu_drawer_settings_item_about")}
                    icon="info-circle"
                    onPress={() => {
                        this.setState({modalVisible: true});
                    }}
                />
                <NavigatorButton
                    title={I18n.t("menu_drawer_settings_item_Logout")}
                    icon="sign-out"
                    onPress={() => {
                        this.closeBodyDrawer();
                        this.setState({modalVisibleLogOut: true});
                    }}
                />
            </View>
        );
    }

    /**
     * Renders the information modal
     * @returns {*}
     */
    renderModal () {
        return (
            <Modal
                isVisible={this.state.modalVisible}
                animationType="slide"
                backdropOpacity={0.6}
                onRequestClose={() => this.closeModal()}
            >
                <View style={Styles.modalContainer}>
                    <View style={Styles.innerContainer}>
                        <View style={Styles.modalTitle}>
                            <Text style={Styles.modalTextTitle}>{config.application.name}</Text>
                        </View>
                        <View style={{padding: 16}}>
                            <Text style={Styles.modalTextContainer}>
                                {I18n.t("dialog_about_version_label")} {config.version.number}
                            </Text>
                            <Text style={Styles.modalTextContainer}>
                                {I18n.t("dialog_about_build_name_label")} {config.version.gitHash}
                            </Text>
                        </View>
                        <View style={Styles.modalFooter}>
                            <View style={Styles.buttonContainer}>
                                <TouchableOpacity
                                    style={Styles.okButton}
                                    onPress={() => {
                                        this.closeModal();
                                    }}
                                >
                                    <Text style={{color: "white"}}>
                                        {I18n.t("OK").toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    /**
     * Render modal LogOut
     * @returns {*}
     */
    renderModalLogOut () {
        return (
            <Modal
                isVisible={this.state.modalVisibleLogOut}
                backdropOpacity={0.6}
                animationType="none"
            >
                <View style={Styles.logOutContainer}>
                    <View style={Styles.logOutSubContainer}>
                        <View style={Styles.logOutHeader}>
                            <Text style={{color: Res.colors.white, fontSize: 18}}>
                                {I18n.t("menu_drawer_settings_item_Logout")}
                            </Text>
                        </View>
                        <View style={Styles.logOutBody}>
                            <Text>
                                {I18n.t("AreLogout")}
                            </Text>
                        </View>
                        <View style={Styles.logOutFooter}>
                            <View style={{width: "50%"}}>
                                <TouchableOpacity
                                    style={Styles.cancelButton}
                                    onPress={() => {
                                        this.closeModalLogOut();
                                    }}
                                >
                                    <Text style={{color: "white"}}>
                                        {I18n.t("Cancel").toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: "50%"}}>
                                <TouchableOpacity
                                    style={Styles.okButton}
                                    onPress={() =>
                                        this.props.navigation.dispatch(Actions.logout.request())
                                    }
                                >
                                    <Text style={{color: "white"}}>
                                        {I18n.t("OK").toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    /**
     * Renders sidebar
     * @returns {*}
     */
    render () {
        return (
            <View style={{flex: 1, backgroundColor: Res.colors.bgColor}}>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="on-drag"
                >
                    {this.renderHeader()}
                    <View style={Styles.divider} />
                    <DrawerItems
                        {...this.props}
                        labelStyle={{color: "#ffffff"}}
                        onItemPress={({route, focused}) => {
                            // here we overwrite the function with a close body drawer
                            // + the original function
                            this.closeBodyDrawer();
                            this.props.onItemPress({route, focused});
                        }}
                    />
                    <View style={Styles.divider} />
                    {this.renderSubItems()}
                </ScrollView>
                {this.renderModal()}
                {this.renderModalLogOut()}
            </View>
        );
    }
}

export default BodyDrawer;
