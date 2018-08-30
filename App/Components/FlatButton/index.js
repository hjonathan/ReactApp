import React, {Component} from "react";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Styles from "./styles";

/**
 * Class FlatButton
 * Example:
 *
 * import FlatButton from '../FlatButton';
 * render() {
 *      return (
 *          <FlatButton
 *              params={{radius: 4, border: 1, color: '#fff'}}
 *              onPress={() => {}}
 *              title="Title test"
 *          />
 *      );
 * }
 */
export default class Button extends Component {
    /**
     * Constructor FlatButton
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            title: (props && props.title) || "test"
        };
    }

    /**
     * Returns custom button
     * @param params
     * @returns {*}
     */
    renderCustomButton (params) {
        return (
            <View style={{
                borderRadius: params.radius,
                borderWidth: params.border,
                borderColor: params.color,
                alignItems: "center",
                paddingHorizontal: 50,
                paddingVertical: 10
            }}
            >
                <Text style={{color: params.color, fontWeight: "bold"}}>
                    {this.state.title}
                </Text>
            </View>
        );
    }

    /**
     * Returns default button
     * @returns {*}
     */
    renderDefaultButton () {
        return (
            <View style={Styles.button}>
                <Text style={Styles.text}>
                    {this.state.title}
                </Text>
            </View>
        );
    }

    /**
     * Renders Component
     * @param onPress
     * @returns {*}
     */
    render ({onPress} = this.props) {
        return (
            <TouchableOpacity onPress={onPress}>
                {
                    (Object.prototype.hasOwnProperty.call(this.props, "params") && this.props.params)
                        ? this.renderCustomButton(this.props.params) : this.renderDefaultButton()
                }
            </TouchableOpacity>
        );
    }
}
