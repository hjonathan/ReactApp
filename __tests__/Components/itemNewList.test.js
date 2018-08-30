import 'react-native';
import React from 'react';
import ItemNewList from '../../App/Components/ItemNewList';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Test of new item card for list', () => {

    let store, container;
    const parent = {
            navigation: {
                dispatch: () => {
                },
                state: {
                    routeName: 'Participated'
                }
            }
        },
        initialState = {
            data: {
                autoRoot: "FALSE",
                forms: [{
                    description: "",
                    formId: "",
                    formUpdateDate: "2018-01-18T00:23:52+00:00",
                    index: 1,
                    stepCondition: "",
                    stepId: "",
                    stepMode: "",
                    stepPosition: 1,
                    stepUidObj: "",
                    title: "",
                    triggers: {before: false, after: false}
                }
                ],
                offlineEnabled: "",
                processId: "",
                taskId: "test Task ID",
                text: ""
            },
            progress: ''
        },
        mockStore = configureStore();

    beforeEach(() => {
        store = mockStore(initialState)
        container = shallow(<ItemNewList store={store} parent={parent}/>)
    });

    it('render Item correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });

    it('Check Prop matches with initialState', () => {
        expect(container.instance().state.data.autoRoot).toEqual('FALSE');
    });

    it('goToFormRender function', () => {
        expect(container.instance().goToFormRender()).toMatchSnapshot();
    });
})