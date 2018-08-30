import {expectSaga, testSaga} from 'redux-saga-test-plan';
import Utils from "../../App/Utils";
import actions from "../../App/Actions";
import * as Api from "../../App/Services/Api";
import fileMobile from "../../App/Effects/fileMobile";

jest.mock('react-native-push-notification', () => require.requireActual('../../__mocks__/react-native-push-notification').default);

describe('Effect FileMobile.js', () => {
    let WsManager,
        sagas;

    beforeAll(() => {
        WsManager = Api.default({}, {});
        sagas = fileMobile(WsManager);
    });

    test('*uploadFile', () => {
        const action = {
                payload: {
                    app_uid: "1234567",
                    idField: "001",
                    docUid: "",
                    name: "image.jpg",
                    path: "/storage/downloads/image.jpg",
                    type: "image/jpg",
                    extension: "jpg"
                }
            },
            data = {
                params: {
                    idField: "001",
                    app_uid: "1234567",
                    name: "image.jpg",
                    path: "/storage/downloads/image.jpg",
                    type: "image/jpg",
                    extension: "jpg"
                },
                response: [{
                    appDocUid: "1234567891011"
                }]
            },
            storeFile = "text.txt",
            params = {
                app_uid: data.params.app_uid,
                app_doc_uid: data.response[0].appDocUid,
                name: data.params.name,
                path: data.params.path,
                type: data.params.type,
                extension: data.params.extension
            },
            state = {};
        let uploadEffect;
        testSaga(sagas["file/register/request"], action)
            .next()
            .select()
            .next(state)
            .call(Utils.tryApiRequest, {
                wsManager: WsManager,
                payload: action.payload,
                state: state,
                service: "getAppDocUid"
            })
            .next({});
        uploadEffect = testSaga(sagas["file/upload/request"], data)
            .next()
            .select()
            .next(state)
            .next(data)
            .put({
                type: "formRender/inject/setFiles",
                payload: {
                    flowStatus: "setFiles",
                    response: {
                        files: [Object.assign({}, data.response[0], {
                            id: data.response[0].appDocUid,
                            extension: data.params.extension,
                            filePath: storeFile
                        })],
                        idField: data.params.idField
                    }
                }
            })
            .next(state)
            .call(Utils.tryApiRequest, {
                wsManager: WsManager,
                payload: params,
                state,
                service: "uploadFile"
            });

        uploadEffect.next({
            error: {
                status: "Fail"
            }
        })
            .put({
                type: 'file/register/success',
                payload: {
                    app_uid: '1234567',
                    app_doc_uid: '1234567891011',
                    name: 'image.jpg',
                    path: '/storage/downloads/image.jpg',
                    type: 'image/jpg',
                    extension: 'jpg',
                    appDocUid: '1234567891011'
                }
            })
            .next()
            .put({
                type: 'file/register/error',
                payload: { error: { status: 'Fail' } }
            })
            .next()
            .isDone();

        uploadEffect.next(null).isDone();
    });
});
