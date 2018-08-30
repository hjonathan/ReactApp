import {connect} from "react-redux";
import CaseNotes from "./casenotes";
import actions from "../../Actions";

/**
 * Return state from Store to View Component
 * @param state
 */
const mapStateToProps = state => ({
    caseNotes: state.CaseNotes || null,
    users: state.CaseNotes.users
});

const mapDispatchToProps = dispatch => ({
    requestCaseNotes: params => dispatch(actions.caseNotes.request(params)),
    postCaseNote: params => dispatch(actions.postCaseNote.request(params)),
    userInfoRequest: params => dispatch(actions.notesUsers.request(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseNotes);
