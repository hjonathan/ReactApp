import 'react-native';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import GoogleSignInButton from '../../App/Components/GoogleSignInButton';

describe('Component >>> GoogleSignInButton', () => {
    let defaultFlatButton,
        customFlatButton;

    const props = {
        params: {
            backgroundColor: "#4285F4",
            color: "#f0fc"
        },
        onPress: () => {}
    };

    beforeEach(() => {
        defaultFlatButton = shallow(<GoogleSignInButton params={props.params} onPress={props.onPress} />);
        customFlatButton = shallow(<GoogleSignInButton title={""} onPress={props.onPress} />);
    });

    it('Render DefaultFlatButton', () => {
        expect(toJson(defaultFlatButton)).toMatchSnapshot();
    });

    it('Render CustomFlatButton', () => {
        expect(toJson(customFlatButton)).toMatchSnapshot();
    });
});
