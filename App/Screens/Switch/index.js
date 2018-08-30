import {connect} from "react-redux";
import SwitchScreen from "./switch";

/**
 * Return state from Store to View Component
 * @param state
 */
const mapStateToProps = state => ({
        isLoggedIn: state.Oauth.isLoggedIn
    }),
    mapDispatchToProps = dispatch => ({
        dispatch
    });

export default connect(mapStateToProps, mapDispatchToProps)(SwitchScreen);
