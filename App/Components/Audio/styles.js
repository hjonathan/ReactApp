import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    panelContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "center"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Res.colors.lightColor,
        height: 38,
        padding: 8
    },
    headerTitle: {
        flex: 1,
        justifyContent: "center"
    },
    textTitle: {
        textAlign: "center",
        color: Res.colors.white
    },
    closeIcon: {
        color: Res.colors.white,
        fontSize: 28
    },
    subContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        backgroundColor: Res.colors.white,
        padding: 16
    },
    buttonContainer: {
        flexWrap: "wrap",
        alignItems: "center",
        width: "33%"
    },
    button: {
        borderRadius: 8,
        padding: 4,
        backgroundColor: Res.colors.mainColor
    },
    buttonIcon: {
        color: Res.colors.white,
        fontSize: 36
    }
});
