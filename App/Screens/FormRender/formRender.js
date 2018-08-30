import React, {Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    I18nManager
} from "react-native";
import PropTypes from "prop-types";
import {NavigationActions, StackActions} from "react-navigation";
import Modal from "react-native-modal";
import {ProgressDialog} from "react-native-simple-dialogs";
import Toast from "react-native-easy-toast";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import MapViewer from "../../Components/MapView";
import Audio from "../../Components/Audio";
import ContextMenu from "../../Components/ContextMenu";
import Utils from "../../Utils";
import * as Res from "../../Assets/resources";
import Styles from "./styles";
import I18n from "../../I18n";
import ItemAssignment from "../../Components/ItemAssignment";
import ManualAssignment from "../../Components/ManualAssignment";
import Signature from "../../Components/Signature";
import WebForms from "../../Components/WebForm";
import Actions from "../../Actions";

let that = null;
/**
 * Class FormRender
 */
class FormRender extends Component {
    /**
     * Navigation option
     */
    static navigationOptions = ({navigation}) => {
        const {payload} = navigation.state.params;
        return {
            title: (payload.caseNumber && payload.caseTitle)
                ? `${payload.caseNumber} : ${payload.caseTitle}`
                : payload.initTitle || "",
            headerTintColor: Res.colors.white,
            headerStyle: {
                backgroundColor: Res.colors.mainColor
            },
            headerLeft: (
                <TouchableOpacity
                    onPress={() => navigation.dispatch(Actions.formRender.backButtonPressed())}
                    style={{padding: 16}}
                >
                    {
                        I18nManager.isRTL
                            ? <MaterialIcon name="arrow-forward" style={{color: Res.colors.white, fontSize: 24}} />
                            : <MaterialIcon name="arrow-back" style={{color: Res.colors.white, fontSize: 24}} />
                    }
                </TouchableOpacity>)
        };
    };
    /**
     * Constructor
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = Object.assign({}, props.navigation.state.params.payload, {
            modalMap: false,
            modalSettings: false,
            modalDerivation: false,
            modalTitle: "",
            webView: null,
            users: {},
            currentPosition: null,
            controlInfo: null
        });
        this.spreadWebView = this.spreadWebView.bind(this);
    }

    /**
     * Initializes props
     */
    componentDidMount () {
        that = this;
    }

    /**
     * Component will receive nextProps
     */
    componentWillReceiveProps (nextProps) {
        const {
            isRouted,
            requestMap,
            errorNextStep,
            errorAssignment,
            errorData
        } = nextProps;

        if (isRouted !== this.props.isRouted && isRouted) {
            if (nextProps.assignment) {
                this._setModal(nextProps.assignment);
            } else {
                this.state.webView.injectJavaScript(Utils.injectHideMaskLoading());
                this.refs.toastError.show(nextProps.errorAssignment.error_description, 2000);
            }
        }
        if (requestMap && requestMap.status && !this.state.modalMap) {
            this.validateGPS(requestMap);
        }
        if (errorNextStep !== this.props.errorNextStep && errorNextStep) {
            this.refs.toastError.show(nextProps.errorNextStep.error_description);
            this.state.webView.injectJavaScript(Utils.injectHideMaskLoading());
        }
        if (errorAssignment !== this.props.errorAssignment && errorAssignment) {
            this.refs.toastError.show(nextProps.errorAssignment.error_description, 2000);
            this.state.webView.injectJavaScript(Utils.injectHideMaskLoading());
        }
        if (errorData !== this.props.errorData && errorData) {
            this.refs.toastError.show(nextProps.errorData.error_description, 2000);
            this.state.webView.injectJavaScript(Utils.injectHideMaskLoading());
        }
    }

    /**
     * get which data to use in form
     * @param isUse
     */
    getWhichDataToUse = (isUse) => {
        this.props.changeDataAvailable(false);
        this.state.webView.injectJavaScript(Utils.injectGetWhichDataToUse(isUse));
    };

