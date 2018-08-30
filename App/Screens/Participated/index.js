import {connect} from "react-redux";
import Participated from "./participated";
import actions from "../../Actions";
import {CASE} from "../../Libs/Const";

const mapStateToProps = state => ({
        cases: {
            participated: state.Cases.participated || null,
            users: state.Cases.users || []
        },
        list: CASE.PARTICIPATED,
        disableItemList: state.Screens.All.disableItemList,
        isConnected: state.Net.isConnected
    }),
    mapDispatchToProps = dispatch => ({
        requestCasesPartcipated: params => dispatch(actions.cases.participated.request(params)),
        userInfoRequest: params => dispatch(actions.cases.userInfo.request(params)),
        routeName: name => dispatch(actions.cases.routeName(name)),
        reset: () => dispatch(actions.cases.reset())
    });

export default connect(mapStateToProps, mapDispatchToProps)(Participated);
