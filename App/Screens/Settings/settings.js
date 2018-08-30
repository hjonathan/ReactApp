import React, {Component} from "react";
import {Text, Switch, View, TouchableHighlight, ScrollView, I18nManager, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {Dialog, ProgressDialog} from "react-native-simple-dialogs";
import Toast from "react-native-easy-toast";
import {CheckBox, FormInput} from "react-native-elements";
import RNRestart from "react-native-restart";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {isUri} from "valid-url";
import Utils from "../../Utils";
import I18n from "../../I18n";
import * as Res from "../../Assets/resources";
import Styles from "./styles";
import actions from "../../Actions";

const languages = [
    {label: "English", value: "en"},
    {label: "Español", value: "es"},
    {label: "Français", value: "fr"},
    {label: "Portugues", value: "pt"},
    {label: "العربية", value: "ar"}
];

/**
 * Settings component class.
 */
class Settings extends Component {
    /**
     * Navigation option
     */
    static navigationOptions = ({navigation}) => ({
        title: I18n.t("menu_drawer_settings_item_settings"),
        headerTintColor: Res.colors.white,
        headerStyle: {
            backgroundColor: Res.colors.mainColor
        },
        headerLeft: (
            <TouchableOpacity
                style={{padding: 16}}
                onPress={() => {
                    const {params} = navigation.state;
                    navigation.dispatch(actions.settings.backButtonPressed(params));
                }
                }
            >
                {
                    I18nManager.isRTL
                        ? <MaterialIcon name="arrow-forward" style={{color: Res.colors.white, fontSize: 24}} />
                        : <MaterialIcon name="arrow-back" style={{color: Res.colors.white, fontSize: 24}} />
                }
            </TouchableOpacity>)
    });
    /**
     * Constructor
     * @param {*} props
     */
    constructor (props) {
        super(props);
        this.state = {
            tmpServer: "",
            serverUrl: "",
            workspace: "",
            toastMessage: null,
            currentLanguage: {
                label: "English",
                value: "en"
            },
            externalLibs: true,
            dialogServerUrl: false,
            dialogWorkspace: false,
            dialogCache: false,
            dialogLanguages: false,
            progressClear: false,
            progressShow: false
        };
        this._syncDown = this._syncDown.bind(this);
        this._onChangeExternalLibs = this._onChangeExternalLibs.bind(this);
    }

    /**
     * Gets current global language
     */
    componentWillMount () {
        this.initialSettings();
    }

    /**
     * Calls saveInitialParams method
     */
    componentDidMount () {
        this.saveInitialParams();
    }

    /**
     * Component will receive props
     */
    componentWillReceiveProps (nextProps) {
        if (nextProps && nextProps.error) {
            this.refs._toastSettings.show(nextProps.error.message, 3000);
        }
    }

    /**
     * Gets item language
     * @param value
     * @returns {object}
     */
    // eslint-disable-next-line consistent-return
    getLanguage (value) {
        let itemLanguage = null;
        if (value) {
            languages.forEach((item) => {
                if (item.value === value) {
                    itemLanguage = item;
                    return;
                }
            });
            return itemLanguage;
        }
    }

    /**
     * Saves previous user configuration
     */
    saveInitialParams () {
        this.props.navigation.setParams({
            previousConfig: this.props.server
        });
    }

    /**
     * Initializes user settings
     */
    async initialSettings () {
        let defaultSettings = await Utils.multiGet(["@server", "@workspace", "@lang", "@externalLibs"]);
        this.setState({
            tmpServer: defaultSettings["@server"],
            serverUrl: defaultSettings["@server"],
            workspace: defaultSettings["@workspace"],
            currentLanguage: this.getLanguage(defaultSettings["@lang"]),
            externalLibs: defaultSettings["@externalLibs"] === "true"
        });
    }

    /**
     * Updates Server field Url to consume the REST services
     */
    updateServer () {
        let serverUrl = this.state.tmpServer;
        this.setState({dialogServerUrl: false});
        if (serverUrl.trim().length > 0 && isUri(serverUrl)) {
            this.setState({serverUrl});
            Utils.setItem("@server", serverUrl);
            this.props.updateUrl(serverUrl);
        } else {
            this.refs._toastSettings.show(I18n.t("Url_Invalid"), 2000);
        }
    }

    /**
     * Updates workspace field to complete the Rest Services requirements
     */
    updateWorkspace () {
        this.setState({dialogWorkspace: false});
        Utils.setItem("@workspace", this.state.workspace);
        this.props.updateWorkspace(this.state.workspace);
    }

    /**
     * Downloads buildProd and regenerates folders
     */
    downloadBuildProd () {
        this.props.navigation.dispatch(actions.fs.app.folders.create());
        this.props.navigation.dispatch(actions.fs.app.buildProd.download());
    }

    /**
     * Updates server url
     * @param url
     * @private
     */
    _onChangeServerUrl = (url) => {
        if (url && url.trim().length) {
            this.setState({tmpServer: url});
        }
    };

    /**
     * Updates Workspace
     * @param workspace
     * @private
     */
    _onChangeWorkspace = (workspace) => {
        if (workspace && workspace.trim().length) {
            this.setState({workspace});
        }
    };

    /**
     * Cleans cache
     * @private
     */
    _cleanCache = () => {
        this.setState({progressClear: true});
        Utils.cleanCache();
        setTimeout(() => {
            this.setState({progressClear: false});
        }, 1000);
        this.downloadBuildProd();
    };

    /**
     * Switches external libraries
     * @param value
     */
    _onChangeExternalLibs (value) {
        this.setState({externalLibs: value});
        Utils.setItem("@externalLibs", `${value}`);
    }

    /**
     * Changes language
     * @param value
     * @private
     */
    _onSelectLanguage = (value) => {
        let itemSelected = this.getLanguage(value);
        if (itemSelected) {
            this.setState({currentLanguage: itemSelected, dialogLanguages: false});
            Utils.setItem("@lang", itemSelected.value);
        }
    };

    /**
     * Download the case offline
     * @private
     */
    _syncDown () {
        this.props.syncDown();
    }

    /**
     * Renders
     * @returns {*}
     * @private
     */
    _renderDialogServerUrl () {
        return (
            <Dialog
                title={I18n.t("preference_end_point_chose")}
                visible={this.state.dialogServerUrl}
                onTouchOutside={() => this.setState({dialogServerUrl: false})}
            >
                <View style={{flexDirection: "column", margin: -8}}>
                    <View>
                        <FormInput
                            inputStyle={Styles.inputText}
                            underlineColorAndroid={Res.colors.teal}
                            autoFocus
                            defaultValue={this.state.serverUrl}
                            onChangeText={this._onChangeServerUrl}
                        />
                    </View>
                    <View style={{justifyContent: "flex-end", flexDirection: "row", paddingVertical: 8}}>
                        <TouchableHighlight
                            underlayColor={Res.colors.highlightColor}
                            style={{paddingHorizontal: 16, paddingVertical: 8}}
                            onPress={() =>
                                this.setState({dialogServerUrl: false})
                            }
                        >
                            <Text style={{color: Res.colors.teal, fontWeight: "bold"}}>{I18n.t("Cancel").toUpperCase()}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={Res.colors.highlightColor}
                            style={{paddingHorizontal: 16, paddingVertical: 8}}
                            onPress={() =>
                                this.updateServer()
                            }
                        >
                            <Text style={{color: Res.colors.teal, fontWeight: "bold"}}>{I18n.t("OK")}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Dialog>
        );
    }

    /**
     * Renders workspace dialog
     * @returns {*}
     * @private
     */
    _renderDialogWorkspace () {
        return (
            <Dialog
                title={I18n.t("preference_end_point_name")}
                visible={this.state.dialogWorkspace}
                onTouchOutside={() => this.setState({dialogWorkspace: false})}
            >
                <View style={{flexDirection: "column", margin: -8}}>
                    <View>
                        <FormInput
                            inputStyle={Styles.inputText}
                            underlineColorAndroid={Res.colors.teal}
                            autoFocus
                            defaultValue={this.state.workspace}
                            onChangeText={this._onChangeWorkspace}
                        />
                    </View>
                    <View style={{justifyContent: "flex-end", flexDirection: "row", paddingVertical: 8}}>
                        <TouchableHighlight
                            underlayColor={Res.colors.highlightColor}
                            style={{paddingHorizontal: 16, paddingVertical: 8}}
                            onPress={() =>
                                this.setState({dialogWorkspace: false})
                            }
                        >
                            <Text style={{color: Res.colors.teal, fontWeight: "bold"}}>{I18n.t("Cancel").toUpperCase()}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={Res.colors.highlightColor}
                            style={{paddingHorizontal: 16, paddingVertical: 8}}
                            onPress={() =>
                                this.updateWorkspace()
                            }
                        >
                            <Text style={{color: Res.colors.teal, fontWeight: "bold"}}>{I18n.t("OK")}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Dialog>
        );
    }

    /**
     * Renders clean cache dialog
     * @returns {*}
     * @private
     */
    _renderDialogCleanCache () {
        return (
            <Dialog
                title={I18n.t("Cache_Erased")}
                visible={this.state.dialogCache}
                onTouchOutside={() => this.setState({dialogCache: false})}
            >
                <View style={{flexDirection: "column", margin: -8}}>
                    <View>
                        <Text style={{fontSize: 16, color: "#000"}}>{I18n.t("Message_Cache_Erased")}</Text>
                    </View>
                    <View style={{justifyContent: "flex-end", flexDirection: "row", paddingVertical: 8}}>
                        <TouchableHighlight
                            underlayColor={Res.colors.highlightColor}
                            style={{paddingHorizontal: 16, paddingVertical: 8}}
                            onPress={() => {
                                this.setState({dialogCache: false});
                            }}
                        >
                            <Text style={{color: Res.colors.teal, fontWeight: "bold"}}>{I18n.t("Cancel").toUpperCase()}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={Res.colors.highlightColor}
                            style={{paddingHorizontal: 16, paddingVertical: 8}}
                            onPress={() => {
                                this.setState({dialogCache: false});
                                this._cleanCache();
                            }}
                        >
                            <Text style={{color: Res.colors.teal, fontWeight: "bold"}}>{I18n.t("OK")}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Dialog>
        );
    }

    /**
     * Renders clean cache progress dialog
     * @returns {*}
     * @private
     */
    _progressDialogClear () {
        return (
            <ProgressDialog
                visible={this.state.progressClear}
                title={I18n.t("login_dialog_loading_title")}
                message={I18n.t("login_dialog_loading_description_setting_up_process_maker")}
            />
        );
    }

    /**
     * Renders sync offline progress dialog
     * @returns {*}
     * @private
     */
    _renderDialogGetOffline () {
        return (
            <ProgressDialog
                visible={this.props.progressShow}
                title={I18n.t("preference_sync_pmdynaforms_title")}
                message={I18n.t("preference_sync_pmdynaforms_description")}
            />
        );
    }

    /**
     * Renders languages dialog
     * @returns {*}
     * @private
     */
    _renderDialogLanguages () {
        return (
            <Dialog
                visible={this.state.dialogLanguages}
                onTouchOutside={() => this.setState({dialogLanguages: false})}
            >
                <View style={{flexDirection: "column", margin: -8}}>
                    {
                        languages.map((lang, index) =>
                            (<CheckBox
                                key={lang.value}
                                containerStyle={{backgroundColor: "transparent", borderWidth: 0, padding: 0}}
                                title={lang.label}
                                checked={this.state.currentLanguage.value === lang.value}
                                iconType="material"
                                checkedIcon="radio-button-checked"
                                uncheckedIcon="radio-button-unchecked"
                                checkedColor={Res.colors.teal}
                                textStyle={{fontWeight: "normal"}}
                                onPress={() => {
                                    this._onSelectLanguage(lang.value);
                                    RNRestart.Restart();
                                }}
                            />))
                    }
                    <View style={{justifyContent: "flex-end", flexDirection: "row", paddingVertical: 8}}>
                        <TouchableHighlight
                            underlayColor={Res.colors.highlightColor}
                            style={{paddingHorizontal: 16, paddingVertical: 8}}
                            onPress={() => {
                                this.setState({dialogLanguages: false});
                            }}
                        >
                            <Text style={{color: Res.colors.teal, fontWeight: "bold"}}>{I18n.t("Cancel").toUpperCase()}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Dialog>
        );
    }

    /**
     * Renders server configuration section
     * @returns {*}
     * @private
     */
    _renderServerConfigSection () {
        return (
            <View style={{paddingBottom: 16}}>
                <Text style={Styles.sectionTitle}>
                    {I18n.t("preference_end_point_settings")}
                </Text>
                {/* Server URL */}
                <TouchableHighlight
                    onPress={() => this.setState({dialogServerUrl: true})}
                    underlayColor={Res.colors.highlightColor}
                >
                    <View style={Styles.fieldContainer}>
                        <Text style={Styles.fieldTitle}>{I18n.t("preference_end_point_chose")}</Text>
                        <Text>
                            {this.state.serverUrl}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={Styles.divider} />
                {/* Workspace */}
                <TouchableHighlight
                    onPress={() => this.setState({dialogWorkspace: true})}
                    underlayColor={Res.colors.highlightColor}
                >
                    <View style={Styles.fieldContainer}>
                        <Text style={Styles.fieldTitle}>{I18n.t("preference_end_point_name")}</Text>
                        <Text>
                            {this.state.workspace}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * Renders cache section
     * @returns {*}
     * @private
     */
    _renderCacheSection () {
        const {externalLibs} = this.state;
        return (
            <View style={{paddingBottom: 16}}>
                <Text style={Styles.sectionTitle}>
                    {I18n.t("preference_erasercache_Title")}
                </Text>
                {/* Clean Cache */}
                {
                    this.props.isLoggedIn
                        ? <TouchableHighlight
                            onPress={() => this.setState({dialogCache: true})}
                            underlayColor={Res.colors.highlightColor}
                        >
                            <View style={Styles.fieldContainer}>
                                <Text style={Styles.fieldTitle}>
                                    {I18n.t("preference_eraser_sumary")}
                                </Text>
                                <Text>
                                    {I18n.t("preference_erasercache_Title_Clean")}
                                </Text>
                            </View>
                          </TouchableHighlight>
                        : <TouchableHighlight underlayColor={Res.colors.highlightColor}>
                            <View style={Styles.fieldContainer}>
                                <Text style={[Styles.fieldTitle, Styles.disabled]}>
                                    {I18n.t("preference_eraser_sumary")}
                                </Text>
                                <Text style={Styles.disabled}>
                                    {I18n.t("preference_erasercache_Title_Clean")}
                                </Text>
                            </View>
                          </TouchableHighlight>
                }
                <View style={Styles.divider} />
                {/* External Libraries */}
                <View style={{flex: 1, flexDirection: "row"}}>
                    <TouchableHighlight
                        onPress={() => {
                            Utils.setItem("@externalLibs", `${!externalLibs}`);
                            this.setState({externalLibs: !externalLibs});
                        }}
                        underlayColor={Res.colors.highlightColor}
                        style={{width: "85%"}}
                    >
                        <View style={Styles.fieldContainer}>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{flex: 1, flexWrap: "wrap"}}>
                                    <Text style={Styles.fieldTitle}>
                                        {I18n.t("preference_enable_external_libraries_cache")}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <Switch
                        onValueChange={this._onChangeExternalLibs}
                        value={externalLibs}
                        style={{width: "15%"}}
                    />
                </View>
            </View>
        );
    }

    /**
     * Renders language section
     * @returns {*}
     * @private
     */
    _renderLanguageSection () {
        return (
            <View style={{paddingBottom: 16}}>
                <Text style={Styles.sectionTitle}>
                    {I18n.t("preference_language_selection_title")}
                </Text>
                {/* Language */}
                <TouchableHighlight
                    onPress={() => {
                        this.setState({dialogLanguages: true});
                    }}
                    underlayColor={Res.colors.highlightColor}
                >
                    <View style={Styles.fieldContainer}>
                        <Text>{this.state.currentLanguage.label}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * Renders offline section
     * @returns {*}
     * @private
     */
    _renderOfflineSection () {
        return (
            <View style={{paddingBottom: 16}}>
                <Text style={Styles.sectionTitle}>
                    {I18n.t("preference_offline_settings")}
                </Text>
                {/* Sync cases offline */}
                <TouchableHighlight
                    onPress={this._syncDown}
                    underlayColor={Res.colors.highlightColor}
                >
                    <View style={Styles.fieldContainer}>
                        <Text style={Styles.fieldTitle}>
                            {I18n.t("preference_offline_download_data")}
                        </Text>
                        <Text>
                            {I18n.t("preference_offline_data_downloaded")}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * Render the settings component
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
                            {this._renderServerConfigSection()}
                            {this._renderCacheSection()}
                            {this._renderLanguageSection()}
                            {this.props.isLoggedIn && this._renderOfflineSection()}
                            {this._renderDialogServerUrl()}
                            {this._renderDialogWorkspace()}
                            {this._renderDialogCleanCache()}
                            {this._renderDialogLanguages()}
                            <Toast
                                ref="_toastSettings"
                                positionValue={200}
                                style={{backgroundColor: Res.colors.lightColor, marginHorizontal: 24}}
                                textStyle={{color: "white", textAlign: "center"}}
                            />
                            {this._progressDialogClear()}
                            {this._renderDialogGetOffline()}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

/**
 * Fields required
 */
Settings.propTypes = {
    updateUrl: PropTypes.func.isRequired,
    updateWorkspace: PropTypes.func.isRequired
};

export default Settings;
