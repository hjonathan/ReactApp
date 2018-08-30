import 'react-native';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import FlatButton from '../../App/Components/FlatButton';

describe('Component >>> FlatButton', () => {
    let defaultFlatButton,
        customFlatButton;

    const props = {
        params: {
            radius: 5,
            border: 1,
            color: "red"
        },
        onPress: () => {}
    };

    beforeEach(() => {
        defaultFlatButton = shallow(<FlatButton params={props.params} onPress={props.onPress} />);
        customFlatButton = shallow(<FlatButton title={""} onPress={props.onPress} />);
    });

    it('Render DefaultFlatButton', () => {
        expect(toJson(defaultFlatButton)).toMatchSnapshot();
    });

    it('Render CustomFlatButton', () => {
        expect(toJson(customFlatButton)).toMatchSnapshot();
    });
});
