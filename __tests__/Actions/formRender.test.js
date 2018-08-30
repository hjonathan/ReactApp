import {createActions} from "redux-actions"
import oauth from "../../App/Actions/formRender"

const actions = createActions(oauth);
describe('Actions formRender', () => {
    test('Actions for render', () => {
        expect(actions.formRender.newCase()).toEqual({type: "formRender/newCase"});
        expect(actions.formRender.openCase()).toEqual({type: "formRender/openCase"});
        expect(actions.formRender.render()).toEqual({type: "formRender/render"});
        expect(actions.formRender.routeCase()).toEqual({type: "formRender/routeCase"});
        expect(actions.formRender.backButtonPressed()).toEqual({type: "formRender/backButtonPressed"});
        expect(actions.formRender.routeOffline()).toEqual({type: "formRender/routeOffline"});
        expect(actions.formRender.dataAvailable()).toEqual({type: "formRender/dataAvailable"});
        expect(actions.formRender.openMap()).toEqual({type: "formRender/openMap"});
        expect(actions.formRender.sendCoordinates()).toEqual({type: "formRender/sendCoordinates"});
        expect(actions.formRender.sendSignature()).toEqual({type: "formRender/sendSignature"});
        expect(actions.formRender.working()).toEqual({type: "formRender/working"});
        expect(actions.formRender.routeOffLine()).toEqual({type: "formRender/routeOffLine"});
    });
    test('Actions for audio control', () => {
        expect(actions.formRender.routed.route()).toEqual({type: "formRender/routed/route"});
        expect(actions.formRender.routed.users()).toEqual({type: "formRender/routed/users"});
    });
    test('Actions for render bridge', () => {
        expect(actions.formRender.bridge.continueStep()).toEqual({type: "formRender/bridge/continueStep"});
        expect(actions.formRender.bridge.nextStep()).toEqual({type: "formRender/bridge/nextStep"});
        expect(actions.formRender.bridge.getForm()).toEqual({type: "formRender/bridge/getForm"});
        expect(actions.formRender.bridge.getFormData()).toEqual({type: "formRender/bridge/getFormData"});
        expect(actions.formRender.bridge.getFile()).toEqual({type: "formRender/bridge/getFile"});
        expect(actions.formRender.bridge.getFileVersions()).toEqual({type: "formRender/bridge/getFileVersions"});
        expect(actions.formRender.bridge.getPicture()).toEqual({type: "formRender/bridge/getPicture"});
        expect(actions.formRender.bridge.getVideo()).toEqual({type: "formRender/bridge/getVideo"});
        expect(actions.formRender.bridge.getAudio()).toEqual({type: "formRender/bridge/getAudio"});
        expect(actions.formRender.bridge.getGeoTag()).toEqual({type: "formRender/bridge/getGeoTag"});
        expect(actions.formRender.bridge.getSignature()).toEqual({type: "formRender/bridge/getSignature"});
        expect(actions.formRender.bridge.receiveFormData()).toEqual({type: "formRender/bridge/receiveFormData"});
        expect(actions.formRender.bridge.askWhichDataToUse()).toEqual({type: "formRender/bridge/askWhichDataToUse"});
        expect(actions.formRender.bridge.downloadFile()).toEqual({type: "formRender/bridge/downloadFile"});
    });
    test('Actions for render inject', () => {
        expect(actions.formRender.inject.continueStep()).toEqual({type: "formRender/inject/continueStep"});
        expect(actions.formRender.inject.loadForm()).toEqual({type: "formRender/inject/loadForm"});
        expect(actions.formRender.inject.setFormData()).toEqual({type: "formRender/inject/setFormData"});
        expect(actions.formRender.inject.getFormData()).toEqual({type: "formRender/inject/getFormData"});
        expect(actions.formRender.inject.hideFieldLoading()).toEqual({type: "formRender/inject/hideFieldLoading"});
        expect(actions.formRender.inject.setFiles()).toEqual({type: "formRender/inject/setFiles"});
        expect(actions.formRender.inject.setFileVersions()).toEqual({type: "formRender/inject/setFileVersions"});
        expect(actions.formRender.inject.setLocation()).toEqual({type: "formRender/inject/setLocation"});
        expect(actions.formRender.inject.getWhichDataToUse()).toEqual({type: "formRender/inject/getWhichDataToUse"});
        expect(actions.formRender.inject.setCacheLibraryMap()).toEqual({type: "formRender/inject/setCacheLibraryMap"});
    });
    test('Actions for render nextStep', () => {
        expect(actions.formRender.nextStep.request()).toEqual({type: "formRender/nextStep/request"});
        expect(actions.formRender.nextStep.success({})).toEqual({type: "formRender/nextStep/success", payload: {status: {}}});
        expect(actions.formRender.nextStep.error({})).toEqual({type: "formRender/nextStep/error", payload: {error: {}}});
    });
    test('Actions for render signature', () => {
        expect(actions.formRender.signature.show(true)).toEqual({type: "formRender/signature/show", payload: true});
        expect(actions.formRender.signature.data({})).toEqual({type: "formRender/signature/data", payload: {}});
        expect(actions.formRender.signature.request({})).toEqual({type: "formRender/signature/request", payload: {}});
    });
    test('Actions for render audio', () => {
        expect(actions.formRender.audio.openMenu()).toEqual({type: "formRender/audio/openMenu"});
        expect(actions.formRender.audio.openControls()).toEqual({type: "formRender/audio/openControls"});
        expect(actions.formRender.audio.infoAudio()).toEqual({type: "formRender/audio/infoAudio"});
        expect(actions.formRender.audio.selectAudio()).toEqual({type: "formRender/audio/selectAudio"});
    });
    test('Actions for render download', () => {
        expect(actions.formRender.download.show(true)).toEqual({type: "formRender/download/show", payload: true});
        expect(actions.formRender.download.progress(0)).toEqual({
            type: "formRender/download/progress",
            payload: 0
        });
        expect(actions.formRender.download.file({})).toEqual({
            type: "formRender/download/file",
            payload: {}
        });
    });
});

