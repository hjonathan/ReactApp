import React from "react";
import {shallow} from "enzyme";
import Participated from "../../App/Screens/Participated";
import ParticipatedScreen from "../../App/Screens/Participated/participated";
import {mapStateToProps, mapDispatchToProps} from '../../App/Screens/Participated';
import configureStore from "redux-mock-store";
import toJson from "enzyme-to-json";
import {createStore} from "redux";
import {CASE} from "../../App/Libs/Const";

jest.mock("react-native-orientation", () => require.requireActual("../../__mocks__/react-native-orientation").default);

describe("Screen >>> Participated", () => {
    const initialState = {
            Cases: {
                participated: [
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
            list: CASE.PARTICIPATED,
            Screens: {
                All: {
                    disabledItemList: false
                }
            },
            Net: {
                isConnected: true
            }
        },
        goToNewCases = jest.fn(),
        requestCasesPartcipated = jest.fn(),
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
        viewParticipated,
        viewParticipatedOffline;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(
            <Participated
                requestCasesPartcipated={requestCasesPartcipated}
                userInfoRequest={userInfoRequest}
                reset={jest.fn()}
                routeName={routeName}
                store={store}
            />
        );
        viewParticipated = shallow(
            <ParticipatedScreen
                navigation={navigation}
                isConnected={true}
                goToNewCases={goToNewCases}
                requestCasesPartcipated={requestCasesPartcipated}
                routeName={routeName}
                reset={jest.fn()}
                store={store}
            />
        );
        viewParticipatedOffline = shallow(<ParticipatedScreen navigation={navigation} isConnected={false} routeName={routeName} />);
    });

    /**
     * Render test
     */
    it("Render participated correctly", () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(ParticipatedScreen.navigationOptions({navigation}).title)
            .toEqual("menu_drawer_main_menu_item_participated");
        expect(ParticipatedScreen.navigationOptions({navigation}).headerTintColor)
            .toEqual("#FFF");
        expect(ParticipatedScreen.navigationOptions({navigation}).headerStyle)
            .toEqual({backgroundColor: "#1F6CBC"});
        expect(ParticipatedScreen.navigationOptions({navigation}).headerRight).toMatchSnapshot();
    });

    it('mapStateToProps', () => {
        expect(container.props('children').requestCasesPartcipated()).toMatchSnapshot();
        expect(container.props('children').userInfoRequest()).toMatchSnapshot();
        expect(container.props('children').routeName()).toMatchSnapshot();
        expect(container.props('children').reset()).toMatchSnapshot();
    });

    it("Should call navigationOptions method", () => {
        expect(viewParticipated.instance().navigationOptions).toBeUndefined();
    });

    it("Props coverage cases", () => {
        expect(container.prop("cases")).toEqual(initialState.Cases);
    });

    it("Props coverage disableItemList", () => {
        expect(container.prop("disableItemList")).toEqual(initialState.Screens.All.disableItemList);
    });

    it("Props coverage componentWillReceiveProps", () => {
        viewParticipated.instance().componentWillReceiveProps({
            cases: {
                participated: initialState.Cases.participated
            },
            list: CASE.PARTICIPATED,
            disableItemList: initialState.Screens.All.disableItemList
        });
        expect(viewParticipated.instance().state.participatedRequested).toEqual(true);
        viewParticipated.instance().componentWillReceiveProps({
            cases: {
                users: initialState.Cases.users
            },
            list: CASE.PARTICIPATED,
            disableItemList: initialState.Screens.All.disableItemList
        });
        viewParticipated.instance().setState({usersRequested: false});
        viewParticipated.instance().componentWillReceiveProps({
            cases: {
                participated: {response: []},
                users: initialState.Cases.users
            },
            list: CASE.PARTICIPATED,
            disableItemList: initialState.Screens.All.disableItemList
        });
        expect(viewParticipated.instance().state.usersRequested).toEqual(false);
    });

    it("Should call onRefresh method", () => {
        expect(viewParticipated.instance().onRefresh()).toMatchSnapshot();
        expect(viewParticipated.instance().onRefresh({nativeEvent: {text: "abc"}})).toMatchSnapshot();
        expect(viewParticipatedOffline.instance().onRefresh()).toMatchSnapshot();
    });

    it("Should call changeLayout method", () => {
        viewParticipated.instance().changeLayout();
        expect(viewParticipated.instance().state.middleHeight).toEqual(617);
    });

    it("Should call goToNewCases method", () => {
        expect(viewParticipated.instance().goToNewCases()).toMatchSnapshot();
    });

    it("Should call refresh method of FlatList component", () => {
        const flatList = viewParticipated.props("children").children[0];
        expect(flatList.props.renderItem({})).toMatchSnapshot();
        expect(flatList.props.onRefresh()).toMatchSnapshot();
    });

    it("Should call refresh method of FAB component", () => {
        const floatActionButton = viewParticipated.props("children").children[1];
        expect(floatActionButton.props.onClickAction()).toMatchSnapshot();
    });
});
