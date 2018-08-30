import React, {Component} from 'react';
import {View} from 'react-native';
import Styles from './styles';

/**
 * Class Card
 * Example:
 * import Card from '../Card';
 * render() {
 *      return(
 *          <Card>
 *              {content}
 *          </Card>
 *      ),
 * }
 */
class CardView extends Component {
    /**
     * Constructor cardView
     * @param props
     */
    constructor(props) {
        super(props);
    };

    /**
     * Render
     * @param data
     * @returns {*}
     */
    render() {
        return (
            <View style={Styles.mainContainer} elevation={3}>
                {this.props.children}
            </View>
        );
    }
}

export default CardView;