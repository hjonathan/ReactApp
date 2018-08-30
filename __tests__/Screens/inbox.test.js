import React from 'react'
import {shallow} from 'enzyme';
import Inbox from '../../App/Screens/Inbox';
import InboxScreen from '../../App/Screens/Inbox/inbox';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import {createStore} from 'redux';
import {CASE} from "../../App/Libs/Const";

jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);

describe('Screen >>> Inbox', () => {
    const initialState = {
            Cases: {
                todo: {
                    response: [
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
                    ]
                },
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
        casesTodoRequest = jest.fn(),
        userInfoRequest = jest.fn(),
        caseOffline = jest.fn(),
        routeName = jest.fn(),
        reset = jest.fn(),
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
        viewInbox,
        viewInboxOff;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<Inbox store={store} />);
        viewInbox = shallow(
            <InboxScreen
                navigation={navigation}
                isConnected={true}
                casesTodoRequest={casesTodoRequest}
                userInfoRequest={userInfoRequest}
                caseOffline={caseOffline}
                routeName={routeName}
                reset={reset}
                store={store}
            />
        );
        viewInboxOff = shallow(<InboxScreen navigation={navigation} isConnected={false} routeName={routeName}/>);
    });

    /**
     * Render test
     */
    it('Render inbox correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('mapStateToProps', () => {
        expect(container.props('children').casesTodoRequest()).toMatchSnapshot();
        expect(container.props('children').userInfoRequest()).toMatchSnapshot();
        expect(container.props('children').caseOffline()).toMatchSnapshot();
        expect(container.props('children').routeName()).toMatchSnapshot();
        expect(container.props('children').reset()).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(InboxScreen.navigationOptions({navigation}).title)
            .toEqual("menu_drawer_main_menu_item_inbox");
        expect(InboxScreen.navigationOptions({navigation}).headerTintColor)
            .toEqual("#FFF");
        expect(InboxScreen.navigationOptions({navigation}).headerStyle)
            .toEqual({backgroundColor: "#1F6CBC"});
        expect(InboxScreen.navigationOptions({navigation}).headerLeft).toMatchSnapshot();
    });

    it("Should call navigationOptions method", () => {
        expect(viewInbox.instance().navigationOptions).toBeUndefined();
    });

    it("Props coverage cases", () => {
        expect(container.prop("cases")).toEqual(initialState.Cases);
    });

    it("Props coverage disableItemList", () => {
        expect(container.prop("disableItemList")).toEqual(initialState.Screens.All.disableItemList);
    });

    it("Props coverage componentWillReceiveProps", () => {
        viewInbox.instance().componentWillReceiveProps({
            cases: {
                todo: initialState.Cases.todo
            },
            forceRefresh: true,
            list: CASE.INBOX,
            disableItemList: initialState.Screens.All.disableItemList
        });
        expect(viewInbox.instance().state.todoRequested).toEqual(false);
        viewInbox.instance().componentWillReceiveProps({
            cases: {
                users: initialState.Cases.users
            },
            forceRefresh: true,
            list: CASE.INBOX,
            disableItemList: initialState.Screens.All.disableItemList
        });
        expect(viewInbox.instance().state).toEqual({
            data: [],
            todoRequested: false,
            searchInput: false,
            middleHeight: 617,
            usersRequested: false,
            loading: true
        });
        viewInbox.instance().setState({usersRequested: false});
        viewInbox.instance().componentWillReceiveProps({
            cases: {
                todo: {response: []},
                users: initialState.Cases.users
            },
            forceRefresh: true,
            list: CASE.INBOX,
            disableItemList: initialState.Screens.All.disableItemList
        });
        expect(viewInbox.instance().state.todoRequested).toEqual(false);
    });

    it("Should call onRefresh method", () => {
        expect(viewInbox.instance().onRefresh()).toMatchSnapshot();
        expect(viewInbox.instance().onRefresh({nativeEvent: {text: "abc"}})).toMatchSnapshot();
        expect(viewInboxOff.instance().onRefresh()).toMatchSnapshot();
    });

    it("Should call changeLayout method", () => {
        viewInbox.instance().changeLayout();
        expect(viewInbox.instance().state.middleHeight).toEqual(617);
    });

    it("Should call goToNewCases method", () => {
        expect(viewInbox.instance().goToNewCases()).toMatchSnapshot();
    });

    it("Should call refresh method of FlatList component", () => {
        const flatList = viewInbox.props("children").children[0];
        expect(flatList.props.renderItem({})).toMatchSnapshot();
        expect(flatList.props.onRefresh()).toMatchSnapshot();
    });

    it("Should call refresh method of FAB component", () => {
        const floatActionButton = viewInbox.props("children").children[1];
        expect(floatActionButton.props.onClickAction()).toMatchSnapshot();
    });
});
