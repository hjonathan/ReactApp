import {connect} from "react-redux";
import NewCases from "./newcases";
import actions from "../../Actions";

const mapStateToProps = state => ({
    newcases: state.Cases.newcases || null,
    disableItemList: state.Screens.All.disableItemList,
    isConnected: state.Net.isConnected
});

const mapDispatchToProps = dispatch => ({
    requestNewCases: () => dispatch(actions.cases.newcases.request()),
    caseOffline: params => dispatch(actions.net.case.new(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCases);
