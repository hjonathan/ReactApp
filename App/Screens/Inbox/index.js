import {connect} from "react-redux";
import InboxScreen from "./inbox";
import actions from "../../Actions";
import {CASE} from "../../Libs/Const";

/**
 * Return state from Store to View Component
 * @param state
 */
const mapStateToProps = state => ({
        cases: {
            todo: state.Cases.todo,
            users: state.Cases.users
        },
        list: CASE.INBOX,
        forceRefresh: state.Cases.forceRefresh || false,
        disableItemList: state.Screens.All.disableItemList,
        isConnected: state.Net.isConnected
    }),
    mapDispatchToProps = dispatch => ({
        casesTodoRequest: params => dispatch(actions.cases.inbox.request(params)),
        userInfoRequest: params => dispatch(actions.cases.userInfo.request(params)),
        caseOffline: params => dispatch(actions.net.case.list(params)),
        routeName: name => dispatch(actions.cases.routeName(name)),
        reset: () => dispatch(actions.cases.reset())
    });

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen);
