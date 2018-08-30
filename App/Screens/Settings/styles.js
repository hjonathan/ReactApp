import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    mainContainer: {
        padding: 16
    },
    sectionTitle: {
        fontSize: 14,
        color: Res.colors.teal,
        fontWeight: "bold"
    },
    fieldContainer: {
        paddingVertical: 12
    },
    fieldTitle: {
        fontSize: 16,
        color: "#000"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#ccc"
    },
    inputText: {
        color: "#000",
        fontSize: 16
    },
    disabled: {
        color: "#ccc"
    }
});
