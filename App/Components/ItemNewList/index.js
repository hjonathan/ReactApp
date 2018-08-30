import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Res from "../../Assets/resources";
import Styles from "./styles";
import actions from "../../Actions";
import I18n from "../../I18n";
import Utils from "../../Utils";

/**
 * Class ItemNewList
 * Example:
 * import ItemNewList from '../ItemNewList';
 * render() {
 *      return(
 *          <ItemNewList data={object}/>
 *      ),
 * }
 */
class ItemNewList extends Component {
    /**
     * Constructor ItemList
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            data: (props && props.data) || {
                autoRoot: "FALSE",
                forms: [{
                    description: "",
                    formId: "",
                    formUpdateDate: "2018-01-18T00:23:52+00:00",
                    index: 1,
                    stepCondition: "",
                    stepId: "",
                    stepMode: "",
                    stepPosition: 1,
                    stepUidObj: "",
                    title: "",
                    triggers: {before: false, after: false}
                }
                ],
                offlineEnabled: "",
                processId: "",
                taskId: "",
                text: ""
            },
            progress: "",
            disableItemList: false
        };
    }

    /**
     * Component will receive props
     */
    componentWillReceiveProps (nextProps) {
        // We compare nextProps.parent.disableItemList with this.props.parent.disableItemList
        // and if both are different then we perform some operation, setState method
        if (nextProps.parent.disableItemList !== this.props.parent.disableItemList) {
            // Perform some operation
            this.setState({
                disableItemList: nextProps.parent.disableItemList
            });
        }
    }

    /**
     * Routes to formRender
     */
    goToFormRender () {
        if (!this.props.isConnected && !this.state.data.taskOffline) {
            Utils.showToast({message: I18n.t("you_need_Internet_connection_to_access_this_case")});
            return;
        }

        this.setState({
            disableItemList: true
        });

        this.props.parent.navigation.dispatch(actions.formRender.newCase({
            prj_uid: this.state.data.processId,
            act_uid: this.state.data.taskId,
            initTitle: this.state.data.forms[0].title
        }));
    }

    /**
     * Renders mark available offline
     * @returns {*}
     */
    renderOffline () {
        return (
            <View style={Styles.availableOffline}>
                <Icon name="check-circle-o" style={{color: Res.colors.successColor, fontSize: 24}} />
                <Text style={Styles.textOffline}>
                    {I18n.t("saved_on_Draft_new_activity_string")}
                </Text>
            </View>
        );
    }

    /**
     * Render
     * @returns {*}
     */
    render () {
        return (
            <TouchableOpacity onPress={() => this.goToFormRender()} disabled={this.state.disableItemList}>
                <View style={Styles.mainTopContainer} elevation={3}>
                    <View style={Styles.mainContainer}>
                        <View style={Styles.iconSection}>
                            <Image source={Res.images.newCaseIcon} style={Styles.circleImage} />
                        </View>
                        <View style={Styles.textSection}>
                            <Text style={Styles.textNewCase}>
                                {this.state.data.text}
                            </Text>
                            {this.state.data.taskOffline && this.renderOffline()}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default ItemNewList;
