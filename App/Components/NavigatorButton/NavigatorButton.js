import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Styles from './styles';
import PropTypes from 'prop-types';
import * as Res from '../../Assets/resources';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NavigatorButton extends Component {
    /**
     * Costructor
     * @param {*} props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Creates the component that must be setted into the modal element.
     */
    _renderNavigatorButton = () => {
        const {
            title,
            icon,
            borderWidth
        } = this.props;
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={Styles.navTitleBox}>
                    <View style={Styles.navTitle}>
                        <Icon name={icon} style={{color: Res.colors.white, fontSize: 24}}/>
                    </View>
                    <View style={Styles.navOption}>
                        <Text style={Styles.navTitleText}>{title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    /**
     * Render and create the modal element
     */
    render() {
        return (
            this._renderNavigatorButton()
        );
    }
}
/**
 * Initialize the prop to be mapped and validated into the component
 *
 * @ignore
 */
NavigatorButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    borderWidth: PropTypes.number,
}
/**
 * Sets the default values
 */
NavigatorButton.defaultProps = {
    title: '',
    icon: '',
    borderWidth: 1
}