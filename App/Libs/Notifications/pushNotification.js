import PushNotification from "react-native-push-notification";
import {PushNotificationIOS, Platform} from "react-native";
import * as Res from "../../Assets/resources";
import defaultConfig from "../../conf.json";

export const configure = () => {
    PushNotification.configure({
        // (required)
        // Called when a remote or local notification is opened or received
        onNotification (notification) {
        // process the notification
        // build open case
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
            if (Platform.OS === "ios") {
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            }
        },
        senderID: defaultConfig.application.senderID,
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },
        popInitialNotification: true,
        requestPermissions: true
    });
    return PushNotification;
};
/**
 * Creates and shows a notification
 * @param params
 */
export const show = (params) => {
    let message = Object.prototype.hasOwnProperty.call(params, "error") && params.error !== null
        ? `Error to upload ${params.file.name}`
        : `${params.file.name} was uploaded`;
    PushNotification.localNotificationSchedule({
        id: "0001",
        color: Res.colors.mainColor,
        message,
        playSound: true,
        soundName: "default",
        date: new Date(Date.now())
    });
};
/**
 * Hide notification
 */
export const hide = () => {
    PushNotification.cancelLocalNotifications({id: "0001"});
};
/**
 * Hide all notifications
 */
export const hideAll = () => {
    PushNotification.cancelAllLocalNotifications();
};
