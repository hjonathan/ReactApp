import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderRadius: 6,
        overflow: "hidden",
        alignItems: "center"
    },
    iconSection: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10
    },
    textSection: {
        paddingVertical: 13
    },
    circleImage: {
        width: 36,
        height: 36,
        resizeMode: "contain"
    },
    circleImageContainer: {
        backgroundColor: Res.colors.mainColor,
        borderRadius: 50,
        width: 36,
        height: 36
    },
    textNewCase: {
        color: "#000",
        paddingBottom: 3
    },
    controlGroup: {
        flex: 1,
        alignContent: "flex-end"
    },
    controls: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: 1
    },
    mainTopContainer: {
        flex: 1,
        margin: 3,
        borderRadius: 6,
        backgroundColor: "#FFF",
        shadowColor: "#000000",
        borderWidth: 1,
        borderColor: "#365173",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 2,
        shadowOpacity: 1
    },
    availableOffline: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    textOffline: {
        color: Res.colors.successColor,
        justifyContent: "flex-start",
        paddingLeft: 5
    }
});
