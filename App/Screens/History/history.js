import React, {Component} from "react";
import {
    View,
    FlatList
} from "react-native";
import _ from "lodash";
import ItemHistory from "./ItemHistory";
import Styles from "./styles";
import User from "../../Model/User";
import * as Res from "../../Assets/resources";
import I18n from "../../I18n";

class History extends Component {
    /**
     * Navigation option
     */
    static navigationOptions = ({navigation}) => ({
        title: I18n.t("History"),
        headerTintColor: Res.colors.white,
        headerStyle: {
            backgroundColor: Res.colors.mainColor
        }
    });
    /**
     * Constructor
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            appUid: props.navigation.state.params.appUid,
            data: [],
            users: []
        };
    }

    /**
     * Init history list
     */
    componentWillMount () {
        let users = User.getUserOffline();
        this.setState({users});
        this._getHistory();
    }

    /**
     * Component will receive props
     */
    componentWillReceiveProps (nextProps) {
        try {
            if (nextProps.history.data && nextProps.history.data.flow) {
                this.mergeData(nextProps.history.data.flow);
            }
        // eslint-disable-next-line no-empty
        } catch (error) {
        }
    }

    /**
     * Merges userPhoto props to data
     * @param data
     */
    mergeData (data) {
        let userFullName,
            dataMerged,
            user;
        dataMerged = data.map((history) => {
            userFullName = history.userFullName.split(" ");
            user = _.find(this.state.users, {lastName: userFullName[0], firstName: userFullName[1]});
            if (user) {
                history.userPhoto = user.userPhoto;
            }
            return history;
        });
        this.setState({data: dataMerged});
    }

    /**
     * Request case's history.
     * @private
     */
    _getHistory () {
        this.props.requestHistory({
            app_uid: this.state.appUid
        });
    }

    /**
     * Renders screen
     * @returns {*}
     */
    render () {
        return (
            <View style={Styles.mainContainer}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => <ItemHistory data={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

export default History;
