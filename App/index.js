/* eslint-disable react/display-name */
import React from "react";
import {Provider} from "react-redux";
import {YellowBox} from "react-native";
import Store from "./Store";
import AppNavigation from "./Navigation";
import {pushNotification} from "./Libs/Notifications";

pushNotification.configure();

YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module RCTImageLoader"]);

export default () => (
    <Provider store={Store}>
        <AppNavigation />
    </Provider>
);
