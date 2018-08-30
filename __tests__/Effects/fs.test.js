import {testSaga} from "redux-saga-test-plan";
import Utils from "../../App/Utils";
import config from "../../App/conf";
import * as Api from "../../App/Services/Api";
import fs from "../../App/Effects/fs";

jest.mock("react-native-fs", () => require.requireActual("../../__mocks__/react-native-fs").default);
jest.mock("react-native-fetch-blob", () => require.requireActual("../../__mocks__/react-native-fetch-blob").default);

describe("Effect settings.js", async () => {
    let WsManager,
        sagas;

    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = fs(WsManager);
    });

    test("*createFolders", () => {
        testSaga(sagas["fs/app/folders/create"], {})
            .next(config)
            .next()
            .isDone();
    });

    test("*downloadBuildProd", () => {
        const state = {
            Net: {
                isConnected: false
            }
        };
        let downloadTest = testSaga(sagas["fs/app/buildProd/download"], {})
            .next(state)
            .select();

        downloadTest
            .next(state)
            .isDone();
    });
});
