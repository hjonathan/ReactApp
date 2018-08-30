import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    text: {
        color: "black",
        textAlign: "center",
        fontSize: 14,
        marginHorizontal: "10%"
    },
    dividerLine: {
        flex: 1,
        backgroundColor: Res.colors.gray,
        marginHorizontal: 8,
        height: 1
    }
});
