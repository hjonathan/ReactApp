import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: "#2B6697"
    },
    firstSection: {
        flexDirection: "row",
        padding: 8
    },
    secondSection: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        padding: 8
    },
    dividerLine: {
        flex: 1,
        backgroundColor: Res.colors.gray,
        marginHorizontal: 8,
        height: 1
    },
    circleImage: {
        borderRadius: 100,
        width: 36,
        height: 36,
        resizeMode: "cover"
    },
    circleImageContainer: {
        backgroundColor: Res.colors.mainColor,
        borderRadius: 50,
        width: 36,
        height: 36
    },
    userName: {
        flexWrap: "wrap",
        paddingHorizontal: 4,
        color: Res.colors.lightColor
    },
    leftAlign: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingRight: 4,
        width: "50%"
    },
    rightAlign: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingLeft: 4,
        width: "50%"
    }
});
