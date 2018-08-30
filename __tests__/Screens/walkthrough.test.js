import 'react-native';
import React from 'react';
import WalkThrough from '../../App/Screens/WalkThrough';
import WalkThroughScreen from '../../App/Screens/WalkThrough/walkthrough';
import toJson from 'enzyme-to-json';
import {shallow} from "enzyme/build/index";

jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);

/**
 * This test is related to the render of the WalkThrough view.
 */
describe('Screen >>> Walkthrough', () => {
    const navigation = {
        dispatch: () => {}
    };
    let container, view;
    beforeEach(() => {
        container = shallow(<WalkThrough />);
        view = shallow(<WalkThroughScreen navigation={navigation}/>);
    });

    it('Render WalkThrough correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(WalkThroughScreen.navigationOptions({navigation}).header)
            .toEqual(null);
    });

    it('Render animation (first slide)', () => {
        expect(toJson(view.instance().onChangeView(0))).toMatchSnapshot();
    });
    it('Render animation (second slide)', () => {
        expect(toJson(view.instance().onChangeView(1))).toMatchSnapshot();
    });
    it('Render animation (third slide)', () => {
        expect(toJson(view.instance().onChangeView(2))).toMatchSnapshot();
    });
    it('Render animation (fourth slide)', () => {
        expect(toJson(view.instance().onChangeView(3))).toMatchSnapshot();
    });

    it('WalkThrough navigates', () => {
        let swiper = view.props('children').children.props.children.props,
            lastChildren = swiper.children.length - 1;
        expect(toJson(swiper.onChangeIndex())).toMatchSnapshot();
        expect(toJson(swiper.onMomentumScrollBegin())).toMatchSnapshot();
        expect(toJson(view.props('children').onLayout())).toMatchSnapshot();
        expect(toJson(swiper.children[lastChildren]
            .props.children[1].props.children.props.onPress())).toMatchSnapshot();
    });
});
