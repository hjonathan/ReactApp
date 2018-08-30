import reducers from "../../App/Reducers/net";

describe('Reducer notification.js', () => {
    test('actions.net.connected.update', () => {
        expect(reducers({}, {
            type: "net/connected/update",
            payload: {isConnected: true}
        })).toBeTruthy();
    });
    test('actions.net.progressDialog', () => {
        expect(reducers({}, {
            type: "net/progressDialog",
            payload: true
        })).toBeTruthy();
    });
    test('actions.net.syncUp.upload', () => {
        expect(reducers({}, {
            type: "net/syncUp/upload",
            payload: true
        })).toBeTruthy();
    });
});
