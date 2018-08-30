import {runSaga} from 'redux-saga';
import cases from '../../App/Effects/cases';
import actions from "../../App/Actions";
import Sinon from "sinon";
import * as Api from "../../App/Services/Api";

describe('Effect claim.js', async () => {
    let WsManager,
        sagas;
    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = cases(WsManager);
    });

    test('caseClaimRequest*', async () => {
        var actionFake = {}, dispatched = [],
            myApi = Sinon.stub(WsManager, 'caseClaimRequest').callsFake(() => {
                return "test";
            });
        const result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({state: 'test'}),
        }, sagas["cases/claim/request"], actions.cases.claim.request(actionFake)).done;
        expect(myApi.callsArg(1, actionFake)).toBeTruthy();
    });
    test('countersRequest*', async () => {
        var actionFake = {}, dispatched = [],
            myApi = Sinon.stub(WsManager, 'countersRequest').callsFake(() => {
                return "test";
            });
        const result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({state: 'test'}),
        }, sagas["cases/counters/request"], actions.cases.counters.request(actionFake)).done;
        expect(myApi.callsArg(1, actionFake)).toBeTruthy();
    });
});