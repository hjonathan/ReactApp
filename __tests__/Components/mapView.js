import 'react-native';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import MapViewer from '../../App/Components/MapView';

describe('Component >>> mapView', () => {
    const defaultRegion = {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.03901,
            longitudeDelta: 0.03003
        },
        event = {
            nativeEvent: {
                coordinate: null
            }
        },
        marker = {
            _component: {
                animateMarkerToCoordinate: (coord, time) => {}
            }
        },
        onError = () => {};

    let mapView,
        mapViewDefault;

    beforeEach(() => {
        mapViewDefault = shallow(<MapViewer />);
        mapView = shallow(<MapViewer onError={onError} />);
    });

    test('Render mapView', () => {
        expect(toJson(mapView)).toMatchSnapshot();
        expect(toJson(mapViewDefault)).toMatchSnapshot();
    });

    test('onPress', () => {
        mapView.instance().marker = marker;
        mapView.instance().onPress(event);
        expect(mapView.instance().state.coordinate).toEqual(null);
    });

    test('onChangeRegion', () => {
        mapView.instance().onChangeRegion(defaultRegion);
        expect(mapView.instance().state.region).toEqual(defaultRegion);
    });

    test('getLastPosition', () => {
        expect(mapView.instance().getLastPosition()).toEqual({latitude: null, longitude: null});
    });

    test('errorEvent', () => {
        expect(mapViewDefault.instance().errorEvent({})).toMatchSnapshot();
        expect(mapView.instance().errorEvent({})).toMatchSnapshot();
    });

    test('renderLocationButton', () => {
        let locationButton = mapView.instance().renderLocationButton();
        expect(locationButton.props.children.props.onPress()).toMatchSnapshot();
    });

    test('renderMap', () => {
        mapView.instance().setState({
            region: {
                latitude: -16.003,
                longitude: 68.003,
                latitudeDelta: 0.03901,
                longitudeDelta: 0.03003
            }
        });
        let map = mapView.instance().renderMap(),
            marker = map.props.children;
        expect(marker.ref()).toMatchSnapshot();
    });
});
