import {connect} from "react-redux";
import Draft from "./draft";
import actions from "../../Actions";
import {CASE} from "../../Libs/Const";

const mapStateToProps = state => ({
        cases: {
            draft: state.Cases.draft,
            users: state.Cases.users
        },
        list: CASE.DRAFT,
        forceRefresh: state.Cases.forceRefresh || false,
        disableItemList: state.Screens.All.disableItemList,
        isConnected: state.Net.isConnected
    }),
    mapDispatchToProps = dispatch => ({
        requestCasesDraft: params => dispatch(actions.cases.draft.request(params)),
        userInfoRequest: params => dispatch(actions.cases.userInfo.request(params)),
        caseOffline: params => dispatch(actions.net.case.list(params)),
        routeName: name => dispatch(actions.cases.routeName(name)),
        reset: () => dispatch(actions.cases.reset())
    });

export default connect(mapStateToProps, mapDispatchToProps)(Draft);
