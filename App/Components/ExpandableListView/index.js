import React, {Component} from "react";
import {Text, View, Image, TouchableHighlight, Animated} from "react-native";
import * as Res from "../../Assets/resources";
import Styles from "./styles";

class ListView extends Component {
    constructor (props) {
        super(props);

        this.icons = {
            up: Res.images.arrowHeadUp,
            down: Res.images.arrowHeadDown
        };

        this.state = {
            title: props.title,
            expanded: true
        };
        this.toggle = this.toggle.bind(this);
    }

    /**
     * Change status expanded for Content
     */
    toggle () {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    /**
     * Renders
     * @returns {*}
     */
    render () {
        let icon = this.icons.down;

        if (this.state.expanded) {
            icon = this.icons.up;
        }

        return (
            <Animated.View style={Styles.container}>
                <View style={Styles.titleContainer}>
                    <Text style={Styles.title}>{this.state.title}</Text>
                    <TouchableHighlight
                        style={Styles.button}
                        onPress={this.toggle}
                        underlayColor="#f1f1f1"
                    >
                        <Image
                            style={Styles.buttonImage}
                            source={icon}
                        />
                    </TouchableHighlight>
                </View>
                {
                    this.state.expanded && (
                        <View style={Styles.body}>
                            {this.props.children}
                        </View>
                    )
                }
            </Animated.View>
        );
    }
}

export default ListView;
