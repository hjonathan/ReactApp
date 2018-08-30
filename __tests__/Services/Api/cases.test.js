import sinon from "sinon";
import * as Api from "../../../App/Services/Api/cases";

jest.mock('react-native-fs', () => require.requireActual('../../../__mocks__/react-native-fs').default);

describe('Service Api', async () => {
    let WsManager;

    beforeAll(() => {
        WsManager = Api.default({}, {});
    });

    test('casesRoute', async () => {
        WsManager.casesRoute({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('casesTodo', async () => {
        WsManager.casesTodo({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('casesUnassigned', async () => {
        WsManager.casesUnassigned({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('casesParticipated', async () => {
        WsManager.casesParticipated({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('casesDraft', async () => {
        WsManager.casesDraft({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('caseHistory', async () => {
        WsManager.caseHistory({}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('caseInfoRequest', async () => {
        WsManager.caseInfoRequest({}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('caseClaimRequest', async () => {
        WsManager.caseClaimRequest({}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('newCasesRequest', async () => {
        WsManager.newCasesRequest({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('countersRequest', async () => {
        WsManager.countersRequest({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('userDataRequest', async () => {
        WsManager.userDataRequest({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('steps', async () => {
        WsManager.steps({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('nextStep', async () => {
        WsManager.nextStep({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('caseAssignmentRequest', async () => {
        WsManager.caseAssignmentRequest({}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('caseRouteRequest', async () => {
        WsManager.caseRouteRequest({}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('saveFormData', async () => {
        sinon.stub(global, 'fetch').callsFake(function () {
            return Promise.resolve({
                json: () => ({
                    test: "test"
                })
            });
        });
        WsManager.saveFormData({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('caseVariables', async () => {
        WsManager.caseVariables({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
        expect(WsManager.caseVariables({isConnected: false}, {})).toEqual({})
    });

    test('newCase', async () => {
        WsManager.newCase({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });

    test('executeTriggerAfter', async () => {
        WsManager.executeTriggerAfter({}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });
});
