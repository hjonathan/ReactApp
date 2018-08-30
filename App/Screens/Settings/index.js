import {connect} from "react-redux";
import Settings from "./settings";
import actions from "../../Actions";

/**
 * Return the state form store to props of screen
 * @param state
 * @returns {{error: null, server: null}}
 */
const mapStateToProps = state => ({
    isLoggedIn: state.Oauth.isLoggedIn,
    error: state.Settings.error || null,
    server: state.Settings.server || null,
    progressShow: state.Net.progressShow,
    isConnected: state.Net.isConnected
});

/**
 * Map methods handlers with the component view
 * @param dispatch
 */
const mapDispatchToProps = dispatch => ({
    updateUrl: url => dispatch(actions.settings.updateUrl({url})),
    updateWorkspace: workspace => dispatch(actions.settings.updateWorkspace({workspace})),
    syncDown: () => dispatch(actions.net.syncDown.request())
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
