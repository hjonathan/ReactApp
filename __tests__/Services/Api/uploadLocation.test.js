import * as Api from "../../../App/Services/Api/uploadLocation";

describe('Service Api', async () => {
    let WsManager;

    beforeAll(() => {
        WsManager = Api.default({}, {});
    });

    test('uploadLocation', async () => {
        WsManager.uploadLocation({isConnected: true}, {
            latitude: "",
            longitude: ""
        }).then((a) => {
            expect(a).toEqual({
                status: 200
            });
        });
    });
});
