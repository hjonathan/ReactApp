import React, {Component} from "react";
import {
    Text,
    View,
    Image
} from "react-native";
import Moment from "moment";
import I18n from "react-native-i18n";
import Card from "../../Components/Card";
import Styles from "./styles";
import * as Res from "../../Assets/resources";
import {DATETIME} from "../../Libs/Const";

class ItemHistory extends Component {
    /**
     * Constructor ItemHistory
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = props.data || {
            taskName: "",
            flowStatus: "Done",
            userFullName: "",
            dueDate: "",
            userPhoto: ""
        };
        this._onLoadImage = this._onLoadImage.bind(this);
    }

    /**
     * Init status flow
     */
    componentWillMount () {
        this.formatStatusFlow();
    }

    /**
     * Executes when even load was finished
     * @private
     */
    _onLoadImage = () => {
        this.setState({loaded: true});
    };

    /**
     * Formats status flow
     */
    formatStatusFlow () {
        let status = this.state.flowStatus;
        switch (status) {
            case "DONE":
                status = I18n.t("history_activity_status_done");
                break;
            case "PAUSED":
                status = I18n.t("history_activity_status_paused");
                break;
            case "IN_PROGRESS":
                status = I18n.t("history_activity_status_inprogress");
                break;
            case "CANCELLED":
                status = I18n.t("history_activity_status_cancelled");
                break;
            case "ROUTED":
                status = I18n.t("history_activity_status_ruteado");
                break;
            default:
                status = I18n.t("history_activity_status_done");
        }
        this.setState({flowStatus: status});
    }

    /**
     * Gets First letter of first name
     * @returns {string}
     * @private
     */
    _getCapitalLetter () {
        const index = 0;
        let fullName = this.state.userFullName.split(" ").shift();
        return fullName.charAt(index).toUpperCase();
    }

    /**
     * Renders avatar
     * @returns {*}
     */
    renderImageAvatar () {
        let textDisplay,
            imageDisplay,
            backgroundColor;
        if (this.state.loaded) {
            textDisplay = "none";
            imageDisplay = "flex";
            backgroundColor = {};
        } else {
            textDisplay = "flex";
            imageDisplay = "none";
            backgroundColor = {backgroundColor: Res.colors.mainColor};
        }
        return (
            <View style={[Styles.imageSection, backgroundColor]}>
                <Image
                    onLoad={this._onLoadImage}
                    source={{uri: `data:image/gif;base64,${this.state.userPhoto}`}}
                    borderRadious={5}
                    style={[Styles.circleImage, {display: imageDisplay}]}
                />
                <Text style={{
                    color: "white",
                    fontSize: 25,
                    fontWeight: "bold",
                    display: textDisplay
                }}
                >{this._getCapitalLetter()}
                </Text>
            </View>
        );
    }

    /**
     * Renders item history
     * @returns {*}
     */
    render () {
        return (
            <Card>
                <View style={{flexDirection: "row", padding: 4, alignItems: "center"}}>
                    {this.renderImageAvatar()}
                    <View style={{paddingHorizontal: 4}}>
                        <Text style={{color: "#000", fontSize: 12}}>{this.state.taskName}</Text>
                        <Text style={{color: "#000"}}>{this.state.flowStatus}</Text>
                        <Text style={{color: "#000"}}>{this.state.userFullName}</Text>
                        <Text style={{color: "#000"}}>{Moment(this.state.dueDate).format(DATETIME.LOCAL)}</Text>
                    </View>
                </View>
            </Card>
        );
    }
}

export default ItemHistory;
