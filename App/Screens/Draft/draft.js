import React, {Component} from "react";
import {Text, View, FlatList, Dimensions, TouchableOpacity, InteractionManager} from "react-native";
import FAB from "react-native-fab";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import {NavigationActions} from "react-navigation";
import ItemList from "../../Components/ItemList";
import SearchBar from "../../Components/SearchBar";
import Styles from "./styles";
import * as Res from "../../Assets/resources";
import I18n from "../../I18n";
import ListCommon from "../../Libs/ListCommon";

const {height} = Dimensions.get("window");

let that = null;
/**
 * Class Draft
 */
class Draft extends Component {
    /**
     * Navigation option
     */
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return {
            title: I18n.t("menu_drawer_main_menu_item_draft"),
            headerTintColor: Res.colors.white,
            headerStyle: {
                backgroundColor: Res.colors.mainColor
            },
            headerLeft: (
                <TouchableOpacity
                    style={{padding: 16}}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    <IconFontAwesome name="bars" style={{color: Res.colors.white, fontSize: 20}} />
                </TouchableOpacity>),
            headerTitle: (
                // eslint-disable-next-line react/jsx-no-bind
                params && params.searchInput ? <SearchBar onEndEdit={that.onRefresh.bind(that)} /> : null
            ),
            headerRight: (
                params && params.searchInput
                    ? <TouchableOpacity
                        style={{padding: 8}}
                        onPress={() => {
                            navigation.setParams({
                                searchInput: false
                            });
                        }}
                    >
                        <Icon name="clear" style={{color: Res.colors.white, fontSize: 24}} />
                      </TouchableOpacity>
                    : <TouchableOpacity
                        style={{padding: 8}}
                        onPress={() => {
                            navigation.setParams({
                                searchInput: true
                            });
                        }}
                    >
                        <Icon name="search" style={{color: Res.colors.white, fontSize: 24}} />
                      </TouchableOpacity>
            )
        };
    };

    /**
     * Constructor
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            draftRequested: false,
            usersRequested: false,
            middleHeight: height / 2 - 50,
            searchInput: false,
            loading: false
        };
        this.changeLayout = this.changeLayout.bind(this);
        this.fnList = new ListCommon(props);
        this.props.routeName(this.props.navigation.state.routeName);
    }

    /**
     * Initial get items list
     */
    componentWillMount () {
        this.fnList.getDataList("requestCasesDraft");
    }

    /**
     * Initializes searchBar
     */
    componentDidMount () {
        that = this;
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                searchInput: false
            });
        });
    }

    /**
     * Receives response of endpoints
     * @param nextProps
     */
    componentWillReceiveProps (nextProps) {
        try {
            if (!nextProps.cases.draft.response.length) {
                this.setState({loading: false});
            }
            if (Object.prototype.hasOwnProperty.call(nextProps.cases, "draft") &&
                nextProps.cases.draft.response && !this.state.draftRequested) {
                this.setState({draftRequested: true, data: []});
                this.fnList.getUsersInfo(nextProps.cases.draft.response, "currentUser");
            }
            if (Object.prototype.hasOwnProperty.call(nextProps.cases, "users") &&
                nextProps.cases.users.length && !this.state.usersRequested) {
                this.setState({
                    data: this.fnList.mergeList({
                        caseList: nextProps.cases.draft.response,
                        users: nextProps.cases.users
                    }, "currentUser"),
                    usersRequested: true,
                    loading: false
                });
            }
            if (nextProps.forceRefresh) {
                this.onRefresh();
            }
        // eslint-disable-next-line no-empty
        } catch (e) {
        }
    }

    /**
     * Refreshes list's data
     * @param event
     */
    onRefresh (event) {
        const search = (event && event.nativeEvent.text) || "";
        this.props.navigation.setParams({
            searchInput: false
        });
        this.setState({loading: true});
        if (this.props.isConnected) {
            this.props.reset();
            this.props.routeName(this.props.navigation.state.routeName);
            this.setState({draftRequested: false, usersRequested: false});
            this.fnList.getDataList("requestCasesDraft", {search});
        }
    }

    /**
     * Gets new dimensions and sets middleHeight state
     */
    changeLayout () {
        this.setState({middleHeight: Dimensions.get("window").height / 2 - 50});
    }

    /**
     * Method to enable option to go to new cases view.
     */
    goToNewCases = () => {
        const routeToScreen = NavigationActions.navigate({
            routeName: "NewCases"
        });
        this.props.navigation.dispatch(routeToScreen);
    };

    /**
     * Renders empty view
     * @returns {*}
     */
    emptyList () {
        return (
            <View style={{flex: 1, paddingTop: this.state.middleHeight}} onLayout={this.changeLayout}>
                <Text style={{textAlign: "center", color: "white", fontWeight: "bold"}}>{I18n.t("noDataString")}</Text>
            </View>
        );
    }

    /**
     * Renders loading label
     * @returns {*}
     */
    renderLoading () {
        if (this.state.loading) {
            return (
                <View style={{padding: 4}}>
                    <Text style={{color: Res.colors.white}}>{I18n.t("loading_text")}</Text>
                </View>
            );
        }
        return null;
    }

    /**
     * Renders item list
     * @param item
     * @returns {*}
     */
    renderFlatListItem (item) {
        return (
            <ItemList
                parent={this.props}
                data={item}
                isConnected={this.props.isConnected}
            />
        );
    }

    /**
     * Renders
     * @returns {*}
     */
    render () {
        return (
            <View style={Styles.mainContainer}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => this.renderFlatListItem(item)}
                    ListEmptyComponent={this.emptyList()}
                    ListHeaderComponent={this.renderLoading()}
                    refreshing={false}
                    onRefresh={() => this.onRefresh()}
                    onEndReachedThreshold={0.5}
                    keyExtractor={this.fnList.keyExtractor}
                />
                <FAB
                    buttonColor={Res.colors.mainColor}
                    iconTextColor={Res.colors.white}
                    onClickAction={() => {
                        this.goToNewCases();
                    }}
                    visible
                    iconTextComponent={<Icon name="add" style={{fontSize: 24}} />}
                />
            </View>
        );
    }
}

export default Draft;