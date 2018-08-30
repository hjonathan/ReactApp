import React, {Component} from "react";
import {
    Text,
    View,
    Button,
    Image,
    ScrollView
} from "react-native";
import moment from "moment";
import PropTypes from "prop-types";
import Toast from "react-native-easy-toast";
import {ProgressDialog} from "react-native-simple-dialogs";
import I18n from "../../I18n";
import Styles from "./styles";
import * as Res from "../../Assets/resources";
import actions from "../../Actions";
import {CASE, DATETIME} from "../../Libs/Const";

/**
 * CaseInformation component class.
 */
class CaseInformation extends Component {
    /**
     * Navigation option
     */
    static navigationOptions = ({navigation}) => ({
        title: I18n.t("general_information"),
        headerTintColor: Res.colors.white,
        headerStyle: {
            backgroundColor: Res.colors.mainColor
        }
    });
    /**
     * Constructor
     * @param {*} props
     */
    constructor (props) {
        super(props);
        this.state = {
            promptTitle: "",
            case: null,
            task: null,
            toastMessage: null,
            loader: false
        };
    }

    /**
     * Initialize the state when the CaseInformation screen was mounted.
     */
    componentDidMount () {
        let typeListValue = this.props.navigation.state.params.type === CASE.INBOX ? CASE.PARTICIPATED : this.props.navigation.state.params.type.toLowerCase();
        this.props.caseInfoRequest({
            type: typeListValue,
            app_uid: this.props.navigation.state.params.caseId
        });
    }

