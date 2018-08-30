import React, {Component} from 'react';
import {
    Dimensions,
    ScrollView,
    View,
    Image
} from 'react-native';
import Styles from './styles';
import * as Res from '../../Assets/resources';

const {width} = Dimensions.get('window');

/**
 * Class Swiper
 * Example:
 * import Swiper from '../Swiper';
 * ...
 * render() {
 *      return(
 *          <Swiper>
 *              <View>
 *                  ...content
 *              </View>
 *              <View>
 *                  ...content
 *              </View>
 *              <View>
 *                  ...content
 *              </View>
 *          </Swiper>
 *      );
 * }
 */
class Swiper extends Component {
    /**
     * Constructor Swiper
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            totalSlide: (this.props && this.props.children && this.props.children.length) || 0,
            widthScreen: width
        };
        this.onChangeLayout = this.onChangeLayout.bind(this);
    }

    /**
     * Updates current position
     * @param event
     */
    updateIndex(event) {
        let x = event.nativeEvent.contentOffset.x,
            currentIndex = parseInt(parseInt(x) / parseInt(this.itself.state.widthScreen));
        this.itself.setState({currentIndex});
        this.itself.props.onChangeIndex(currentIndex);
    }

    /**
     * Fires when the scroll begin
     * @param {*} event 
     */
    onMomentumScrollBegin(event) {
        this.itself.props.onMomentumScrollBegin(event);
    }

    /**
     * Gets current screen's width and updates withScreen state
     * @param e
     */
    onChangeLayout(e) {
        const {width} = Dimensions.get('window');
        this.setState({widthScreen: width});
    };

    /**
     * Render slides
     * @returns {*}
     */
    renderSlide() {
        if (this.state.totalSlide) {
            return (
                <ScrollView
                    ref="_scrollView"
                    pagingEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onMomentumScrollEnd={this.updateIndex}
                    itself={this}
                    onLayout={this.onChangeLayout}
                    onMomentumScrollBegin={this.onMomentumScrollBegin}
                >
                    {this.props.children.map((child, index) =>
                        <View key={index}>
                            {child}
                        </View>
                    )}
                </ScrollView>
            );
        }
    };

    /**
     * Render dots
     */
    renderPagination() {
        let dots = [],
            key;
        if (this.state.totalSlide >= 2) {
            let activeDot = <View style={[Styles.dot, Styles.activeDot]}/>,
                dot = <View style={Styles.dot}/>;
            for (key = 0; key < this.state.totalSlide; key += 1) {
                dots.push(key === this.state.currentIndex ?
                    React.cloneElement(activeDot, {key}) :
                    React.cloneElement(dot, {key})
                );
            }
            return (
                <View pointerEvents="none" style={[Styles.pagination, {width: this.state.widthScreen}]}>
                    {dots}
                </View>
            );
        }
    }

    /**
     * Render component
     * @returns {*}
     */
    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={Styles.logoContainer}>
                    <Image
                        source={Res.images.logo_white}
                        style={Styles.logo}/>
                </View>
                {this.renderSlide()}
                {this.renderPagination()}
            </View>
        );
    }
}

export default Swiper;