import React from 'react'
import {shallow} from 'enzyme';
import Unassigned from '../../App/Screens/Unassigned';
import UnassignedScreen from '../../App/Screens/Unassigned/unassigned';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import {createStore} from 'redux';
import {CASE} from "../../App/Libs/Const";

jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);

describe('Screen >>> Unassigned', () => {
    const initialState = {
        Cases: {
            unassigned: [
                {
                    prevUser: {
                        userId: "00001"
                    }
                },
                {
                    prevUser: {
                        userId: "00002"
                    }
                }
            ],
            users: [
                {
                    userId: "00001",
                    userPhoto: "picture1"
                },
                {
                    userId: "00002",
                    userPhoto: "picture2"
                }
            ]
        },
        Screens: {
            All: {
                disabledItemList: false
            }
        },
        Net: {
            isConnected: true
        }
    },
        requestCasesUnassigned = jest.fn(),
        userInfoRequest = jest.fn(),
        routeName = jest.fn(),
        navigation = {
            dispatch: jest.fn(),
            setParams: jest.fn(),
            state: {
                routeName: CASE.DRAFT,
                params:{
                    searchInput: null
                }
            }
        },
        mockStore = configureStore();

    let store,
        container,
        viewUnassigned,
        viewUnassignedOffline;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<Unassigned store={store}/>);
        viewUnassigned = shallow(
            <UnassignedScreen
                navigation={navigation}
                isConnected={true}
                requestCasesUnassigned={requestCasesUnassigned}
                userInfoRequest={userInfoRequest}
                routeName={routeName}
                reset={jest.fn()}
                store={store}
            />);
        viewUnassignedOffline = shallow(<UnassignedScreen navigation={navigation} isConnected={false} routeName={routeName} />);
    });

    /**
     * Render test
     */
    it('Render unassigned correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(UnassignedScreen.navigationOptions({navigation}).title)
            .toEqual("menu_drawer_main_menu_item_unassigned");
        expect(UnassignedScreen.navigationOptions({navigation}).headerTintColor)
            .toEqual("#FFF");
        expect(UnassignedScreen.navigationOptions({navigation}).headerStyle)
            .toEqual({backgroundColor: "#1F6CBC"});
        expect(UnassignedScreen.navigationOptions({navigation}).headerLeft).toMatchSnapshot();
    });

    it('mapStateToProps', () => {
        expect(container.props('children').requestCasesUnassigned()).toMatchSnapshot();
        expect(container.props('children').userInfoRequest()).toMatchSnapshot();
        expect(container.props('children').routeName()).toMatchSnapshot();
        expect(container.props('children').reset()).toMatchSnapshot();
    });

    it("Should call navigationOptions method", () => {
        expect(viewUnassigned.instance().navigationOptions).toBeUndefined();
    });

    it("Props coverage cases", () => {
        expect(container.prop("cases")).toEqual(initialState.Cases);
    });

    it("Props coverage disableItemList", () => {
        expect(container.prop("disableItemList")).toEqual(initialState.Screens.All.disableItemList);
    });

    it("Props coverage componentWillReceiveProps", () => {
        viewUnassigned.instance().componentWillReceiveProps({
            cases: {
                unassigned: initialState.Cases.unassigned
            },
            list: CASE.UNASSIGNED,
            disableItemList: initialState.Screens.All.disableItemList
        });
        expect(viewUnassigned.instance().state.unassignedRequested).toEqual(true);
        viewUnassigned.instance().componentWillReceiveProps({
            cases: {
                users: initialState.Cases.users
            },
            list: CASE.UNASSIGNED,
            disableItemList: initialState.Screens.All.disableItemList
        });
        viewUnassigned.instance().setState({usersRequested: false});
        viewUnassigned.instance().componentWillReceiveProps({
            cases: {
                unassigned: {response: []},
                users: initialState.Cases.users
            },
            list: CASE.UNASSIGNED,
            disableItemList: initialState.Screens.All.disableItemList
        });
        expect(viewUnassigned.instance().state.usersRequested).toEqual(false);
    });

    it("Should call onRefresh method", () => {
        expect(viewUnassigned.instance().onRefresh()).toMatchSnapshot();
        expect(viewUnassigned.instance().onRefresh({nativeEvent: {text: "abc"}})).toMatchSnapshot();
        expect(viewUnassignedOffline.instance().onRefresh()).toMatchSnapshot();
    });

    it("Should call changeLayout method", () => {
        viewUnassigned.instance().changeLayout();
        expect(viewUnassigned.instance().state.middleHeight).toEqual(617);
    });

    it("Should call goToNewCases method", () => {
        expect(viewUnassigned.instance().goToNewCases()).toMatchSnapshot();
    });

    it("Should call refresh method of FlatList component", () => {
        const flatList = viewUnassigned.props("children").children[0];
        expect(flatList.props.renderItem({})).toMatchSnapshot();
        expect(flatList.props.onRefresh()).toMatchSnapshot();
    });

    it("Should call refresh method of FAB component", () => {
        const floatActionButton = viewUnassigned.props("children").children[1];
        expect(floatActionButton.props.onClickAction()).toMatchSnapshot();
    });
});