    /**
    * Component will receive props
    */
    componentWillReceiveProps (nextProps) {
        this.setState({
            case: nextProps.info.case,
            task: nextProps.info.task,
            toastMessage: nextProps.error ? I18n.t("general_infomation_claim_case_failed") : null,
            loader: false
        });
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
     * Claim case Action
     */
    claimCaseFromCase = () => {
        this.setState({loader: true});
        this.props.caseClaimRequest({app_uid: this.props.navigation.state.params.caseId});
        this.props.navigation.dispatch(actions.formRender.openCase({
            app_uid: this.state.case.caseId,
            prj_uid: this.state.case.processId,
            act_uid: this.state.task.taskId,
            del_index: this.state.case.delIndex,
            dyn_uid: ""
        }));
    }

    /**
     * Validate the key from the server values to set the correct string
     * @param {*} value
     */
    parseValueCreator (value) {
        return (this.props.parseValueCreator(value));
    }

    /**
     * Render button Claim Case if it is needed based on kind of list.
     */
    renderClaimCaseButton (type) {
        if (type === CASE.UNASSIGNED) {
            return (
                <View>
                    <Button
                        color={Res.colors.successColor}
                        onPress={() => {
                            this.claimCaseFromCase();
                        }}
                        title={I18n.t("general_information_case_claim")}
                    />
                </View>
            );
        }
        return null;
    }

    /**
     * Render the case information component
     */
    render () {
        return (
            <View style={Styles.rootView}>
                <ScrollView contentContainerStyle={Styles.scrollStyle}>
                    <View style={{flex: 1}}>
                        <View style={Styles.mainContainer}>
                            <ProgressDialog
                                visible={this.state.loader}
                                title={I18n.t("login_dialog_loading_title")}
                                message={I18n.t("loading_text")}
                            />
                            <Toast
                                ref="toast"
                                style={Styles.styleToast}
                                textStyle={{color: "white", textAlign: "center"}}
                                position="center"
                            />
                            <View style={Styles.viewComponent}>
                                <Text style={Styles.textNumber}>{this.state.case && this.state.case.caseNumber}</Text>
                                <Text style={Styles.textTitle}>{this.state.case && this.state.case.caseTitle}</Text>
                                <View style={Styles.containerForDates}>
                                    <View style={Styles.containerHalfDates}>
                                        <Image style={Styles.imageStyles} source={Res.images.calendarIcon} />
                                        <View style={Styles.internalDateText}>
                                            <Text>{I18n.t("case_general_info_view_case_create_date")}</Text>
                                            <Text numberOfLines={2} style={Styles.marginTextDate} >{moment(this.state.case && this.state.case.caseCreateDate).format(DATETIME.LOCAL)}</Text>
                                        </View>
                                    </View>
                                    <View style={Styles.containerHalfDates}>
                                        <Image style={Styles.imageStyles} source={Res.images.lastUpdateIcon} />
                                        <View style={Styles.internalDateText}>
                                            <Text>{I18n.t("case_general_info_view_case_last_update")}</Text>
                                            <Text numberOfLines={2} style={Styles.marginTextDate}>{moment(this.state.case && this.state.case.caseUpdateData).format(DATETIME.LOCAL)}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={Styles.containerForCaseInfo}>
                                    <Text style={Styles.widthHalf}>{I18n.t("case_general_info_view_case_creator")}: {this.state.case && this.state.case.caseCreator}</Text>
                                    <Text style={Styles.textBold}>● {I18n.t("case_general_info_view_case_status")} {this.parseValueCreator(this.state.case && this.state.case.caseStatus)}</Text>
                                </View>
                                <View>
                                    <Text style={Styles.textGenericTitles}>{I18n.t("case_general_info_view_case_process")}</Text>
                                    <Text style={Styles.marginGeneric}>{this.state.case && this.state.case.processTitle}</Text>
                                    <Text style={Styles.textGenericTitles}>{I18n.t("case_general_info_view_case_uid")}</Text>
                                    <Text style={Styles.marginGeneric}>{this.state.case && this.state.case.caseId}</Text>
                                    <Text style={Styles.textGenericTitles}>{I18n.t("case_general_info_view_case_description")}</Text>
                                    <Text style={Styles.marginGeneric}>{this.state.case && this.state.case.caseDescription}</Text>
                                </View>
                            </View>
                            <View style={[Styles.viewComponent, {marginTop: 5}]}>
                                <View style={{borderBottomWidth: 1, borderBottomColor: "lightgray"}}>
                                    <Text style={Styles.textTaskTitle}>{I18n.t("case_general_info_view_task_secction_title")}</Text>
                                </View>
                                <View>
                                    <View style={Styles.flexTextDirection}>
                                        <Text style={Styles.textMarginLeft}>{I18n.t("case_general_info_view_task_task")}</Text>
                                        <Text style={Styles.textMargin}>{this.state.task && this.state.task.taskTitle}</Text>
                                    </View>
                                    <View style={Styles.flexTextDirection}>
                                        <Text style={Styles.textMarginLeft}>{I18n.t("case_general_info_view_task_current_user")}</Text>
                                        <Text style={Styles.textMargin}>{this.state.task && this.state.task.currentUser}</Text>
                                    </View>
                                    <View style={Styles.flexTextDirection}>
                                        <Text style={Styles.textMarginLeft}>{I18n.t("case_general_info_view_task_delegate_date")}</Text>
                                        <Text style={Styles.textMargin}>
                                            {moment(this.state.task && this.state.task.delDelegateDate).format(DATETIME.LOCAL)}
                                        </Text>
                                    </View>
                                    <View style={Styles.flexTextDirection}>
                                        <Text style={Styles.textMarginLeft}>{I18n.t("case_general_info_view_task_init_date")}</Text>
                                        <Text style={Styles.textMargin}>
                                            {moment(this.state.task && this.state.task.delInitDate).format(DATETIME.LOCAL)}
                                        </Text>
                                    </View>
                                    <View style={Styles.flexTextDirection}>
                                        <Text style={Styles.textMarginLeft}>{I18n.t("case_general_info_view_task_due_date")}</Text>
                                        <Text style={Styles.textMargin}>
                                            {moment(this.state.task && this.state.task.delDueDate).format(DATETIME.LOCAL)}
                                        </Text>
                                    </View>
                                    <View style={{backgroundColor: "lightgray"}}>
                                        <Text style={Styles.textBoxDate}>{I18n.t("case_general_info_view_task_not_finished_yet")}</Text>
                                    </View>
                                </View>
                            </View>
                            {this.renderClaimCaseButton(this.props.navigation.state.params.type)}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

/**
 * Defining the available method. to use go to "props" attribute
 */
CaseInformation.propTypes = {
    caseInfoRequest: PropTypes.func.isRequired,
    caseClaimRequest: PropTypes.func.isRequired,
    parseValueCreator: PropTypes.func.isRequired
};

export default CaseInformation;
