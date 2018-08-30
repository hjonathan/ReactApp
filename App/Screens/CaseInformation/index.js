import { connect } from "react-redux"
import actions from "../../Actions"
import CaseInformation from './caseinformation';

const mapStateToProps = state => ({
    info: state.Cases.info,
    claim: state.Cases.claim,
    error: state.Cases.error ? state.Cases.error : null
});

const mapDispatchToProps = dispatch => ({
    /**
     * Method to get the case information from server.
     */
    caseInfoRequest: (caseInfo) => dispatch(actions.cases.info.request(caseInfo)),
    caseClaimRequest: (caseClaim) => dispatch(actions.cases.claim.request(caseClaim)),
    /**
     * Validate the key from the server values to set the correct string
     * @param {*} value 
     */
    parseValueCreator(value) {
        if (!value) {
            return null
        }
        var statusMap = {
            'TO_DO':  'To do',
            'null':  'Routed',
            'reasigned': 'Reasigned',
            'in_progress': 'In progress'
        }
        return statusMap[value]
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseInformation)
