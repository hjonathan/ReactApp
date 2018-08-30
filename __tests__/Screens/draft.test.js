import React from 'react'
import {RealmObject} from "../../App/Model/Schemas";
import {shallow} from 'enzyme';
import Draft from '../../App/Screens/Draft';
import DraftScreen from '../../App/Screens/Draft/draft';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import {createStore} from 'redux';
import {CASE} from "../../App/Libs/Const";

jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);

describe('Screen >>> Draft', () => {
    const initialState = {
            Cases: {
                draft: {
                    response: [
                        {
                            currentUser: {
                                userId: "00001"
                            }
                        },
                        {
                            currentUser: {
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
        requestCasesDraft = jest.fn(),
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
        viewDraft,
        viewDraftOff;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(
            <Draft
                requestCasesDraft={requestCasesDraft}
                userInfoRequest={userInfoRequest}
                caseOffline={caseOffline}
                routeName={routeName}
                reset={reset}
                store={store}
            />
        );
        viewDraft = shallow(
            <DraftScreen
                navigation={navigation}
                isConnected={true}
                requestCasesDraft={requestCasesDraft}
                userInfoRequest={userInfoRequest}
                reset={reset}
                routeName={routeName}
                store={store}
            />
        );
        viewDraftOff = shallow(<DraftScreen navigation={navigation} isConnected={false} routeName={routeName} />);
    });

    afterAll(() => {
        RealmObject.close();
    });

    /**
     * Render test
     */
    it('Render draft correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('mapStateToProps', () => {
        expect(container.props('children').requestCasesDraft()).toMatchSnapshot();
        expect(container.props('children').userInfoRequest()).toMatchSnapshot();
        expect(container.props('children').caseOffline()).toMatchSnapshot();
        expect(container.props('children').routeName()).toMatchSnapshot();
        expect(container.props('children').reset()).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(DraftScreen.navigationOptions({navigation}).title)
            .toEqual("menu_drawer_main_menu_item_draft");
        expect(DraftScreen.navigationOptions({navigation}).headerTintColor)
            .toEqual("#FFF");
        expect(DraftScreen.navigationOptions({navigation}).headerStyle)
            .toEqual({backgroundColor: "#1F6CBC"});
        expect(DraftScreen.navigationOptions({navigation}).headerRight).toMatchSnapshot();
    });

    it("Should call navigationOptions method", () => {
        expect(viewDraft.instance().navigationOptions).toBeUndefined();
    });

    it("Props coverage cases", () => {
        expect(container.prop("cases")).toEqual(initialState.Cases);
    });

    it("Props coverage disableItemList", () => {
        expect(container.prop("disableItemList")).toEqual(initialState.Screens.All.disableItemList);
    });

    it("Props coverage componentWillReceiveProps", () => {
        viewDraft.instance().componentWillReceiveProps({
            cases: {
                draft: initialState.Cases.draft
            },
            forceRefresh: true,
            list: CASE.DRAFT,
            disableItemList: initialState.Screens.All.disableItemList
        });
        expect(viewDraft.instance().state.draftRequested).toEqual(false);
        viewDraft.instance().componentWillReceiveProps({
            cases: {
                users: initialState.Cases.users
            },
            list: CASE.DRAFT,
            disableItemList: initialState.Screens.All.disableItemList
        });
        viewDraft.instance().setState({usersRequested: false});
        viewDraft.instance().componentWillReceiveProps({
            cases: {
                draft: {response: []},
                users: initialState.Cases.users
            },
            list: CASE.DRAFT,
            disableItemList: initialState.Screens.All.disableItemList
        });
        expect(viewDraft.instance().state.usersRequested).toEqual(true);
    });

    it("Should call onRefresh method", () => {
        expect(viewDraft.instance().onRefresh()).toMatchSnapshot();
        expect(viewDraft.instance().onRefresh({nativeEvent: {text: "abc"}})).toMatchSnapshot();
        expect(viewDraftOff.instance().onRefresh()).toMatchSnapshot();
    });

    it("Should call changeLayout method", () => {
        viewDraft.instance().changeLayout();
        expect(viewDraft.instance().state.middleHeight).toEqual(617);
    });

    it("Should call goToNewCases method", () => {
        expect(viewDraft.instance().goToNewCases()).toMatchSnapshot();
    });

    it("Should call refresh method of FlatList component", () => {
        const flatList = viewDraft.props("children").children[0];
        expect(flatList.props.renderItem({})).toMatchSnapshot();
        expect(flatList.props.onRefresh()).toMatchSnapshot();
    });

    it("Should call refresh method of FAB component", () => {
        const floatActionButton = viewDraft.props("children").children[1];
        expect(floatActionButton.props.onClickAction()).toMatchSnapshot();
    });
});