    /**
     * Sets location
     * @param coordinates
     */
    setLocation (coordinates) {
        if (coordinates && coordinates.latitude && coordinates.longitude) {
            this.props.setLocation(Object.assign({}, coordinates, {
                idField: this.state.idField,
                caseIdTmp: this.state.app_uid,
                delIndex: this.state.del_index
            }));
        }
    }

    /**
     * Validates if the GPS is enabled
     * @param requestMap
     */
    validateGPS (requestMap) {
        Utils.getStatusGPS((status) => {
            if (status) {
                this.setState({
                    modalMap: requestMap.status,
                    idField: requestMap.idField
                });
            } else {
                this.setState({
                    modalSettings: true
                });
            }
        });
    }

    /**
     * Opens location settings
     */
    openSettings () {
        Utils.openLocationSettings((status) => {
            if (status) {
                this.setState({
                    modalSettings: !status
                });
            }
        });
    }

    /**
     * Hides map modal
     */
    closeMapViewModal () {
        this.setState({modalMap: false});
        this.props.navigation.dispatch(Actions.formRender.openMap({
            status: false,
            idField: null
        }));
    }

    /**
     * Closes settings modal
     */
    closeSettingsModal () {
        this.setState({modalSettings: false});
    }

    /**
     * Close modal handler
     */
    closeDerivationModal () {
        this.setState({modalDerivation: false});
        // reset the routeCase flaw to be available to route again.
        this.props.changeRouted(false);
        // inject to JS the hider loading mask method.
        this.state.webView.injectJavaScript(Utils.injectHideMaskLoading());
    }

    /**
     * Set modal
     * @param assignment
     * @private
     */
    _setModal (assignment) {
        this.setState({
            modalDerivation: true,
            modalTitle: assignment[0] && assignment[0].routeFinishFlag
                ? I18n.t("title_user_route_screen_end_of_process")
                : I18n.t("fragment_route_user_asignment_title")
        });
    }

