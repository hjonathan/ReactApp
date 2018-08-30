import {StyleSheet} from "react-native";

export default StyleSheet.create({
    button: {
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    text: {
        color: "#FFFFFF",
        fontWeight: "bold"
    },
    container: {
        paddingHorizontal: 14
    },
    icon: {
        flexBasis: 41,
        flexGrow: 0,
        flexShrink: 0
    },
    customButton: {
        backgroundColor: "#4285F4",
        flexDirection: "row",
        alignItems: "center",
        height: 41
    },
    label: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 14
    }
});
