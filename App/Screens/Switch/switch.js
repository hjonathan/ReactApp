import React, {Component} from "react";
import {
    ActivityIndicator,
    StatusBar,
    View
} from "react-native";
import Styles from "./styles";
import Utils from "../../Utils";

/**
 * Class Switch for change screen main
 */
class Switch extends Component {
    constructor (props) {
        super(props);
        this.bootstrapAsync();
    }

    /**
     * Check parameters for select init screen
     * @returns {Promise<void>}
     */
    bootstrapAsync = async () => {
        const isInitiated = await Utils.getItem("@isInitiated");
        let screen = "Login";
        if (isInitiated === null && isInitiated !== "true") {
            Utils.setItem("@isInitiated", "true");
            screen = "WalkThrough";
        }
        this.props.navigation.navigate(screen);
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render () {
        return (
            <View style={Styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

export default Switch;
