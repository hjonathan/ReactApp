import React, {Component} from "react";
import {
    Image,
    Text,
    TextInput,
    View,
    ScrollView,
    Platform,
    I18nManager,
    PushNotificationIOS
} from "react-native";
import {NavigationActions} from "react-navigation";
import Orientation from "react-native-orientation";
import {Button} from "react-native-elements";
import PropTypes from "prop-types";
import Toast from "react-native-easy-toast";
import {ProgressDialog} from "react-native-simple-dialogs";
import PushNotification from "react-native-push-notification";
import Utils from "../../Utils";
import Actions from "../../Actions";
import I18n from "../../I18n";
import FlatButton from "../../Components/FlatButton";
import GoogleSignInButton from "../../Components/GoogleSignInButton";
import * as Res from "../../Assets/resources";
import Styles from "./styles";

/**
 * Class Login
 */
class Login extends Component {
    /**
     * Constructor Login
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            user: null,
            errorUserName: true,
            errorPassWord: true,
            loader: false,
            toastMessage: null,
            userDataRequested: false
        };
        Orientation.unlockAllOrientations();
    }

    /**
     * Initializes settings
     */
    componentWillMount () {
        this.initSettings();
    }

    /**
     * Init config signIn
     */
    componentDidMount () {
        Orientation.unlockAllOrientations();
        this.setupGoogleSignIn();
    }

    /**
     * Component will receive props
     */
    componentWillReceiveProps (nextProps) {
        if (nextProps.isLoggedIn || nextProps.error) {
            this.setState({loader: false});
        }
        this.setState({toastMessage: (nextProps.error && nextProps.error.error_description) || null});
        this.props.error = null;
    }

    /**
     * Component did update
     */
    componentDidUpdate () {
        if (this.state.toastMessage) {
            this.refs.toast.show(this.state.toastMessage);
        }
    }

    /**
     * Update user name
     * @param text
     * @returns {void|*}
     */
    onChangeUser = (text) => {
        this.setState({errorUserName: (text.length > 0), username: text, toastMessage: null});
    };

    /**
     * Update password
     * @param text
     * @returns {void|*}
     */
    onChangePassword = (text) => {
        this.setState({errorPassWord: (text.length > 0), password: text, toastMessage: null});
    };

    /**
     * Pass params
     */
    onLogin = () => {
        const name = this.state.username;
        const pass = this.state.password;
        if (name && pass) {
            this.setState({loader: true});
            this.props.onLogin(this.state.username, this.state.password);
            this.initNotification();
        }
        this.setState({
            errorUserName: name.length > 0,
            errorPassWord: pass.length > 0
        });
    };

    /**
     * Configuration google signIn
     */
    setupGoogleSignIn = () => this.props.setupGoogleSignIn((err, user) => {
        if (!err) {
            this.setState({user});
        }
    });

    /**
     * SignIn with google count
     */
    signInGoogle = () => this.props.signInGoogle((err, data) => {
        if (!err) {
            this.setState({loader: true, user: data});
        }
    });

    /**
     * SignOut google count
     */
    signOutGoogle = () => this.props.signOutGoogle((err, data) => {
        if (!err) {
            this.setState({user: data});
        }
    });

    /**
     * Gets the previous settings
     * @returns {Promise<void>}
     */
    async initSettings () {
        let defaultSettings = await Utils.multiGet(["@server", "@workspace", "@lang"]);
        this.props.navigation.dispatch(Actions.settings.updateSettings({
            url: defaultSettings["@server"],
            workspace: defaultSettings["@workspace"],
            lang: defaultSettings["@lang"]
        }));
    }

