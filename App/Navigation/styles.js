import {StyleSheet} from "react-native";
import * as Res from "../Assets/resources";

export default StyleSheet.create({
    contentHeader: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16
    },
    avatarContainer: {
        borderRadius: 25,
        overflow: "hidden",
        width: 50,
        height: 50,
        backgroundColor: Res.colors.mainColor
    },
    avatar: {
        borderRadius: 25,
        overflow: "hidden",
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: Res.colors.white
    },
    userInfo: {
        color: Res.colors.white,
        fontSize: 16,
        paddingHorizontal: 24
    },
    divider: {
        backgroundColor: Res.colors.divider,
        width: "100%",
        height: 3,
        marginVertical: 5
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
    modalTextTitle: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        justifyContent: "center",
        paddingTop: 10,
        fontWeight: "bold"
    },
    modalTextContainer: {
        textAlign: "center"
    },
    modalFooter: {
        height: 48,
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    buttonContainer: {
        width: "100%"
    },
    okButton: {
        flex: 1,
        backgroundColor: Res.colors.successColor,
        alignItems: "center",
        justifyContent: "center"
    },
    cancelButton: {
        flex: 1,
        backgroundColor: Res.colors.dangerColor,
        alignItems: "center",
        justifyContent: "center"
    },
    logOutContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    logOutSubContainer: {
        width: "75%",
        flexDirection: "column",
        justifyContent: "center"
    },
    logOutHeader: {
        height: 48,
        backgroundColor: Res.colors.lightColor,
        alignItems: "center",
        justifyContent: "center"
    },
    logOutBody: {
        height: 48,
        backgroundColor: Res.colors.white,
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    logOutFooter: {
        height: 48,
        justifyContent: "flex-end",
        flexDirection: "row"
    }
});
