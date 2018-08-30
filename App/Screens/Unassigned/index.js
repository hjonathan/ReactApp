import {connect} from "react-redux";
import Unassigned from "./unassigned";
import actions from "../../Actions";
import {CASE} from "../../Libs/Const";

const mapStateToProps = state => ({
        cases: {
            unassigned: state.Cases.unassigned || null,
            users: state.Cases.users || []
        },
        list: CASE.UNASSIGNED,
        disableItemList: state.Screens.All.disableItemList,
        isConnected: state.Net.isConnected
    }),
    mapDispatchToProps = dispatch => ({
        requestCasesUnassigned: params => dispatch(actions.cases.unassigned.request(params)),
        userInfoRequest: params => dispatch(actions.cases.userInfo.request(params)),
        routeName: name => dispatch(actions.cases.routeName(name)),
        reset: () => dispatch(actions.cases.reset())
    });

export default connect(mapStateToProps, mapDispatchToProps)(Unassigned);
