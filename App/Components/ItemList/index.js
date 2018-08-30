import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {NavigationActions} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import CardView from "../Card";
import * as Res from "../../Assets/resources";
import Styles from "./styles";
import I18n from "../../I18n";
import actions from "../../Actions";
import Utils from "../../Utils";
import Task from "../../Model/Task";
import {CASE, DATETIME} from "../../Libs/Const";

/**
 * Class ItemList
 * Example:
 * import ItemList from '../ItemList';
 * render() {
 *      return(
 *          <ItemList data={object}/>
 *      ),
 * }
 */
class ItemList extends Component {
    /**
     * Constructor ItemList
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            data: (props && props.data) || {
                caseNumber: 0,
                caseTitle: "",
                dueDate: "1995-12-25",
                process: {
                    name: ""
                },
                task: {
                    name: ""
                },
                prevUser: {
                    fullName: "",
                    firstName: "",
                    lastName: ""
                },
                currentUser: {
                    fullName: "",
                    firstName: "",
                    lastName: ""
                },
                userPhoto: ""
            },
            status: "ON TIME",
            progress: "",
            loaded: false
        };
        this._onLoadImage = this._onLoadImage.bind(this);
    }

    /**
     * Component will receive props
     */
    componentWillReceiveProps (nextProps) {
        this.setState({
            disableItemList: nextProps.parent.disableItemList
        });
    }

    /**
     * Get the calculated status | 'ontime'|  'atrisk'| 'overdue';
     * @param {*} params
     */
    getStatus (params) {
        let status;
        if (params.dueDateFormated.getTime() < params.now.getTime()) {
            status = "overdue";
        } else if (params.sentDateFormated.getTime() > params.now.getTime()) {
            status = "ontime";
        } else {
            status = "atrisk";
        }
        return status;
    }

    /**
     * Routes to cases notes screen
     */
    goToCaseNotes = () => {
        const routeToScreen = NavigationActions.navigate({
            routeName: "CaseNotes",
            params: {
                appUid: this.props.data.caseId
            }
        });
        this.props.parent.navigation.dispatch(routeToScreen);
    };

    /**
     * Routes to case's history
     */
    goToHistory () {
        const routeToScreen = NavigationActions.navigate({
            routeName: "History",
            params: {
                appUid: this.props.data.caseId
            }
        });
        this.props.parent.navigation.dispatch(routeToScreen);
    }

    /**
     * Routes to case information
     */
    goToCaseInformation () {
        if (!this.props.isConnected) {
            Utils.showToast({message: I18n.t("you_need_Internet_connection_to_access_this_case")});
            return;
        }
        const routeToScreen = NavigationActions.navigate({
            routeName: "CaseInformation",
            params: {
                caseId: this.state.data.caseId,
                type: this.props.parent.navigation.state.routeName
            }
        });
        this.props.parent.navigation.dispatch(routeToScreen);
    }

    /**
     * Routes to formRender through its typeList
     * @param typeList (inbox, draft, participated and unassigned)
     */
    goToFormRender (typeList) {
        let task = Task.getTask(this.state.data.task.taskId);
        if (!this.props.isConnected && task.offlineEnabled === "FALSE") {
            Utils.showToast({message: I18n.t("you_need_Internet_connection_to_access_this_case")});
            return;
        }
        this.setState({
            disableItemList: true
        });
        this.props.parent.navigation.dispatch(actions.formRender.openCase({
            app_uid: this.state.data.caseId,
            prj_uid: this.state.data.process.processId,
            act_uid: this.state.data.task.taskId,
            del_index: this.state.data.delIndex,
            dyn_uid: "",
            caseNumber: this.state.data.caseNumber,
            caseTitle: this.state.data.caseTitle,
            typeList
        }));
    }

    /**
     * Routes to view formRender or case information
     */
    goToView () {
        switch (this.props.parent.list) {
            case CASE.INBOX:
            case CASE.DRAFT:
                this.goToFormRender(this.props.parent.list);
                break;
            case CASE.PARTICIPATED:
            case CASE.UNASSIGNED:
                this.goToCaseInformation();
                break;
            default:
                break;
        }
    }

    /**
     * Status setting map
     */
    statusSettingMap = {
        overdue: {
            color: Res.colors.dangerColor,
            textStatus: I18n.t("lists_activity_due_date_overdue")
        },
        atrisk: {
            color: Res.colors.warningColor,
            textStatus: I18n.t("lists_activity_due_date_at_risk")
        },
        ontime: {
            color: Res.colors.successColor,
            textStatus: I18n.t("lists_activity_due_date_on_time")
        }
    };

    /**
     * Executes when even load was finished
     * @private
     */
    _onLoadImage = () => {
        this.setState({loaded: true});
    };

    /**
     * Gets First letter of first name
     * @returns {string}
     * @private
     */
    _getCapitalLetter () {
        let FirstName = "";
        const index = 0;
        if (Object.prototype.hasOwnProperty.call(this.state.data, "prevUser")) {
            FirstName = this.state.data.prevUser.firstName;
        } else if (Object.prototype.hasOwnProperty.call(this.state.data, "currentUser")) {
            FirstName = this.state.data.currentUser.firstName;
        }
        return FirstName.charAt(index).toUpperCase();
    }

