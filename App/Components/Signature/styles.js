import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 5,
        backgroundColor: "white"
    },
    modalOptions: {
        padding: 4,
        borderColor: Res.colors.gray,
        borderBottomWidth: 2,
        flexDirection: "row"
    },
    buttonStyle: {
        margin: 4
    },
    modalSignature: {
        flex: 1,
        flexDirection: "row"
    },
    signature: {
        borderColor: Res.colors.lightColor,
        borderWidth: 1,
        flex: 1,
        width: null,
        height: null
    }
});
