import React, {Component} from "react";
import {
    Text,
    View
} from "react-native";
import PropTypes from "prop-types";
import Styles from "./styles";

/**
 * Class FlatButton
 * usage Example:
 *
 * import NavigatorTitle from '../Prompt';
 *   <NavigatorTitle
 *       title='Inbox'
 *       Number='70'/>
 *
 */
export default class NavigatorTitle extends Component {
    /**
     * Creates the component that must be setted into the modal element.
     * considere that will be used to enter into a modal element.
     * @private
     */
    _renderNavigatorTitle = () => {
        const {
            title,
            number,
            borderWidth
        } = this.props;
        return (
            <View style={Styles.navTitleBox}>
                <View style={Styles.navTitle}>
                    <Text style={Styles.navTitleText}>{title}</Text>
                </View>
                <View style={Styles.navCounter}>
                    <Text style={[Styles.navCounterText, {borderWidth}]}>{number}</Text>
                </View>
            </View>
        );
    };

    /**
     * Render and create the modal element, an fill with the dialog view previowsly created
     * in  _renderNavigatorTitle method
     */
    render () {
        return (
            this._renderNavigatorTitle()
        );
    }
}
/**
 * Initialize the prop to be mapped and validated into the component
 *
 * @ignore
 */
NavigatorTitle.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    borderWidth: PropTypes.number
};
/**
 * Sets the default values
 */
NavigatorTitle.defaultProps = {
    borderWidth: 1
};
