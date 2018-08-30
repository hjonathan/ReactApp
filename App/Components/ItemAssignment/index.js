import React, {Component} from "react";
import {View, Text} from "react-native";
import I18n from "../../I18n";
import Styles from "./styles";

/**
 * Class ItemAssignment
 * Example:
 * import ItemList from '../ItemList';
 * render() {
 *      return(
 *          <ItemAssignment data={object}/>
 *      ),
 * }
 */
class ItemAssignment extends Component {
    /**
     * Constructor ItemAssignment
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            data: (props && props.data) || [],
            users: ""
        };
    }

    /**
     * Prepares the user  info, concats the array users
     */
    componentWillMount () {
        const that = this,
            // prepare the users info "A, B, C"
            users = Array.prototype.map.call(
                this.state.data.users,
                (item) => {
                    const {taskId} = that.state.data;
                    that.props.addUserId({[taskId]: item.userId});
                    return item.userFullName;
                }
            ).join(", ");
        this.setState({users});
    }

    /**
     * Render the user
     */
    render () {
        return (
            <View>
                <View style={Styles.firstSection}>
                    <View>
                        <Text style={Styles.text}>
                            {I18n.t("task_name_label_user_route_screen")} {this.state.data.taskName || I18n.t("title_user_route_screen_end_of_process")}
                        </Text>
                        <Text style={Styles.text}>
                            {I18n.t("next_user_label_users_route_screen")} {this.state.users}
                        </Text>
                    </View>
                </View>
                <View style={Styles.dividerLine} />
            </View>
        );
    }
}

export default ItemAssignment;
