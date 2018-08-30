import React, {Component} from "react";
import {Platform, StatusBar, I18nManager, NetInfo, BackHandler} from "react-native";
import {NavigationActions} from "react-navigation";
import queueFactory from "react-native-queue";
import _ from "lodash";
import * as Res from "../Assets/resources";
import {AppNavigator} from "./navigationStack";
import Utils from "../Utils";
import Actions from "../Actions";
import I18n from "../I18n";
import defaultPreferences from "../conf.json";

/**
 * Class App Navigation
 */
class AppNavigation extends Component {
    constructor (props) {
        super(props);
        this.state = {
            queue: null
        };
        this.init();
    }

    /**
     * Gets current language and set default language
     */
    componentWillMount () {
        this.initPreferences();
    }

    /**
     * Gets current platform OS and version
     * then sets StatusBar Color only on Android
     */
    componentDidMount () {
        if (Platform.OS === "android" && Platform.Version >= 21) {
            StatusBar.setBackgroundColor(Res.colors.darkColor);
        }
        NetInfo.isConnected.addEventListener("connectionChange", this.handleConnectionChange);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    /**
     * Component is being removed
     */
    componentWillUnmount () {
        NetInfo.isConnected.removeEventListener("connectionChange", this.handleConnectionChange);
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    /**
     * Is press Back button
     * @returns {boolean}
     */
    onBackPress = () => {
        const {dispatch, navigationState, routeName} = this.props;
        let objectRoute,
            routes;
        if (navigationState.index === 0) {
            return false;
        }
        if (routeName) {
            objectRoute = Utils.findRouteByRouteName(navigationState, routeName);
            routes = objectRoute ? _.last(objectRoute.routes) : {};
            if (Object.prototype.hasOwnProperty.call(routes, "routeName") &&
                routes.routeName === "FormRender") {
                dispatch(Actions.formRender.backButtonPressed());
                return true;
            }
        }
        dispatch(NavigationActions.back());
        return true;
    };

    /**
     * Initializes user settings
     */
    async initPreferences () {
        const serverUrl = await Utils.getItem("@server"),
            workspace = await Utils.getItem("@workspace"),
            language = await Utils.getItem("@lang");

        if (!serverUrl) {
            Utils.setItem("@server", defaultPreferences.server);
        }
        if (!workspace) {
            Utils.setItem("@workspace", defaultPreferences.workspace);
        }
        if (!language) {
            Utils.setItem("@lang", defaultPreferences.lang);
        }
        I18n.defaultLocale = language || defaultPreferences.lang;
        I18n.locale = language || defaultPreferences.lang;
        I18nManager.forceRTL(I18n.locale === "ar");
    }

    /**
     * Initialized queue parameters
     * @returns {Promise<void>}
     */
    async init () {
        const queue = await queueFactory();
        // Job for sync with server
        queue.addWorker("sync-up", async (id, payload) => {
            await this.props.syncUp();
        });
        // Start queue to process any jobs that hadn't finished when app was last closed.
        queue.start();
        // Attach initialized queue to state.
        this.setState({
            queue
        });
    }

    /**
     * Change the status connection
     * @param isConnected
     */
    handleConnectionChange = async (isConnected) => {
        let existMainFile = await Utils.wasCleaned();
        this.props.connectionChange(isConnected);
        if (isConnected && this.props.isLoggedIn && !this.props.isUploadCase) {
            this.props.uploadCase(true);
            this.state.queue.createJob("sync-up");
            if (!existMainFile) {
                this.props.dispatch(Actions.fs.app.buildProd.download());
            }
        }
    };

    /**
     * Renders
     * @returns {*}
     */
    render () {
        return (
            <AppNavigator />
        );
    }
}

export default AppNavigation;