    /**
     * Initializes the notification variables
     */
    initNotification = () => {
        let that = this;
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister (token) {
                that.props.saveTokenStorage(token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification (notification) {
                // process the notification
                // TODO build open case
                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                if (Platform.OS === "ios") {
                    // eslint-disable-next-line no-undef
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "592781414011",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true
        });
        return PushNotification;
    };

    /**
     * Render error for User Name field.
     */
    _renderErrorUser () {
        if (!this.state.errorUserName) {
            return (
                this._errorViewForm(I18n.t("nullUser"))
            );
        }
        return null;
    }

    /**
     * Render error icon for Password field.
     */
    _renderErrorPass () {
        if (!this.state.errorPassWord) {
            return (
                this._errorViewForm(I18n.t("nullPass"))
            );
        }
        return null;
    }

    /**
     * Redirects to settings screen
     */
    goToSettings = () => {
        const routeToScreen = NavigationActions.navigate({
            routeName: "Settings",
            params: {
                logged: false
            }
        });
        this.props.navigation.dispatch(routeToScreen);
    };

    /**
     * Returns an error view for invalid values.
     * @param {string} message
     */
    _errorViewForm (message) {
        return (
            <View style={Styles.viewContainerError}>
                <Image
                    source={Res.images.errorIcon}
                    style={Styles.iconErrorField}
                />
                <Image
                    source={Res.images.errorArrowIcon}
                    style={Styles.arrowImageError}
                />
                <Text
                    style={Styles.textError}
                    adjustFontSizeToFit
                >{message}
                </Text>
            </View>
        );
    }

    /**
     * Renders the logo header
     * @returns {*}
     */
    renderLogo () {
        return (
            <View style={Styles.logoContainer}>
                <Image
                    source={Res.images.logo}
                    style={Styles.logo}
                />
            </View>
        );
    }

    /**
     * Renders divider line
     * @returns {*}
     */
    renderDivider () {
        return (
            <View style={{
                justifyContent: "center",
                flexDirection: "row",
                marginBottom: 15,
                marginTop: 15
            }}
            >
                <View style={{height: 1, backgroundColor: "#fff", width: "36%"}} />
                <View style={{width: 40, alignItems: "center"}}>
                    <Text style={{margin: -10, color: "#fff"}}>{I18n.t("login_or_label")}</Text>
                </View>
                <View style={{height: 1, backgroundColor: "#fff", width: "36%"}} />
            </View>
        );
    }

    /**
     * Renders login form
     * @returns {*}
     */
    renderForm () {
        const alignRTL = I18nManager.isRTL ? "right" : "left";
        return (
            <View>
                <View style={[Styles.subContainer, {marginTop: 20, zIndex: 0}]}>
                    <View style={Styles.textSectionStyle}>
                        <TextInput
                            style={[Styles.textBox, this.state.errorUserName && Styles.textBoxErr, {textAlign: alignRTL}]}
                            onChangeText={this.onChangeUser}
                            placeholder={I18n.t("login_user")}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={Styles.textSectionStyle}>
                        <TextInput
                            style={[Styles.textBox, this.state.errorPassWord && Styles.textBoxErr, {textAlign: alignRTL}]}
                            secureTextEntry
                            onChangeText={this.onChangePassword}
                            placeholder={I18n.t("login_password")}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>
                <View style={Styles.fieldContainer}>
                    <Button
                        raised
                        backgroundColor={Res.colors.successColor}
                        buttonStyle={{height: 38}}
                        borderRadius={2}
                        title={I18n.t("login_btn")}
                        fontSize={14}
                        fontWeight="bold"
                        onPress={() => this.onLogin()}
                    />
                </View>
                <View style={Styles.fieldContainer}>
                    <GoogleSignInButton
                        params={{
                            backgroundColor: "#4285F4",
                            color: Res.colors.white
                        }}
                        onPress={this.signInGoogle}
                        title={I18n.t("login_google_btn")}
                        icon={Res.images.googleSignInIcon}
                    />
                </View>
                {this.renderDivider()}
                <View style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    alignSelf: "flex-end",
                    position: "absolute"
                }}
                >{this._renderErrorUser()}
                </View>
                <View style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    alignSelf: "flex-end",
                    position: "absolute",
                    marginTop: 46
                }}
                >{this._renderErrorPass()}
                </View>
            </View>
        );
    }

    /**
     * Render
     * @returns {*}
     */
    render () {
        return (
            <View style={{flex: 1}}>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="on-drag"
                >
                    <View style={{flex: 1}}>
                        <View style={Styles.mainContainer}>
                            {this.renderLogo()}
                            {this.renderForm()}
                            <View style={Styles.fieldContainer}>
                                <FlatButton
                                    params={{radius: 5, border: 1, color: Res.colors.white}}
                                    onPress={() => {
                                        this.goToSettings();
                                    }}
                                    title={I18n.t("menu_drawer_settings_item_settings")}
                                />
                            </View>
                            <ProgressDialog
                                visible={this.state.loader}
                                title={I18n.t("login_dialog_loading_title")}
                                message={I18n.t("login_dialog_loading_description")}
                            />
                            <Toast
                                ref="toast"
                                style={{margin: 20, backgroundColor: Res.colors.lightColor}}
                                textStyle={{color: "white", textAlign: "center"}}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
    signInGoogle: PropTypes.func.isRequired,
    signOutGoogle: PropTypes.func.isRequired,
    setupGoogleSignIn: PropTypes.func.isRequired
};

export default Login;
