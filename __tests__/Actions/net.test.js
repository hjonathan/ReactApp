import {createActions} from "redux-actions"
import net from "../../App/Actions/net"

const actions = createActions(net);
describe('Actions Net', () => {
    test('Actions for connected', () => {
        expect(actions.net.connected.request()).toEqual({payload: {status: undefined}, type: "net/connected/request"});
        expect(actions.net.connected.update()).toEqual({type: "net/connected/update"});
        expect(actions.net.connected.error()).toEqual({payload: {error: undefined}, type: "net/connected/error"});
    });

    test('Actions for Sync Down', () => {
        expect(actions.net.syncDown.request()).toEqual({payload: {status: undefined},type: "net/syncDown/request"});
        expect(actions.net.syncDown.error()).toEqual({payload: {error: undefined}, type: "net/syncDown/error"});
    });

    test('Actions for Sync Up', () => {
        expect(actions.net.syncUp.request()).toEqual({payload: {status: undefined},type: "net/syncUp/request"});
        expect(actions.net.syncUp.error()).toEqual({payload: {error: undefined}, type: "net/syncUp/error"});
    });

    test('Actions for mobile', () => {
        expect(actions.net.mobile.syncData()).toEqual({type: "net/mobile/syncData"});
    });

    test('Actions for case', () => {
        expect(actions.net.case.new()).toEqual({type: "net/case/new"});
        expect(actions.net.case.list()).toEqual({type: "net/case/list"});
    });
});
