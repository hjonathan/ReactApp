import React, {Component} from "react";
import {Text, View, FlatList, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import MIcons from "react-native-vector-icons/MaterialIcons";
import SearchBar from "react-native-searchbar";
import _ from "lodash";
import ItemNewList from "../../Components/ItemNewList";
import Styles from "./styles";
import * as Res from "../../Assets/resources";
import I18n from "../../I18n";
import ListView from "../../Components/ExpandableListView";

const {height} = Dimensions.get("window");

class NewCases extends Component {
    /**
     * Method used by React Navigation component to add elements on navigation bar.
     * In this case to put a search button.
     */
    static navigationOptions = ({navigation}) => ({
        title: I18n.t("Select_a_task_to_start"),
        headerTintColor: Res.colors.white,
        headerStyle: {
            backgroundColor: Res.colors.mainColor
        },
        headerRight: (
            <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                    navigation.state.params.handlerSearch(navigation.state.params.needsDisplay);
                }}
            >
                <MIcons name="search" style={{color: Res.colors.white, fontSize: 24}} />
            </TouchableOpacity>)
    });

    /**
     * Constructor
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            isEmpty: false,
            isFetching: false,
            middleHeight: height / 2 - 50,
            results: [],
            originalData: [],
            inputSearch: "",
            searchHeight: 0,
            disabledItemList: false,
            newsRequested: false
        };
        this.changeLayout = this.changeLayout.bind(this);
        this._handleResults = this._handleResults.bind(this);
        this._handleChangeText = this._handleChangeText.bind(this);
    }

    /**
     * Initial get items list
     */
    componentWillMount () {
        this._getCasesList();
    }

    /**
     * Pass show or hide searchbar function to navigation params
     */
    componentDidMount () {
        this.props.navigation.setParams({
            handlerSearch: this._searchBarVisual,
            needsDisplay: true
        });
    }

    /**
     * Receives response of endpoints
     * @param nextProps
     */
    componentWillReceiveProps (nextProps) {
        try {
            if (Object.prototype.hasOwnProperty.call(nextProps, "newcases") &&
                nextProps.newcases.response.length && !this.state.newsRequested) {
                this._populateList(nextProps.newcases.response);
                this.setState({
                    originalData: nextProps.newcases.response,
                    disableItemList: nextProps.disableItemList,
                    newsRequested: true
                });
            }
        } catch (e) {
            // Nothing to do here. This method will be update when props value will be returned from connection.
        }
    }

    /**
     * fires whe the Flat list was refreshed
     */
    onRefresh () {
        this._getCasesList();
        this.setState({isFetching: true});
    }

    /**
     * Delegated method from searchbar component used to release
     * results from a search.
     * @param {*|Array} results
     */
    _handleResults (results) {
        let newArray = [],
            element,
            i;
        for (i = 0; i < results.length; i += 1) {
            element = results[i];
            if (element.text.includes(this.state.inputSearch)) {
                newArray.push(element);
            }
        }
        if (this.state.inputSearch.length === 0) {
            newArray = this.state.originalData;
        }
        this._populateList(newArray);
    }

    /**
     * Delegated method from searchbar component to get the input of the user.
     * @param {* String} input
     */
    _handleChangeText (input) {
        this.setState({inputSearch: input});
    }

    /**
     * Shows and hides SearchBar View.
     * @private
     */
    _searchBarVisual = (state) => {
        let newState = !state;
        if (state) {
            this.setState({searchHeight: 62});
            this.searchBar.show();
        } else {
            this.setState({searchHeight: 0});
            this.searchBar.hide();
        }
        this.props.navigation.setParams({needsDisplay: newState});
    };

    /**
     * Gets cases unassigned
     * @private
     */
    _getCasesList () {
        this.props.requestNewCases({});
    }

    /**
     * Populates cases list
     * @param cases
     * @private
     */
    _populateList (cases) {
        if (cases) {
            let result = cases.reduce((group, c) => {
                c.taskOffline = this.processIfOffline(c);
                (group[c.categoryName] = group[c.categoryName] || []).push(c);
                return group;
            }, {});
            this.setState({data: result, isEmpty: cases.length === 0});
        }
    }

    /**
     * Check if case is offline and get all necessary for case
     * @param caseData
     * @returns {boolean}
     */
    processIfOffline (caseData) {
        let isOffline = false;
        if (caseData.offlineEnabled === "TRUE" && this.props.caseOffline) {
            this.props.caseOffline(caseData);
            isOffline = true;
        }
        return isOffline;
    }

    /**
     * Gets new dimensions and sets middleHeight state
     */
    changeLayout () {
        this.setState({middleHeight: Dimensions.get("window").height / 2 - 50});
    }

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
     * Render the list items
     * @param item
     * @returns {XML}
     */
    renderFlatListItem (item) {
        return (
            <ItemNewList
                parent={this.props}
                data={item}
                isConnected={this.props.isConnected}
            />
        );
    }

    /**
     * Render the list by category
     * @returns {XML}
     */
    renderExpandableListView () {
        let groupItems = [];
        _.forEach(this.state.data, (group, label) => {
            groupItems.push(<ListView title={label} key={label}><FlatList
                data={group}
                renderItem={({item}) => this.renderFlatListItem(item)}
                ListHeaderComponent={this.renderHeader}
                ListEmptyComponent={this.emptyList()}
                refreshing={false}
                onRefresh={() => this.onRefresh()}
                onEndReachedThreshold={50}
                keyExtractor={item => item.text}
            />
                            </ListView>);
        });
        return groupItems;
    }

    /**
     * Renders
     * @returns {*}
     */
    render () {
        return (
            <View style={Styles.mainContainer}>
                <View style={{
                    height: this.state.searchHeight,
                    width: "100%",
                    marginRight: 15,
                    backgroundColor: "transparent",
                    paddingBottom: 10
                }}
                >
                    <SearchBar
                        ref={ref => (this.searchBar = ref)}
                        data={this.state.originalData}
                        handleResults={this._handleResults}
                        handleChangeText={this._handleChangeText}
                        showOnLoad={false}
                        hideBack
                    />
                </View>
                <ScrollView style={{flex: 1}}>
                    {_.isEmpty(this.state.data) ? this.emptyList() : this.renderExpandableListView()}
                </ScrollView>
            </View>
        );
    }
}

export default NewCases;
