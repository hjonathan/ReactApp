import React, {Component} from "react";
import {View, Text, Picker} from "react-native";
import I18n from "../../I18n";
import Styles from "./styles";

/**
 * Class ItemRoute
 * Example:
 * import ManualAssignment from '../ManualAssignment';
 * render() {
 *      return(
 *          <ManualAssignment data={object}/>
 *      ),
 * }
 */
class ManualAssignment extends Component {
    /**
     * Constructor ItemList
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            data: (props && props.data) || [],
            items: [],
            itemValue: 0
        };
        this.onValueChange = this.onValueChange.bind(this);
    }

    /**
     * Component will be mounted.
     */
    componentWillMount () {
        const serviceItems = this.state.data.users.map((s, i) => {
            let {taskId} = this.state.data,
                itemValue = `${taskId}/${s.userId}`;
            if (i === 0) {
                this.props.addUserId({[taskId]: s.userId});
                this.setState({itemValue});
            }
            return (
                <Picker.Item key={s.userId} value={itemValue} label={s.userFullName} />
            );
        });
        this.setState({items: serviceItems});
    }

    /**
     * Change with select value in state
     * @param itemValue
     * @param itemIndex
     */
    onValueChange (itemValue, itemIndex) {
        let taskId,
            userId;
        [taskId, userId] = itemValue.split("/");
        this.setState({itemValue});
        this.props.addUserId({[taskId]: userId});
    }

    /**
     * Render
     * @returns {*}
     */
    render () {
        return (
            <View style={Styles.mainContainer} elevation={3}>
                <Text style={Styles.text}>
                    {I18n.t("task_name_label_user_route_screen")}{" "}
                    {this.state.data.taskName}
                </Text>
                <View style={Styles.firstSection}>
                    <View>
                        <Picker
                            selectedValue={this.state.itemValue}
                            onValueChange={this.onValueChange}
                        >
                            {this.state.items}
                        </Picker>
                    </View>
                </View>
                <View style={Styles.dividerLine} />
            </View>
        );
    }
}

export default ManualAssignment;
