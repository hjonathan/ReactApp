import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: "#2B6697"
    },
    container: {
        flex: 1,
        height: 500
    },
    modalContainer: {
        flexDirection: "column",
        borderRadius: 5,
        backgroundColor: "white"
    },
    modalTitle: {
        height: 48,
        backgroundColor: Res.colors.lightColor
    },
    routeTitle: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        justifyContent: "center",
        paddingTop: 10,
        fontWeight: "bold"
    },
    modalFooter: {
        height: 48,
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    buttonContainer: {
        width: "50%"
    },
    cancelButton: {
        flex: 1,
        backgroundColor: Res.colors.dangerColor,
        alignItems: "center",
        justifyContent: "center"
    },
    successButton: {
        flex: 1,
        backgroundColor: Res.colors.successColor,
        alignItems: "center",
        justifyContent: "center"
    },
    headerMap: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Res.colors.lightColor,
        padding: 8
    },
    iconMap: {
        color: Res.colors.white,
        fontSize: 28
    },
    settingsContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    settingsSubContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "center"
    },
    settingsHeader: {
        height: 48,
        backgroundColor: Res.colors.lightColor,
        alignItems: "center",
        justifyContent: "center"
    },
    settingsBody: {
        height: 48,
        backgroundColor: Res.colors.white,
        alignItems: "center",
        justifyContent: "center"
    },
    settingsFooter: {
        height: 48,
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    progressContainer: {
        flexDirection: "row",
        backgroundColor: Res.colors.white,
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    progressText: {
        width: 150,
        alignItems: "center"
    },
    icon: {
        paddingRight: 15,
        paddingBottom: 25,
        paddingTop: 25
    }
});
