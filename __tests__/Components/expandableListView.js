import 'react-native';
import React from 'react';
import {RealmObject} from "../../App/Model/Schemas";
import ExpandableListView from '../../App/Components/ExpandableListView';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Test of Expandable List View card for list', () => {

    let store, container;
    const initialState = {
            title: "Test List"
        },
        mockStore = configureStore();

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<ExpandableListView store={store}/>)
    });

    afterAll(() => {
        RealmObject.close();
    });

    it('render Item correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });

    it('toggle function', () => {
        expect(container.instance().toggle()).toMatchSnapshot();
    });
})
