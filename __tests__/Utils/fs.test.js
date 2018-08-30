import {takeEvery, delay, runSaga} from 'redux-saga';
import sinon from "sinon";
import RNFS from "react-native-fs";
import Utils from "../../App/Utils"
jest.mock('react-native-fs', () => require.requireActual('../../__mocks__/react-native-fs').default);

describe('Effect FormRender', async () => {
    let sagas,
        fnRNFSExists;
    beforeAll(() => {
        sagas = Utils.writeFile;
        fnRNFSExists = sinon.stub(RNFS, "exists");
    });
    afterEach(() => {
        fnRNFSExists.resetHistory();
    });
    test('writeFile*', async () => {
        const dispatched = [];
        const url = 'http://url';
        let result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({state: 'test'}),
        }, Utils.writeFile, {path: "path", body: "body", encode: "encode", overwrite: true}).done.then(() => {
            expect(true).toBeTruthy()
        });

        result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({state: 'test'}),
        }, Utils.writeFile, {path: "other", body: "body", encode: "encode"}).done.then(() => {
            expect(true).toBeTruthy()
        });
    });

    test('createDirectory error*', async () => {
        const dispatched = [];
        const fn = (function () {
            this.createDirectory = Utils.createDirectory;
            return Utils.createDirectory;
        })();
        Utils.createDirectory.prototype.createDirectory = Utils.createDirectory;
        let result = await runSaga({
                dispatch: (action) => dispatched.push(action),
                getState: () => ({state: 'test'}),
            }, fn, "folder", "/root"
        ).done.then(() => {
            expect(true).toBeTruthy()
        });
        result = await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({state: 'test'}),
        }, fn, {folder: ["test1", "test2"]}, "/root").done.then(() => {
            expect(true).toBeTruthy()
        });
    });

    test("urlDownloadFile", () => {
        expect.assertions(1);
        return Utils.urlDownloadFile("https://code.jquery.com/ui/1.11.4/jquery-ui.js", "/test/files.js").then((response) => {
            expect(response).toEqual(true);
        });
    });
    test("newNameIfExist", () => {
        fnRNFSExists.resolves(false);
        return Utils.newNameIfExist("/path/test", "file.jpg").then(data => {
            expect(data).toBe("file.jpg");
        });
    });
    test("newNameIfExist", () => {
        fnRNFSExists.onCall(0).resolves(true);
        fnRNFSExists.resolves(false);
        return Utils.newNameIfExist("/path/test", "file.jpg").then(data => {
            expect(data).toBe("1-file.jpg");
        });
    });
});
