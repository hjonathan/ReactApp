import {connect} from "react-redux";
import History from "./history";
import actions from "../../Actions";

/**
 * Return state from Store to View Component
 * @param state
 */
const mapStateToProps = state => ({
        history: (state.Cases && state.Cases.history) || null
    }),
    mapDispatchToProps = dispatch => ({
        requestHistory: params => dispatch(actions.cases.history.request(params))
    });

export default connect(mapStateToProps, mapDispatchToProps)(History);
