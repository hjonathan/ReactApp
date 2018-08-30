import 'react-native';
import React from 'react';
import ManualAssignment from '../../App/Components/ManualAssignment';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Test of new item card for list', () => {
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
            <ManualAssignment
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
    it('onValueChange function', () => {
        expect(container.instance().onValueChange("00001/10000")).toMatchSnapshot();
        expect(container.instance().state.itemValue).toEqual("00001/10000");
    });
});
