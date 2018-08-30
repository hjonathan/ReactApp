import {expectSaga, testSaga} from "redux-saga-test-plan";
import navigation from "../../App/Effects/navigation";
import * as Api from "../../App/Services/Api";

jest.mock(
    "react-native-fs",
    () => require.requireActual("../../__mocks__/react-native-fs").default
);

describe("Effect Navigation", async () => {
    let WsManager,
        sagas;
    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = navigation(WsManager);
    });

    it("navigate*", () => {
        let payload = {
            type: "Navigation/OPEN_DRAWER",
            routeName: "DrawerOpen"
        };
        testSaga(sagas["Navigation/OPEN_DRAWER"], payload)
            .next()
            .put({type: "cases/counters/request"})
            .next()
            .isDone();
        expectSaga(sagas["Navigation/OPEN_DRAWER"], payload)
            .put({
                type: "formData/local/save",
                payload: {
                    app_uid: "app",
                    data: "data"
                }
            })
            .dispatch({
                type: "cases/counters/request",
                payload: payload
            })
            .run();
    });
});
