import {takeEvery, select, all} from "redux-saga/effects";
import oauthSaga from "./oauth";
import userData from "./user";
import settingsSaga from "./settings";
import casesNotesSaga from "./caseNotes";
import casesSaga from "./cases";
import formRenderSaga from "./formRender";
import formDataSaga from "./formData";
import fsSaga from "./fs";
import navigationSaga from "./navigation";
import notification from "./notification";
import fileMobile from "./fileMobile";
import * as api from "../Services/Api";
import net from "./net";

let arraySagas = [
    oauthSaga,
    settingsSaga,
    casesSaga,
    casesNotesSaga,
    formRenderSaga,
    formDataSaga,
    fsSaga,
    navigationSaga,
    userData,
    notification,
    fileMobile,
    net
];

/**
 * Class SagaEffects
 */
class SagaEffects {
    constructor (states) {
        if (!SagaEffects.instance) {
            this.takeEvery = this.buildTakeEvery(states);
            SagaEffects.instance = this;
        }
        return SagaEffects.instance;
    }

    /**
     * Build in array all takeEvery
     * @param states
     * @returns {Array}
     */
    buildTakeEvery (states) {
        let takeEveryArray = [];
        arraySagas.map((saga) => {
            let genSaga = saga(api.default(states.Settings.server, {}));
            Object.keys(genSaga).forEach((fnGenerator) => {
                takeEveryArray.push(takeEvery(fnGenerator, genSaga[fnGenerator]));
            });
            return;
        });
        return takeEveryArray;
    }
}

/**
 * This method create a function generator for saga's effects
 */
function* sagaEffect () {
    let states = yield select();
    const instance = new SagaEffects(states);
    Object.freeze(instance);
    yield all(instance.takeEvery);
}

export default sagaEffect;
