import React from "react";
import {TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import Navigation from "../../App/Navigation";
import AppNavigation from "../../App/Navigation/navigation";
import NavigatorStack from "../../App/Navigation/navigationStack";
import BodyDrawer from "../../App/Navigation/bodyDrawer";
import NavigatorButton from "../../App/Components/NavigatorButton/NavigatorButton";

jest.mock('react-native-i18n', () => require.requireActual('../../__mocks__/react-native-i18n').default);

describe("Navigation", () => {
    const initialState = {
        Oauth: {
            isLoggedIn: true
        },
        Net: {
            isUploadCase: false
        },
        Cases: {
            routeName: "Test"
        }
    };
    const mockStore = configureStore(),
        dispatch = () => {
        },
        navigationState = {
            index: 0,
            routes: [
                {key: "WalkThrough", routeName: "WalkThrough"}
            ]
        },
        connectionChange = jest.fn(),
        uploadCase = jest.fn(),
        navigation = {
            dispatch: jest.fn(),
            state: {
                params: {
                    userData: null
                }
            },
            closeDrawer: jest.fn()
        };
    let store,
        connect,
        viewAppNavigation,
        navigationStack,
        viewBodyDrawer;

    beforeEach(() => {
        store = mockStore(initialState);
        // navigationReducer.reduxifyNavigator = jest.fn();
        connect = shallow(
            <Navigation
                store={store}
                dispatch={jest.fn()}
                navigationState={navigationState}
            />
        );
        viewAppNavigation = shallow(
            <AppNavigation
                store={store}
                dispatch={jest.fn()}
                navigationState={navigationState}
                connectionChange={connectionChange}
                uploadCase={uploadCase}
            />
        );
        viewBodyDrawer = shallow(<BodyDrawer navigation={navigation} />);
        navigationStack = shallow(
            <NavigatorStack
                navigation={{dispatch, state: navigationState}}
            />
        );
        viewBodyDrawer.setState({modalVisible: false});
        viewBodyDrawer.setState({modalVisibleLogOut: false});
    });

    /**
     * Render test
     */
    test('Render connect navigation', () => {
        expect(toJson(connect)).toMatchSnapshot();
    });

    test('mapStateToProps', () => {
        expect(connect.props('children').connectionChange()).toMatchSnapshot();
        expect(connect.props('children').syncUp()).toMatchSnapshot();
        expect(connect.props('children').uploadCase()).toMatchSnapshot();
    });

    test("Props coverage componentWillMount", () => {
        expect(viewAppNavigation.instance().componentWillMount()).toBeUndefined();
    });

    test("Props coverage componentDidMount", () => {
        expect(viewAppNavigation.instance().componentDidMount()).toBeUndefined();
    });

    test("Props coverage componentWillUnmount", () => {
        expect(viewAppNavigation.instance().componentWillUnmount()).toBeUndefined();
    });

    test("Props coverage initPreferences", async () => {
        expect(viewAppNavigation.instance().onBackPress()).toEqual(false);
        viewAppNavigation.setProps({navigationState: {index: 2}});
        expect(viewAppNavigation.instance().onBackPress()).toEqual(true);
        viewAppNavigation.setProps({
            navigationState: {
                index: 2,
                routes: []
            },
            routeName: "Test"
        });
        expect(viewAppNavigation.instance().onBackPress()).toEqual(true);
    });

    test("Props coverage initPreferences", async () => {
        expect(await viewAppNavigation.instance().initPreferences()).toBeUndefined();
    });

    test("Props coverage init", async () => {
        expect(await viewAppNavigation.instance().init()).toBeUndefined();
    });

    test("Props coverage handleConnectionChange", async () => {
        viewAppNavigation.setProps({isLoggedIn: true, isUploadCase: false});
        viewAppNavigation.setState({queue: {createJob: jest.fn()}});
        expect(await viewAppNavigation.instance().handleConnectionChange(true)).toBeUndefined();
    });

    test("Props coverage BodyDrawer >> closeModal", () => {
        expect(viewBodyDrawer.instance().closeModal()).toBeUndefined();
    });

    test("Props coverage BodyDrawer >> closeModalLogOut", () => {
        expect(viewBodyDrawer.instance().closeModalLogOut()).toBeUndefined();
    });

    test("Props coverage BodyDrawer >> closeBodyDrawer", () => {
        expect(viewBodyDrawer.instance().closeBodyDrawer()).toBeUndefined();
    });

    test("Props coverage BodyDrawer >> renderHeader", () => {
        viewBodyDrawer.setProps({
            navigation: {
                state: {
                    params: {
                        userData: {
                            userPhoto: "picture",
                            lastName: "Test",
                            firstName: "Test"
                        }
                    }
                }
            }
        });
        expect(toJson(viewBodyDrawer.instance().renderHeader())).toMatchSnapshot();
    });

    test("Props coverage BodyDrawer >> renderSubItems", () => {
        const viewJson = toJson(viewBodyDrawer.instance().renderSubItems());
        expect(viewJson).toMatchSnapshot();
        expect(viewBodyDrawer.find(NavigatorButton).length).toEqual(4);
        viewBodyDrawer.find(NavigatorButton).at(0).props().onPress();
        viewBodyDrawer.find(NavigatorButton).at(1).props().onPress();
        viewBodyDrawer.find(NavigatorButton).at(2).props().onPress();
        viewBodyDrawer.find(NavigatorButton).at(3).props().onPress();
    });

    test("Props coverage BodyDrawer >> renderModal", () => {
        viewBodyDrawer.setState({modalVisible: true});
        const viewJson = toJson(viewBodyDrawer.instance().renderModal());
        expect(viewJson).toMatchSnapshot();
        expect(viewBodyDrawer.find(TouchableOpacity).length).toEqual(3);
        viewBodyDrawer.find(TouchableOpacity).at(0).props().onPress();
        viewBodyDrawer.find(Modal).first().simulate('RequestClose')
    });

    test("Props coverage BodyDrawer >> renderModalLogOut", () => {
        viewBodyDrawer.setState({modalVisibleLogOut: true});
        let logOutModal = viewBodyDrawer.instance().renderModalLogOut(),
            footer = logOutModal.props.children.props.children.props.children[2],
            buttonCancel = footer.props.children[0].props.children,
            buttonOk = footer.props.children[1].props.children;
        expect(buttonOk.props.onPress()).toMatchSnapshot();
        expect(buttonCancel.props.onPress()).toMatchSnapshot();
        expect(logOutModal).toMatchSnapshot();
        viewBodyDrawer.instance().setState({modalVisibleLogOut: false});
        expect(logOutModal).toMatchSnapshot();
    });

    test('Render stack navigation', () => {
        expect(toJson(NavigatorStack)).toMatchSnapshot();
    });
});
