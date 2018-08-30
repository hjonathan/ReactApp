import React from 'react'
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store'
import Switch from '../../App/Screens/Switch';
import SwitchScreen from '../../App/Screens/Switch/switch';

describe('Screen >>> Switch', () => {
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
            navigate: jest.fn()
        };
    let store, container, viewSwitch;
    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<Switch store={store} navigation={navigation} />);
        viewSwitch = shallow(<SwitchScreen store={store} navigation={navigation} />);
    });

    test('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1);
    });

    test('Should call bootstrapAsync method', async () => {
        expect(await viewSwitch.instance().bootstrapAsync()).toBeUndefined();
    });
});
