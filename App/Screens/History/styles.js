import {StyleSheet} from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 8,
        backgroundColor: "#2B6697"
    },
    imageSection: {
        borderRadius: 5,
        marginHorizontal: 16,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    circleImageContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50
    },
    circleImage: {
        width: 50,
        height: 50,
        resizeMode: "cover"
    }
});
