import {connect} from "react-redux";
import FormRender from "./formRender";
import actions from "../../Actions";

/**
 * Return state from Store to View Component
 * @param state
 */
const mapStateToProps = state => ({
        isRouted: state.FormRender.routed.isRouted,
        routeUsers: state.FormRender.routed.users,
        dataAvailable: state.FormRender.dataAvailable,
        showSignature: state.FormRender.signature.show,
        showDownload: state.FormRender.download.show,
        progressDownload: state.FormRender.download.progress,
        fileDownload: state.FormRender.download.file,
        assignment: state.Cases.assignment.info,
        errorAssignment: state.Cases.assignment.error,
        errorNextStep: state.FormRender.nextStep.error,
        route: state.Cases.routedCase.info,
        routeName: state.Cases.routeName,
        errorRoute: state.Cases.routedCase.error,
        errorData: state.FormData.server.error,
        requestMap: state.FormRender.requestMap,
        working: state.FormRender.working.status,
        loadMap: state.FormRender.flowStatus,
        showAudioMenu: state.FormRender.audio.menu,
        showAudioPanel: state.FormRender.audio.panel
    }),
    mapDispatchToProps = dispatch => ({
        requestRoute: params => dispatch(actions.cases.routeCase.request(params)),
        finishLoadWebView: () => {
            dispatch(actions.screens.all.disableItemList(true));
        },
        addUserId: (userId) => {
            dispatch(actions.formRender.routed.users(userId));
        },
        changeRouted (status) {
            dispatch(actions.formRender.routed.route({isRouted: status}));
        },
        clearFormRender () {
            dispatch(actions.formRender.reset());
        },
        changeDataAvailable (isAvailable) {
            dispatch(actions.formRender.dataAvailable(isAvailable));
        },
        setLocation: params => dispatch(actions.formRender.sendCoordinates(params)),
        changeSignature: visible => dispatch(actions.formRender.signature.show(visible)),
        sendSignature: params => dispatch(actions.formRender.sendSignature(params)),
        changeAudioMenu: params => dispatch(actions.formRender.audio.openMenu({status: params.status})),
        changeAudioControls: params => dispatch(actions.formRender.audio.openControls({status: params.status})),
        selectAudio: params => dispatch(actions.formRender.audio.selectAudio(params))
    });

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