    /**
     * Renders username
     * @returns {*}
     */
    renderUserName () {
        let fullName;
        if (Object.prototype.hasOwnProperty.call(this.state.data, "prevUser")) {
            fullName = `${this.state.data.prevUser.firstName} ${this.state.data.prevUser.lastName}`;
        } else if (Object.prototype.hasOwnProperty.call(this.state.data, "currentUser")) {
            fullName = `${this.state.data.currentUser.firstName} ${this.state.data.currentUser.lastName}`;
        }
        return (
            <Text style={Styles.userName}>{fullName}</Text>
        );
    }

    /**
     * Renders avatar
     * @returns {*}
     */
    renderImageAvatar () {
        let textDisplay,
            imageDisplay;
        if (this.state.loaded) {
            textDisplay = "none";
            imageDisplay = "flex";
        } else {
            textDisplay = "flex";
            imageDisplay = "none";
        }
        return (
            <View style={[Styles.circleImageContainer]}>
                <Image
                    onLoad={this._onLoadImage}
                    source={{uri: `data:image/gif;base64,${this.state.data.userPhoto}`}}
                    style={[Styles.circleImage, {display: imageDisplay}]}
                />
                <Text style={{color: "white", display: textDisplay}}>{this._getCapitalLetter()}</Text>
            </View>
        );
    }

    /**
     * Renders avatar
     * @returns {*}
     */
    renderCaseRunOptions (type) {
        let textDisplay = "",
            icoDisplay = "",
            colorDisplay = "";
        switch (type) {
            case CASE.STATUS.OFFLINE:
                textDisplay = I18n.t("saved_on_Draft_new_activity_string");
                icoDisplay = "check-circle-o";
                colorDisplay = Res.colors.successColor;
                break;
            case CASE.STATUS.WORKING:
                textDisplay = I18n.t("activity_lists_label_case_has_work_in_progress");
                icoDisplay = "tasks";
                colorDisplay = Res.colors.lightColor;
                break;
            case CASE.STATUS.SENDING:
                textDisplay = I18n.t("activity_lists_label_case_is_sending");
                icoDisplay = "spinner";
                colorDisplay = Res.colors.lightColor;
                break;
            default:
                textDisplay = I18n.t("saved_on_Draft_new_activity_string");
                icoDisplay = "check-circle";
                colorDisplay = Res.colors.successColor;
                break;
        }
        return (
            <View style={Styles.availableOffline}>
                <Icon name={icoDisplay} style={{color: colorDisplay, fontSize: 24}} />
                <Text style={[Styles.textOffline, {color: colorDisplay}]}>
                    {textDisplay}
                </Text>
            </View>
        );
    }

    /**
     * Renders
     * @returns {*}
     */
    render () {
        let value,
            statusValue = this.getStatus({
                dueDateFormated: new Date(this.state.data.dueDate),
                sentDateFormated: new Date(this.state.data.delRiskDate
                    ? this.state.data.delRiskDate
                    : this.state.data.delegateDate),
                now: new Date()
            });
        if (!this.state.data.status || this.state.data.status === "none") {
            value = "none";
        }
        return (
            <TouchableOpacity onPress={() => this.goToView()} disabled={this.state.disableItemList}>
                <CardView>
                    <View style={Styles.mainContainer}>
                        <View style={Styles.firstSection}>
                            <View style={{width: "80%"}}>
                                <Text numberOfLines={1} style={Styles.processName}>
                                    {this.state.data.caseTitle}
                                </Text>
                                <Text numberOfLines={1} style={Styles.taskDetail}>
                                    {this.state.data.process.name} - {this.state.data.task.name}
                                </Text>
                                <Text numberOfLines={1} style={Styles.dateDetail}>
                                    {I18n.t("sent_on")}{moment(this.state.data.dueDate).format(DATETIME.LOCAL)}
                                </Text>
                            </View>
                            <View style={{width: "20%", alignItems: "flex-end"}}>
                                <Text style={Styles.caseNumber}>{this.state.data.caseNumber}</Text>
                            </View>
                        </View>
                        <View style={Styles.secondSection}>
                            <View style={Styles.controlGroup}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    {this.renderImageAvatar()}
                                    {this.renderUserName()}
                                </View>
                                <View style={Styles.controls}>
                                    <View
                                        style={[Styles.statusSection, {backgroundColor: this.statusSettingMap[statusValue].color}]}
                                    >
                                        <Text style={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            fontSize: 16
                                        }}
                                        >{this.statusSettingMap[statusValue].textStatus}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[Styles.controlGroup, {paddingTop: 2}]}>
                                <View style={{alignItems: "center", display: value}}>
                                    {this.renderCaseRunOptions(this.state.data.status)}
                                </View>
                                <View style={Styles.controls}>
                                    <TouchableOpacity onPress={() => {
                                        this.goToHistory();
                                    }}
                                    >
                                        <Icon name="history" size={30} color="#000" style={{paddingLeft: 4}} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.goToCaseNotes();
                                    }}
                                    >
                                        <Icon name="sticky-note-o" size={30} color="#000" style={{paddingLeft: 4}} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                </CardView>
            </TouchableOpacity>
        );
    }
}

export default ItemList;
