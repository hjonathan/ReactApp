import React, {Component} from "react";
import {
    Text,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import Styles from "./styles";
import * as Res from "../../Assets/resources";

/**
 * Class GoogleSignInButton
 * Example:
 *
 * import GoogleSignInButton from '../GoogleSignInButton';
 * render() {
 *      return (
 *          <GoogleSignInButton
 *              onPress={() => {}}
 *              title="Title test"
 *          />
 *      );
 * }
 */
export default class Button extends Component {
    /**
     * Constructor GoogleSignInButton
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            title: (props && props.title) || "test",
            icon: Res.images.googleSignInIcon,
            params: (props && props.params) || {
                color: "red"
            }
        };
    }

    /**
     * Returns custom button adding the next elements:
     * 1. Google standard icons acoording to it's styleguide.
     * 2. Google standard label to sign in.
     * @param params
     * @returns {*}
     */
    renderCustomButton (params) {
        return (
            <View style={Styles.container}>
                <View style={Styles.customButton}>
                    <Image
                        source={this.state.icon}
                        style={Styles.icon}
                    />
                    <Text style={[Styles.label, {color: this.state.params.color}]}>
                        {this.state.title}
                    </Text>
                </View>
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
