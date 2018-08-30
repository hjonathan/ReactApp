import {put} from "redux-saga/effects";
import actions from "../Actions";

export default (WsManager) => {
    /**
     * Function Generator for drawer open
     * @param action
     */
    function* drawerOpen (action) {
        yield put(actions.cases.counters.request());
    }

    return {
        "Navigation/OPEN_DRAWER": drawerOpen
    };
};
