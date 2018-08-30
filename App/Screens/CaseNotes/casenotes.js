import React, {Component} from "react";
import {
    Text,
    TextInput,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Modal from "react-native-modal";
import Toast from "react-native-easy-toast";
import {CheckBox} from "react-native-elements";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";
import I18n from "../../I18n";
import Styles from "./styles";
import * as Res from "../../Assets/resources";
import ItemNote from "./ItemNote";

const {height} = Dimensions.get("window");

class CaseNotes extends Component {
    /**
     * Navigation option
     */
    static navigationOptions = ({navigation}) => ({
        title: I18n.t("title_activity_case_notes"),
        headerTintColor: Res.colors.white,
        headerStyle: {
            backgroundColor: Res.colors.mainColor
        },
        headerRight: (
            <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                    navigation.state.params.handlerModal(true);
                }}
            >
                <MaterialIcon name="add" style={{color: Res.colors.white, fontSize: 24}} />
            </TouchableOpacity>)
    });
    /**
     * Constructor
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            checked: false,
            isEmpty: false,
            isModalVisible: false,
            toastMessage: I18n.t("text_missing_activity_case_notes_add_case_dialog"),
            errorPermission: false,
            appUid: this.props.navigation.state.params.appUid,
            notes: [],
            valid: false,
            noteContent: "",
            refreshed: false,
            middleHeight: height / 2 - 50
        };
        this.changeLayout = this.changeLayout.bind(this);
    }

    /**
     * Gets list notes.
     */
    componentWillMount () {
        this._getListNotes();
    }

    /**
     * Pass toggleModal function to navigation params
     */
    componentDidMount () {
        this.props.navigation.setParams({
            handlerModal: this._toggleModal
        });
    }

    /**
     * Component will receive props
     */
    componentWillReceiveProps (nextProps) {
        try {
            if (Object.prototype.hasOwnProperty.call(nextProps.caseNotes, "status") &&
                nextProps.caseNotes.status === "ok" &&
                !this.state.refreshed) {
                this.setState({refreshed: true});
                this._getListNotes();
            } else if (Object.prototype.hasOwnProperty.call(nextProps.caseNotes, "error") &&
                nextProps.caseNotes.error &&
                nextProps.caseNotes.error.error_description &&
                this.state.errorPermission) {
                this.refs._toastCaseNotesPost.show(nextProps.caseNotes.error.error_description, 4000);
            }
            if (Object.prototype.hasOwnProperty.call(nextProps.caseNotes, "notes") &&
                nextProps.caseNotes.notes.length && !this.state.dataRequested) {
                this.setState({dataRequested: true});
                this._getUsersInfo(nextProps.caseNotes.notes);
            }
            if (Object.prototype.hasOwnProperty.call(nextProps, "users") &&
                nextProps.users.length) {
                this.mergeData(nextProps.caseNotes);
            }
        // eslint-disable-next-line no-empty
        } catch (error) {
        }
    }

    /**
     * Gets userIds
     * @param data
     * @returns {Array}
     */
    getUserIds (data) {
        let ids = [];
        data.forEach((item) => {
            ids.push(item.user.userId);
        });
        return _.uniq(ids);
    }

    /**
     * Merges userPhoto props to dataList
     * @param data
     */
    mergeData (data) {
        let i,
            j,
            dataMerged = data.notes,
            cbUser = function (user) {
                return user.userId === dataMerged[i].user.userId;
            };
        for (i = 0; i < dataMerged.length; i += 1) {
            j = _.findIndex(data.users, cbUser);
            dataMerged[i].userPhoto = data.users[j].userPhoto;
        }
        this.setState({notes: dataMerged, isEmpty: dataMerged.length === 0});
    }

    /**
     * Gets usersInfo
     * @param data
     * @private
     */
    _getUsersInfo (data) {
        this.props.userInfoRequest({
            size: "1",
            user: {
                ids: this.getUserIds(data)
            }
        });
    }

    /**
     * Request list notes.
     * @private
     */
    _getListNotes () {
        this.props.requestCaseNotes({
            app_uid: this.state.appUid
        });
    }

    /**
     * Populate notes.
     * @param notes
     * @private
     */
    _populateNotes (notes) {
        this.setState({notes, isEmpty: (notes.length === 0)});
    }

    /**
     * Event before to cancel
     * @private
     */
    _onCancel () {
        this._toggleModal(false);
        this.setState({refreshed: false});
        this.restartModal();
    }

    /**
     * Event before to send
     * @private
     */
    _beforeToSend () {
        if (this.state.valid) {
            this._toggleModal(false);
            this.setState({refreshed: false});
        } else {
            this.refs._toastCaseNotes.show(this.state.toastMessage);
        }
        this.sendNote();
        this.restartModal();
    }

    /**
     * Validate and send new note.
     */
    sendNote = () => {
        if (this.state.valid) {
            this.setState({errorPermission: true});
            this.props.postCaseNote({
                app_uid: this.state.appUid,
                noteContent: this.state.noteContent,
                sendEmail: this.state.checked ? 1 : 0
            });
            this.setState({notes: [], isEmpty: false});
        } else {
            this.refs._toastCaseNotes.show(this.state.toastMessage, 5000);
        }
    };

    /**
     * Shows and hides dialog modal.
     * @private
     */
    _toggleModal = (state) => {
        this.setState({isModalVisible: state, checked: false});
    };

    /**
     * Restarts content modal
     */
    restartModal () {
        this.setState({noteContent: "", checked: false, valid: false});
    }

    /**
     * Updates validation when text content changes.
     * @param text
     * @private
     */
    _onChangeNote = (text) => {
        this.setState({valid: (text.trim().length > 0), noteContent: text});
    };

    /**
     * Gets new dimensions and sets middleHeight state
     */
    changeLayout () {
        this.setState({middleHeight: Dimensions.get("window").height / 2 - 50});
    }

    /**
     * Renders empty view
     * @returns {*}
     */
    emptyList () {
        return (
            <View
                style={{
                    flex: 1, justifyContent: "center", alignItems: "center", paddingTop: this.state.middleHeight
                }}
                onLayout={this.changeLayout}
            >
                <Text style={{color: "white", fontWeight: "bold"}}>{I18n.t("case_notes_no_data")}</Text>
            </View>
        );
    }

    renderList () {
        return (
            <FlatList
                data={this.state.notes}
                renderItem={({item}) => <ItemNote data={item} />}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={this.emptyList()}
            />
        );
    }

    /**
     * Renders screen
     * @returns {*}
     */
    render () {
        return (
            <View style={Styles.mainContainer} onLayout={this._changeLayout}>
                {this.renderList()}
                <Modal backdropOpacity={0.6} isVisible={this.state.isModalVisible}>
                    <View style={{
                        flex: 1,
                        flexDirection: "column",
                        borderRadius: 3,
                        backgroundColor: "white"
                    }}
                    >
                        <View style={{height: 48, backgroundColor: Res.colors.lightColor}} />
                        <View style={{flex: 1, padding: 16}}>
                            <TextInput
                                style={{
                                    flex: 1,
                                    backgroundColor: "white",
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    textAlignVertical: "top"
                                }}
                                onChangeText={this._onChangeNote}
                                multiline
                                placeholder={I18n.t("note_hint_activity_case_notes_route_case_dialog")}
                                underlineColorAndroid="transparent"
                            />
                            <CheckBox
                                center
                                containerStyle={{backgroundColor: "white", borderWidth: 0, padding: 0}}
                                title={I18n.t("note_send_mail_activity_case_notes_route_case_dialog")}
                                checked={this.state.checked}
                                checkedIcon="check-square"
                                checkedColor={Res.colors.successColor}
                                textStyle={{fontWeight: "normal"}}
                                onPress={() => {
                                    this.setState({checked: !this.state.checked});
                                }}
                            />
                        </View>
                        <View style={{height: 48, justifyContent: "flex-end", flexDirection: "row"}}>
                            <View style={{width: "50%"}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._onCancel();
                                    }}
                                    style={{
                                        flex: 1,
                                        backgroundColor: Res.colors.dangerColor,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text
                                        style={{color: "white"}}
                                    >{I18n.t("cancel_activity_case_notes_route_case_dialog").toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: "50%"}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._beforeToSend();
                                    }}
                                    style={{
                                        flex: 1,
                                        backgroundColor: Res.colors.successColor,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text
                                        style={{color: "white"}}
                                    >{I18n.t("post_activity_case_notes_route_case_dialog").toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Toast
                        ref="_toastCaseNotes"
                        style={{backgroundColor: Res.colors.lightColor}}
                        textStyle={{color: "white", textAlign: "center"}}
                    />
                </Modal>
                <Toast
                    ref="_toastCaseNotesPost"
                    position="bottom"
                    positionValue={150}
                    style={{backgroundColor: Res.colors.lightColor, marginHorizontal: 16}}
                    textStyle={{color: "white", textAlign: "center"}}
                />
            </View>
        );
    }
}

export default CaseNotes;
