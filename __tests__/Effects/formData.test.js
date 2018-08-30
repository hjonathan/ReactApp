import {runSaga} from "redux-saga";
import formData from "../../App/Effects/formData";
import actions from "../../App/Actions";
import * as Api from "../../App/Services/Api";
import Utils from "../../App/Utils";
import {testSaga} from "redux-saga-test-plan";
jest.mock(
    "react-native-fs",
    () => require.requireActual("../../__mocks__/react-native-fs").default
);

describe("Effect FormData", async () => {
    let WsManager, sagas;
    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = formData(WsManager);
    });

    it("saveFormData*", async () => {
        let payload = {
                config: {app_uid: "app"},
                stepData: {data: "data"}
            },
            state = {};
        testSaga(sagas["formData/server/update"], {payload: payload})
            .next()
            .select()
            .next(state)
            .call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: Object.assign({}, payload.config, payload.stepData),
                state: state,
                service: "saveFormData",
                action: actions.formData.server
            })
            .next(state)
            .put({
                type: "formData/local/save",
                payload: {app_uid: "app", data: "data"}
            })
            .next()
            .isDone();
    });
});
