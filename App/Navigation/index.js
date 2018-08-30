import {connect} from "react-redux";
import Actions from "../Actions";
import AppNavigation from "./navigation";

const mapStateProps = state => ({
    navigationState: state.NavigationReducer,
    isLoggedIn: state.Oauth.isLoggedIn || false,
    isUploadCase: state.Net.isUploadCase || false,
    routeName: state.Cases.routeName
});

const mapDispatchToProps = dispatch => ({
    connectionChange: isConnected => dispatch(Actions.net.connected.update({isConnected})),
    syncUp: () => dispatch(Actions.net.syncUp.request()),
    uploadCase: status => dispatch(Actions.net.syncUp.upload(status)),
    dispatch
});

export default connect(mapStateProps, mapDispatchToProps)(AppNavigation);
