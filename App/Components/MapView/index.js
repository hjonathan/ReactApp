import React, {Component} from "react";
import {View, TouchableOpacity} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";
import * as Res from "../../Assets/resources";
import Styles from "./styles";

let that = null;

const defaultRegion = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.03901,
    longitudeDelta: 0.03003
};

/**
 * MapViewer class
 * Example:
 *      import MapViewer from "../../Components/MapView";
 *
 *      class Map extends component {
 *          render () {
 *              return (
 *                  <MapViewer ...props onError={someFunction}/>
 *              );
 *          }
 *      }
 */
class MapViewer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            region: defaultRegion,
            coordinate: {
                latitude: defaultRegion.latitude,
                longitude: defaultRegion.longitude
            },
            extraData: null,
            error: null
        };
    }

    /**
     * Initializes coordinates
     */
    componentDidMount () {
        that = this;
        this.getCurrentLocation();
    }

    /**
     * Sets marker position
     * @param event
     */
    onPress (event) {
        const {coordinate} = event.nativeEvent;
        that.marker._component.animateMarkerToCoordinate(coordinate, 300);
        that.setState({coordinate});
    }

    /**
     * Sets region
     * @param region
     */
    onChangeRegion (region) {
        that.setState({region});
    }

    /**
     * Gets current coordinates
     * @returns {{}}
     */
    getLastPosition () {
        return Object.assign({}, this.state.coordinate, this.state.extraData);
    }

    /**
     * Gets the current position
     */
    getCurrentLocation () {
        try {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: defaultRegion.latitudeDelta,
                        longitudeDelta: defaultRegion.longitudeDelta
                    },
                    coordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    extraData: {
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        render: true
                    }
                });
            }, this.errorEvent);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Listens an error event
     * @param error
     */
    errorEvent (error) {
        if (that.props.onError) {
            that.props.onError(error);
        }
    }

    /**
     * Renders location button
     * @returns {*}
     */
    renderLocationButton () {
        return (
            <View style={Styles.locationButton}>
                <TouchableOpacity
                    onPress={() => {
                        this.getCurrentLocation();
                    }}
                >
                    <MaterialIcon name="gps-fixed" style={{fontSize: 22}} />
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * Renders mapView
     * @returns {*}
     */
    renderMap () {
        return (
            <MapView
                ref={(map) => {
                    this.map = map;
                }}
                provider={PROVIDER_GOOGLE}
                style={Styles.mapView}
                initialRegion={this.state.region}
                region={this.state.region}
                onRegionChangeComplete={this.onChangeRegion}
                onPress={this.onPress}
                showsUserLocation
                showsMyLocationButton={false}
                followUserLocation
                loadingEnabled
                zoomEnabled
                pitchEnabled
            >
                <Marker.Animated
                    ref={(marker) => {
                        this.marker = marker;
                    }}
                    image={Res.images.pin}
                    coordinate={this.state.coordinate}
                />
            </MapView>
        );
    }

    /**
     * Renders component
     * @returns {*}
     */
    render () {
        return (
            <View style={{flex: 1}}>
                {this.renderLocationButton()}
                {this.state.region.latitude && this.state.coordinate.latitude
                    ? this.renderMap()
                    : <View style={Styles.emptyLayout} />}
            </View>
        );
    }
}

export default MapViewer;
