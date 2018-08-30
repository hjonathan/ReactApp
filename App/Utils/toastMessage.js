import {Platform, ToastAndroid} from "react-native";

export default {
    /**
     * Shows a basic toast message only for android
     * @param options
     * Example:
     *      import Utils from "../Utils";
     *
     *      Utils.showToast({
     *          message: "This a simple message",
     *          duration: "SHORT" or "LONG"
     *      });
     */
    showToast (options) {
        if (Platform.OS === "android" && options && options.message) {
            ToastAndroid.show(
                options.message,
                ToastAndroid[options.duration] || ToastAndroid.SHORT
            );
        }
    },
    /**
     * Shows a toast message with gravity only for android
     * @param options
     * Example:
     *      import Utils from "../Utils";
     *
     *      Utils.showToastWithGravity({
     *          message: "This a simple message",
     *          duration: "SHORT" or "LONG",
     *          position: "TOP" or "CENTER" or "BOTTOM"
     *      });
     */
    showToastWithGravity (options) {
        if (Platform.OS === "android" && options && options.message && options.position) {
            ToastAndroid.showWithGravity(
                options.message,
                ToastAndroid[options.duration] || ToastAndroid.SHORT,
                ToastAndroid[options.position]
            );
        }
    }
};
