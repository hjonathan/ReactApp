import {StyleSheet} from "react-native";
import * as Res from "../../Assets/resources";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 60,
        paddingVertical: 16,
        backgroundColor: Res.colors.mainColor
    },
    subContainer: {
        marginBottom: 6,
        marginTop: 6
    },
    logoContainer: {
        marginBottom: 16,
        justifyContent: "center",
        width: 220,
        height: 40
    },
    logo: {
        width: "100%",
        resizeMode: "contain"
    },
    fieldContainer: {
        alignContent: "center",
        marginBottom: 3,
        paddingTop: 10,
        zIndex: 0
    },
    textBox: {
        backgroundColor: "white",
        height: 40,
        borderWidth: 1.5,
        borderColor: "white",
        minWidth: 100
    },
    textBoxErr: {
        borderColor: "transparent"
    },
    textSectionStyle: {
        backgroundColor: "#fff",
        marginTop: 3,
        marginHorizontal: 14,
        height: 39
    },
    accept: {
        backgroundColor: Res.colors.successColor
    },
    icon: {
        color: "#fff",
        fontSize: 18,
        paddingLeft: 12,
        paddingRight: 12
    },
    container: {
        paddingBottom: 10,
        paddingTop: 10
    },
    googleSignInButton: {
        borderRadius: 2,
        height: 40,
        marginHorizontal: 14,
        justifyContent: "center"
    },
    iconErrorField: {
        margin: 5,
        marginTop: 2,
        height: 20,
        width: 20,
        resizeMode: "stretch",
        justifyContent: "flex-end"
    },
    textError: {
        marginTop: -3,
        backgroundColor: "black",
        color: "white",
        borderTopWidth: 2,
        borderTopColor: "red",
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 12,
        opacity: 0.8
    },
    arrowImageError: {
        width: 12,
        height: 12,
        marginTop: -9,
        marginRight: 7,
        resizeMode: "stretch"
    },
    viewContainerError: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginTop: 31,
        marginHorizontal: 14
    }
});
