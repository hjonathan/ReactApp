import React, {Component} from "react";
import {
    Text,
    View,
    Image
} from "react-native";
import Moment from "moment";
import Card from "../../Components/Card";
import Styles from "./styles";
import * as Res from "../../Assets/resources";
import {DATETIME} from "../../Libs/Const";

class ItemNote extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loaded: false
        };
        this._onLoadImage = this._onLoadImage.bind(this);
    }
    /**
     * Executes when even load was finished
     * @private
     */
    _onLoadImage = () => {
        this.setState({loaded: true});
    };

    /**
     * Gets First letter of first name
     * @returns {string}
     * @private
     */
    _getCapitalLetter (firstName) {
        const index = 0;
        return firstName.charAt(index).toUpperCase();
    }

    /**
     * Renders avatar
     * @param user
     * @returns {*}
     */
    renderImageAvatar (user) {
        let textDisplay,
            imageDisplay;
        if (this.state.loaded) {
            textDisplay = "none";
            imageDisplay = "flex";
        } else {
            textDisplay = "flex";
            imageDisplay = "none";
        }
        return (
            <View style={[Styles.circleImageContainer]}>
                <Image
                    onLoad={this._onLoadImage}
                    source={{uri: `data:image/gif;base64,${user.userPhoto}`}}
                    style={[Styles.circleImage, {display: imageDisplay}]}
                />
                <Text style={{color: "white", display: textDisplay}}>{this._getCapitalLetter(user.user.firstName)}</Text>
            </View>
        );
    }

    /**
     * Renders item list
     * @returns {*}
     */
    render () {
        const {data} = this.props;
        if (data) {
            return (
                <Card>
                    <View style={Styles.firstSection}>
                        <View>
                            <Text style={{color: "black"}}>{data.notes.content}</Text>
                        </View>
                    </View>
                    <View style={Styles.dividerLine} />
                    <View style={Styles.secondSection}>
                        <View style={Styles.leftAlign}>
                            {this.renderImageAvatar(data)}
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <Text style={Styles.userName}>
                                    {data.user.firstName} {data.user.lastName}
                                </Text>
                            </View>
                        </View>
                        <View style={Styles.rightAlign}>
                            <Text style={{color: Res.colors.lightColor}}>
                                {Moment(data.notes.date).format(DATETIME.LOCAL)}
                            </Text>
                        </View>
                    </View>
                </Card>
            );
        }
        return null;
    }
}

export default ItemNote;
