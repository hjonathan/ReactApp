/* eslint-disable react/no-direct-mutation-state */
import React, {Component} from "react";
import {Text, View, Image, ScrollView, Dimensions} from "react-native";
import {NavigationActions} from "react-navigation";
import Orientation from "react-native-orientation";
import {Button} from "react-native-elements";
import I18n from "../../I18n";
import Swiper from "../../Components/Swiper";
import * as Res from "../../Assets/resources";
import Styles from "./styles";

const initialState = {
    icon1: ["flex", "none", "none", "none"],
    icon2: ["flex", "none", "none"],
    icon3: ["flex", "none", "none", "none", "none"],
    icon4: ["flex", "none"],
    widthScreen: Dimensions.get("window").width
};

class WalkThrough extends Component {
    static navigationOptions= ({navigation}) => ({
        header: null
    });

    /**
     * Constructor WalkThrough
     */
    constructor () {
        super();
        this.state = initialState;
        this.onLayout = this.onLayout.bind(this);
    }

    /**
     * Charges first icon
     */
    componentDidMount () {
        Orientation.lockToPortrait();
        this.onChangeView(0);
    }

    /**
     *  Animate Icons
     *  TODO refactoring to remove the react / no-direct-mutation-state
     */
    onChangeView = (index) => {
        let count = 0;
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            count += 1;
            switch (index) {
                case 0:
                    if (this.state.icon1.length > count) {
                        this.state.icon1[count - 1] = "none";
                        this.state.icon1[count] = "flex";
                        this.setState({icon1: this.state.icon1});
                    }
                    break;
                case 1:
                    if (this.state.icon2.length > count) {
                        this.state.icon2[count - 1] = "none";
                        this.state.icon2[count] = "flex";
                        this.setState({icon2: this.state.icon2});
                    }
                    break;
                case 2:
                    if (this.state.icon3.length > count) {
                        this.state.icon3[count - 1] = "none";
                        this.state.icon3[count] = "flex";
                        this.setState({icon3: this.state.icon3});
                    }
                    break;
                case 3:
                    if (this.state.icon4.length > count) {
                        this.state.icon4[count - 1] = "none";
                        this.state.icon4[count] = "flex";
                        this.setState({icon4: this.state.icon4});
                    }
                    break;
                default:
                    break;
            }
        }, 300);
    };

    /**
     * Gets current screen's width and updates withScreen state
     */
    onLayout () {
        const {width} = Dimensions.get("window");
        this.setState({widthScreen: width});
    }

    /**
     * Fires when the scroll begins to reset the icon states
     */
    onMomentumScrollBegin () {
        clearInterval(this.interval);
        this.setState({icon1: ["flex", "none", "none", "none"]});
        this.setState({icon2: ["flex", "none", "none"]});
        this.setState({icon3: ["flex", "none", "none", "none", "none"]});
        this.setState({icon4: ["flex", "none"]});
    }

    /**
     * Routes to login screen
     */
    navigate = () => {
        const routeToScreen = NavigationActions.navigate({
            routeName: "Login"
        });
        this.props.navigation.dispatch(routeToScreen);
    };

    /**
     * Renders register screen
     * @returns {*}
     */
    renderRegisterScreen () {
        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 32,
                width: this.state.widthScreen
            }}
            >
                <View style={{margin: 16}}>
                    <Text style={Styles.subtitle}>{I18n.t("activity_walkthrough_final_page_text_1")}</Text>
                </View>
                <View style={{margin: 16}}>
                    <Button
                        raised
                        backgroundColor={Res.colors.successColor}
                        buttonStyle={{height: 38, width: 170}}
                        borderRadius={2}
                        title={I18n.t("login_btn").toUpperCase()}
                        fontSize={14}
                        fontWeight="bold"
                        onPress={() => this.navigate()}
                    />
                </View>
            </View>
        );
    }

    /**
     * Render
     * @returns {*}
     */
    render () {
        return (
            <View style={{flex: 1}} onLayout={this.onLayout}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <Swiper
                        onChangeIndex={index => this.onChangeView(index)}
                        onMomentumScrollBegin={() => this.onMomentumScrollBegin()}
                    >
                        <View style={[Styles.slide, {width: this.state.widthScreen}]}>
                            <View style={Styles.iconContainer}>
                                <Image style={[Styles.icon, {display: this.state.icon1[0]}]} source={Res.images.walkThrough.build1} />
                                <Image style={[Styles.icon, {display: this.state.icon1[1]}]} source={Res.images.walkThrough.build2} />
                                <Image style={[Styles.icon, {display: this.state.icon1[2]}]} source={Res.images.walkThrough.build3} />
                                <Image style={[Styles.icon, {display: this.state.icon1[3]}]} source={Res.images.walkThrough.build4} />
                            </View>
                            <View style={Styles.content}>
                                <Text style={Styles.title}>{I18n.t("activity_walkthrough_title_1")}</Text>
                                <Text style={Styles.subtitle}>{I18n.t("activity_walkthrough_text_1")}</Text>
                            </View>
                        </View>
                        <View style={[Styles.slide, {width: this.state.widthScreen}]}>
                            <View style={Styles.iconContainer}>
                                <Image style={[Styles.icon, {display: this.state.icon2[0]}]} source={Res.images.walkThrough.run1} />
                                <Image style={[Styles.icon, {display: this.state.icon2[1]}]} source={Res.images.walkThrough.run2} />
                                <Image style={[Styles.icon, {display: this.state.icon2[2]}]} source={Res.images.walkThrough.run3} />
                            </View>
                            <View style={Styles.content}>
                                <Text style={Styles.title}>{I18n.t("activity_walkthrough_title_2")}</Text>
                                <Text style={Styles.subtitle}>{I18n.t("activity_walkthrough_text_2")}</Text>
                            </View>
                        </View>
                        <View style={[Styles.slide, {width: this.state.widthScreen}]}>
                            <View style={Styles.iconContainer}>
                                <Image style={[Styles.icon, {display: this.state.icon3[0]}]} source={Res.images.walkThrough.report1} />
                                <Image style={[Styles.icon, {display: this.state.icon3[1]}]} source={Res.images.walkThrough.report2} />
                                <Image style={[Styles.icon, {display: this.state.icon3[2]}]} source={Res.images.walkThrough.report3} />
                                <Image style={[Styles.icon, {display: this.state.icon3[3]}]} source={Res.images.walkThrough.report4} />
                                <Image style={[Styles.icon, {display: this.state.icon3[4]}]} source={Res.images.walkThrough.report5} />
                            </View>
                            <View style={Styles.content}>
                                <Text style={Styles.title}>{I18n.t("activity_walkthrough_title_3")}</Text>
                                <Text style={Styles.subtitle}>{I18n.t("activity_walkthrough_text_3")}</Text>
                            </View>
                        </View>
                        <View style={[Styles.slide, {width: this.state.widthScreen}]}>
                            <View style={Styles.iconContainer}>
                                <Image style={[Styles.icon, {display: this.state.icon4[0]}]} source={Res.images.walkThrough.optimize1} />
                                <Image style={[Styles.icon, {display: this.state.icon4[1]}]} source={Res.images.walkThrough.optimize2} />
                            </View>
                            <View style={Styles.content}>
                                <Text style={Styles.title}>{I18n.t("activity_walkthrough_title_4")}</Text>
                                <Text style={Styles.subtitle}>{I18n.t("activity_walkthrough_text_4")}</Text>
                            </View>
                        </View>
                        {this.renderRegisterScreen()}
                    </Swiper>
                </ScrollView>
            </View>
        );
    }
}

export default WalkThrough;
