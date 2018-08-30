import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FFF",
        borderRadius: 6,
        overflow: "hidden"
    },
    firstSection: {
        flexDirection: "row",
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 8
    },
    secondSection: {
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        flexDirection: "column",
        paddingHorizontal: 10
    },
    caseNumber: {
        color: "#2796ea",
        fontWeight: "bold",
        fontSize: 10,
        paddingHorizontal: 3,
        textAlign: "right"
    },
    processName: {
        color: "#000",
        fontWeight: "bold",
        padding: 1,
        fontSize: 18
    },
    dateDetail: {
        color: "gray",
        fontSize: 12
    },
    taskDetail: {
        color: "#000",
        fontSize: 16
    },
    statusSection: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 3,
        padding: 3,
        margin: 1
    },
    circleImage: {
        borderRadius: 100,
        width: 36,
        height: 36,
        resizeMode: "cover"
    },
    circleImageContainer: {
        backgroundColor: Res.colors.mainColor,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36
    },
    userName: {
        color: "#000",
        paddingHorizontal: 8,
        paddingVertical: 6
    },
    controlGroup: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        paddingTop: 5,
        width: "100%"
    },
    controls: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    availableOffline: {
        flexDirection: "row",
        flex: 1,
        paddingTop: 5,
        paddingBottom: 10,
        alignItems: "center"
    },
    textOffline: {
        color: Res.colors.successColor,
        justifyContent: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 6
    }
});
