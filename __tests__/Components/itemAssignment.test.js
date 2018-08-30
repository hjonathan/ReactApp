import 'react-native';
import React from 'react';
import ItemAssignment from '../../App/Components/ItemAssignment';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Test of item assignment for list', () => {
    let container;
    const data = {
            users: [
                {
                    userId: "00000001",
                    userFullName: "Test 0001"
                }
            ],
            taskId: "10000000",
        },
        addUserId = jest.fn();

    beforeEach(() => {
        container = shallow(
            <ItemAssignment
                data={data}
                addUserId={addUserId}
            />
        );
    });

    it('render Item correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });

    it('Check Prop matches with data', () => {
        expect(container.instance().state.data).toEqual(data);
    });

    it('addUserId function', () => {
        expect(container.instance().props.addUserId()).toMatchSnapshot();
    });
});
