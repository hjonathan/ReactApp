import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    mapView: {
        flex: 1,
        zIndex: -1
    },
    locationButton: {
        width: 38,
        height: 38,
        borderRadius: 2,
        position: "absolute",
        right: 0,
        margin: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Res.colors.bgEmpty,
        zIndex: 2
    },
    emptyLayout: {
        flex: 1,
        backgroundColor: Res.colors.lightGray
    }
});
