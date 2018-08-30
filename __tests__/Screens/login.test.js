import React from 'react'
import {shallow} from 'enzyme';
import ConnectedLogin from '../../App/Screens/Login';
import {Login} from '../../App/Screens/Login/login';
import LoginScreen from '../../App/Screens/Login/login';
import configureStore from 'redux-mock-store'
jest.mock('react-native-google-signin', () => require.requireActual('../../__mocks__/react-native-google-signin').default);
jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);
import Orientation from 'react-native-orientation';
jest.mock('react-native-push-notification', () => require.requireActual('../../__mocks__/react-native-push-notification').default);
import PushNotification from 'react-native-push-notification';

import {createStore} from 'redux'

describe('Screen >>> Login', () => {
    const initialState = {
            Oauth: {
                error: {
                    error: "error",
                    error_description: "error_description"
                }
            },
            username: "",
            password: "",
            user: null,
            errorUserName: true,
            errorPassWord: true,
            loader: false,
            toastMessage: null
        },
        middlewares = [],
        mockStore = configureStore(middlewares),
        navigation = {
            dispatch: jest.fn(),
        };
    let store, container, viewLogin;
    const onLogin = () => {
        },
        signInGoogle = () => {
        },
        signOutGoogle = () => {
        },
        setupGoogleSignIn = () => {
        },
        _errorViewForm = () => {
        };

    beforeEach(() => {
        store = mockStore(initialState)
        container = shallow(<ConnectedLogin store={store}/>)
        viewLogin = shallow(<LoginScreen navigation={navigation} Orientation={Orientation} onLogin={onLogin} signInGoogle={signInGoogle}
                                         signOutGoogle={signOutGoogle} setupGoogleSignIn={setupGoogleSignIn}
                                         _errorViewForm={_errorViewForm} store={store} />)
    });

    it('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });

    it('mapStateToProps', () => {
        expect(container.props('children').onLogin()).toMatchSnapshot();
        expect(container.props('children').requestUserData()).toMatchSnapshot();
        expect(container.props('children').saveTokenStorage()).toMatchSnapshot();
        expect(container.props('children').signInGoogle()).toMatchSnapshot();
        expect(container.props('children').setupGoogleSignIn()).toMatchSnapshot();
        expect(container.props('children').signOutGoogle()).toMatchSnapshot();
    });

    it('Check Prop matches with initialState', () => {
        expect(container.prop('error')).toEqual({
            error: "error",
            error_description: "error_description"
        });
    });

    it('Props coverage componentWillReceiveProps', () => {
        viewLogin.instance().componentWillReceiveProps({
            error: "error",
            error_description: "error_description",
            isLoggedIn: true
        });
        expect(viewLogin.instance().state.errorPassWord).toEqual(true);
    });

    it('Props coverage componentDidUpdate', () => {
        viewLogin.instance().refs = {
            toast: {
                show: (text) => {}
            }
        };
        viewLogin.setState({toastMessage: "TestToast"});
        viewLogin.instance().componentDidUpdate();
        expect(viewLogin.instance().state.toastMessage).toEqual("TestToast");
    });

    it("Should call onChangeUser method", () => {
        expect(viewLogin.instance().onChangeUser("testUser")).toBeUndefined();
        expect(viewLogin.state().errorUserName).toEqual(true);
        expect(viewLogin.state().username).toEqual("testUser");
    });

    it("Should call onChangePassword method", () => {
        expect(viewLogin.instance().onChangePassword("testPass")).toBeUndefined();
        expect(viewLogin.state().errorPassWord).toEqual(true);
        expect(viewLogin.state().password).toEqual("testPass");
    });

    it("Should call onLogin method", () => {
        viewLogin.setState({username: "TestUser", password: "TestPass"});
        expect(viewLogin.instance().onLogin()).toBeUndefined();
        expect(viewLogin.state().loader).toEqual(true);
    });

    it("Should call setupGoogleSignIn method", () => {
        expect(viewLogin.instance().setupGoogleSignIn()).toBeUndefined();
    });

    it("Should call signInGoogle method", () => {
        expect(viewLogin.instance().signInGoogle()).toBeUndefined();
    });

    it("Should call signOutGoogle method", () => {
        expect(viewLogin.instance().signOutGoogle()).toBeUndefined();
    });

    it('Should call  initNotification method', () => {
        expect(viewLogin.instance().initNotification()).toEqual(PushNotification);
    });

    it("Should call _renderErrorUser method", () => {
        expect(viewLogin.instance()._renderErrorUser()).toBeNull();
        viewLogin.setState({errorUserName: null});
        expect(viewLogin.instance()._renderErrorUser()).toMatchSnapshot();
    });

    it("Should call _renderErrorPass method", () => {
        expect(viewLogin.instance()._renderErrorPass()).toBeNull();
        viewLogin.setState({errorPassWord: null});
        expect(viewLogin.instance()._renderErrorPass()).toMatchSnapshot();
    });

    it("Should call goToSettings method", () => {
        expect(viewLogin.instance().goToSettings()).toBeUndefined();
    });

    it('Should call _errorViewForm method', () => {
        expect(viewLogin.instance()._errorViewForm).toMatchSnapshot();
    });

    it('Should call renderLogo method', () => {
        expect(viewLogin.instance().renderLogo).toMatchSnapshot();
    });

    it('Should call renderDivider method', () => {
        expect(viewLogin.instance().renderDivider).toMatchSnapshot();
    });

    it('Should call renderForm method', () => {
        expect(viewLogin.instance().renderForm).toMatchSnapshot();
    });
});
