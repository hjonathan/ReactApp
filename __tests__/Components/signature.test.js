import 'react-native';
import React from 'react';
import {Button} from "react-native";
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import Signature from '../../App/Components/Signature';

jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);

describe('Component >>> Signature', () => {
    const changeSignature = () => {};
    const sendSignature = () => {};
    let signatureView;
    beforeEach(() => {
        signatureView = shallow(<Signature changeSignature={changeSignature} sendSignature={sendSignature}/>);
    });

    test('Render Signature', () => {
        expect(toJson(signatureView)).toMatchSnapshot();
    });

    test("Props coverage componentWillUnmount", () => {
        expect(signatureView.instance().componentWillUnmount()).toBeUndefined();
    });

    test('Signature test onCancelButton', () => {
        signatureView.instance().setState({orientation: "LANDSCAPE"});
        expect(toJson(signatureView.instance().onCancelButton())).toBeUndefined();
        signatureView.instance().setState({orientation: "PORTRAIT"});
        expect(toJson(signatureView.instance().onCancelButton())).toBeUndefined();
    });

    test('Signature test onResetButton', () => {
        signatureView.instance().signature = {
            resetImage: () => {}
        };
        expect(toJson(signatureView.instance().onResetButton())).toBeUndefined();
    });

    test('Signature test onSaveButton', () => {
        signatureView.instance().signature = {
            saveImage: () => {}
        };
        signatureView.instance().setState({orientation: "LANDSCAPE"});
        expect(toJson(signatureView.instance().onSaveButton())).toBeUndefined();
        signatureView.instance().setState({orientation: "PORTRAIT"});
        expect(toJson(signatureView.instance().onSaveButton())).toBeUndefined();
    });

    test('Signature test onSaveEvent', () => {
        expect(toJson(signatureView.instance().onSaveEvent())).toBeUndefined();
    });

    test('Signature test onDragEvent', () => {
        expect(toJson(signatureView.instance().onDragEvent())).toBeUndefined();
    });

    test('Signature test setSignatureRef', () => {
        expect(toJson(signatureView.instance().setSignatureRef({}))).toBeUndefined();
    });

    test("Signature test render", () => {
        const viewJson = toJson(signatureView.instance().render());
        expect(viewJson).toMatchSnapshot();
        signatureView.instance().signature = {
            resetImage: () => {},
            saveImage: () => {}
        };
        expect(signatureView.find(Button).length).toEqual(3);
        signatureView.find(Button).at(0).props().onPress();
        signatureView.find(Button).at(1).props().onPress();
        signatureView.find(Button).at(2).props().onPress();
    })
});
