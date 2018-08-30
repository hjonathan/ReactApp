import sinon from "sinon";
import * as Api from "../../../App/Services/Api/dynaform";

jest.mock('react-native-fs', () => require.requireActual('../../../__mocks__/react-native-fs').default);

describe('Effects', async () => {
    let WsManager;
    beforeAll(() => {
        WsManager = Api.default({}, {});
    });

    test('tryEffectsApiRequest*', async () => {
        sinon.stub(global, 'fetch').callsFake(function () {
            return Promise.resolve({
                json: () => ({
                    test: "test"
                })
            });
        });
        WsManager.dynaformProcessed({isConnected: true}, {}).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
    });
});