    /**
     * Routes the case
     */
    route () {
        // close the modal.
        this.closeDerivationModal();
        // need request the Route service
        let tasks = [];
        this.props.assignment.map((item) => {
            tasks.push({
                TAS_UID: item.taskId,
                USR_UID: this.props.routeUsers[item.taskId],
                TAS_ASSIGN_TYPE: item.taskAssignType,
                TAS_DEF_PROC_CODE: item.taskDefProcCode,
                DEL_PRIORITY: item.delPriority,
                TAS_PARENT: item.taskParent,
                SOURCE_UID: item.sourceUid
            });
            return;
        });
        this.props.requestRoute({
            app_uid: this.state.app_uid,
            TAS_UID: this.state.act_uid,
            del_index: this.state.del_index,
            tasks
        });
        this.props.clearFormRender();
        // need to redirect to inbox after the route finishes.
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: this.props.routeName,
                params: {userData: this.props.navigation.state.params.state.User}
            })]
        }));
        // force to refresh the inbox list.
        this.props.navigation.dispatch(Actions.cases.forceRefresh({forceRefresh: true}));
    }

    /**
     * Set webView of children WebForm
     * @param webViewChild
     */
    spreadWebView = (webViewChild) => {
        this.setState({webView: webViewChild});
    };

    /**
     * Renders working dialog
     * @returns {*}
     */
    workingDialog () {
        const {working} = this.props;
        if (working) {
            return (
                <ProgressDialog
                    visible={working}
                    title={I18n.t("login_dialog_loading_title")}
                    message={I18n.t("login_dialog_loading_title")}
                />
            );
        }
        return null;
    }

    /**
     * Renders messages loading and empty list.
     * @returns {*}
     */
    renderList () {
        if (!this.state.isEmpty) {
            return (
                <FlatList
                    data={this.props.assignment}
                    renderItem={({item}) => {
                        if (item.taskAssignType === "MANUAL") {
                            return (
                                <ManualAssignment
                                    data={item}
                                    addUserId={this.props.addUserId}
                                />
                            );
                        }
                        return (
                            <ItemAssignment
                                data={item}
                                addUserId={this.props.addUserId}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            );
        }
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}
            >
                <Text style={{color: "white", fontWeight: "bold"}}>
                    {I18n.t("loading_text")}
                </Text>
            </View>
        );
    }

    /**
     * Renders viewMap modal
     * @returns {*}
     */
    renderMapViewModal () {
        if (this.state.modalMap) {
            return (
                <Modal isVisible={this.state.modalMap} backdropOpacity={0.6}>
                    <View style={{flex: 1, flexDirection: "column"}}>
                        <View style={Styles.headerMap}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.closeMapViewModal();
                                        let coordinates = that.refs.viewMap.getLastPosition();
                                        this.setLocation(coordinates);
                                    }}
                                >
                                    <MaterialIcon name="done" style={Styles.iconMap} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{fontWeight: "bold", color: Res.colors.white}}>
                                    {I18n.t("selectLocationDialogtitle")}
                                </Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.closeMapViewModal();
                                    }}
                                >
                                    <MaterialIcon name="clear" style={Styles.iconMap} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <MapViewer ref="viewMap" />
                    </View>
                </Modal>
            );
        }
        return null;
    }

    /**
     * Renders settings modal
     * @returns {*}
     */
    renderSettingsModal () {
        if (this.state.modalSettings) {
            return (
                <Modal isVisible={this.state.modalSettings} backdropOpacity={0.6}>
                    <View style={Styles.settingsContainer}>
                        <View style={Styles.settingsSubContainer}>
                            <View style={Styles.settingsHeader}>
                                <Text style={{color: Res.colors.white, fontSize: 18}}>{I18n.t("app_name")}</Text>
                            </View>
                            <View style={Styles.settingsBody}>
                                <Text>{I18n.t("map_no_location_enabled")}</Text>
                            </View>
                            <View style={Styles.settingsFooter}>
                                <View style={{width: "50%"}}>
                                    <TouchableOpacity
                                        style={Styles.cancelButton}
                                        onPress={() => {
                                            this.closeSettingsModal();
                                        }}
                                    >
                                        <Text style={{color: "white"}}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: "50%"}}>
                                    <TouchableOpacity
                                        style={Styles.successButton}
                                        onPress={() => {
                                            this.openSettings();
                                        }}
                                    >
                                        <Text style={{color: "white"}}>{I18n.t("action_settings")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        }
        return null;
    }

    /**
     * Render Modal view
     * @returns {*}
     */
    renderDerivationModal () {
        return (
            <Modal
                isVisible={this.state.modalDerivation}
                backdropOpacity={0.6}
                backdropType="blur"
            >
                <View style={Styles.modalContainer}>
                    <View style={Styles.innerContainer}>
                        <View style={Styles.modalTitle}>
                            <Text style={Styles.routeTitle}>
                                {this.state.modalTitle}
                            </Text>
                        </View>
                        <View style={{padding: 16}}>
                            {this.renderList()}
                        </View>
                        <View style={Styles.modalFooter}>
                            <View style={Styles.buttonContainer}>
                                <TouchableOpacity
                                    style={Styles.cancelButton}
                                    onPress={() => {
                                        this.closeDerivationModal();
                                    }}
                                >
                                    <Text style={{color: "white"}}>
                                        {I18n.t("cancel_activity_case_notes_route_case_dialog").toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.buttonContainer}>
                                <TouchableOpacity
                                    style={Styles.successButton}
                                    onPress={() => {
                                        this.route();
                                    }}
                                >
                                    <Text style={{color: "white"}}>
                                        {I18n.t("continue_label_user_route_screen").toUpperCase()}
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
     * Render Modal view fro data available
     * @returns {*}
     */
    renderModalDataAvailable () {
        return (
            <Modal isVisible={this.props.dataAvailable} backdropOpacity={0.6}>
                <View style={Styles.modalContainer}>
                    <View style={Styles.innerContainer}>
                        <View style={Styles.modalTitle}>
                            <Text style={Styles.routeTitle}>
                                {I18n.t("dialog_chose_data_title")}
                            </Text>
                        </View>
                        <View style={{padding: 16}}>
                            <Text>
                                {I18n.t("dialog_chose_data_description")}
                            </Text>
                        </View>
                        <View style={Styles.modalFooter}>
                            <View style={Styles.buttonContainer}>
                                <TouchableOpacity
                                    style={Styles.cancelButton}
                                    onPress={() => {
                                        this.getWhichDataToUse("0");
                                    }}
                                >
                                    <Text
                                        style={{color: "white"}}
                                    >{I18n.t("dialog_generic_no")}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.buttonContainer}>
                                <TouchableOpacity
                                    style={Styles.successButton}
                                    onPress={() => {
                                        this.getWhichDataToUse("1");
                                    }}
                                >
                                    <Text
                                        style={{color: "white"}}
                                    >{I18n.t("dialog_generic_yes")}
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
     * Render Modal view for signature control
     * @returns {*}
     */
    renderModalSignature () {
        const {showSignature} = this.props;
        return (
            <Modal isVisible={showSignature} backdropOpacity={0.6}>
                <Signature {...this.props} />
            </Modal>
        );
    }

    /**
     * Renders ContextMenu modal
     * @returns {*}
     */
    renderAudioMenuModal () {
        const {showAudioMenu} = this.props;
        if (showAudioMenu) {
            return (
                <Modal isVisible={showAudioMenu} backdropOpacity={0.6}>
                    <ContextMenu
                        type="audio"
                        onClose={this.props.changeAudioMenu}
                        takeOne={this.props.changeAudioControls}
                        selectFile={this.props.selectAudio}
                    />
                </Modal>
            );
        }
        return null;
    }

    /**
     * Renders audio control panel modal
     * @returns {*}
     */
    renderAudioModal () {
        const {showAudioPanel} = this.props;
        if (showAudioPanel) {
            return (
                <Modal isVisible={showAudioPanel} backdropOpacity={0}>
                    <Audio
                        onClose={this.props.changeAudioControls}
                        saveAudio={this.props.selectAudio}
                    />
                </Modal>
            );
        }
        return null;
    }

    /**
     * Render Modal for download file
     * @returns {*}
     */
    renderModalDownload () {
        const {fileDownload, showDownload, progressDownload} = this.props;
        return (
            <Modal isVisible={showDownload} backdropOpacity={0.6}>
                <View style={Styles.progressContainer}>
                    <View style={Styles.icon}>
                        <FontAwesomeIcon name="download" style={{color: Res.colors.gray, fontSize: 64}} />
                    </View>
                    <View style={Styles.progressText}>
                        <Text style={{paddingBottom: 5, paddingTop: 5}}>
                            {fileDownload.name}
                        </Text>
                        <ProgressBarAnimated
                            width={150}
                            value={progressDownload}
                            backgroundColorOnComplete="#6CC644"
                        />
                        <Text style={{paddingBottom: 5, paddingTop: 5}}>
                            {progressDownload}
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
    /**
     * Renders webForm
     * @returns {*}
     */
    render () {
        return (
            <View style={{flex: 1}}>
                <WebForms
                    payload={this.props.navigation.state.params.payload}
                    state={this.props.navigation.state.params.state}
                    spreadWebView={this.spreadWebView}
                />
                {this.renderMapViewModal()}
                {this.renderSettingsModal()}
                {this.state.modalDerivation && this.renderDerivationModal()}
                {this.props.dataAvailable && this.renderModalDataAvailable()}
                {this.props.showSignature && this.renderModalSignature()}
                {this.renderAudioMenuModal()}
                {this.renderAudioModal()}
                {this.workingDialog()}
                {this.props.showDownload && this.renderModalDownload()}
                <Toast
                    ref="toastError"
                    position="bottom"
                    positionValue={150}
                    style={{
                        backgroundColor: Res.colors.lightColor,
                        marginHorizontal: 16
                    }}
                    textStyle={{
                        color: "white",
                        textAlign: "center"
                    }}
                />
            </View>
        );
    }
}

FormRender.propTypes = {
    requestRoute: PropTypes.func.isRequired
};

export default FormRender;
