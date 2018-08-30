import * as Api from "../../../App/Services/Api/file";

describe('Service Api', async () => {
    let WsManager;
    beforeAll(() => {
        WsManager = Api.default({}, {});
    });

    //SINGLE ATTACHED FILE
    test('getAppDocUid', async () => {
        WsManager.getAppDocUid({isConnected: true}, {
            name: "fakefile.jpg",
            docUid: ""
        }).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
        expect(WsManager.getAppDocUid({isConnected: false}, {
            name: "fakefile.jpg",
            docUid: ""
        })).toBeNull();
    });
    //WITH INPUT DOC ASSOCIATED
    test('getAppDocUid', async () => {
        WsManager.getAppDocUid({isConnected: true}, {
            name: "fakefile.jpg",
            docUid: "123456789",
            docType: "INPUT"
        }).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
        expect(WsManager.getAppDocUid({isConnected: false}, {
            name: "fakefile.jpg",
            docUid: "123456789",
            docType: "INPUT"
        })).toBeNull();
    });
    //UPLOAD FILE
    test('uploadFile', async () => {
        WsManager.uploadFile({isConnected: true}, {
            path: "/storage/file/fakefile.jpg",
            type: "image/jpeg",
            name: "fakefile.jpg"
        }).then((a) => {
            expect(a).toEqual({
                status: "ok"
            });
        });
        expect(WsManager.uploadFile({isConnected: false}, {
            path: "/storage/file/fakefile.jpg",
            type: "image/jpeg",
            name: "fakefile.jpg"
        })).toBeNull();
    });

    test('fileVersions', async () => {
        WsManager.fileVersions({isConnected: true}, {
            app_uid: "987654321",
            app_doc_uid: "123456789"
        }).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
        expect(WsManager.fileVersions({isConnected: false}, {
            app_uid: "987654321",
            app_doc_uid: "123456789"
        })).toBeNull();
    });

    test('downloadFile', async () => {
        WsManager.downloadFile({isConnected: true}, {
            app_uid: "987654321",
            app_doc_uid: "123456789",
            version: 1
        }).then((a) => {
            expect(a).toEqual({
                test: "test"
            });
        });
        expect(WsManager.downloadFile({isConnected: false}, {
            app_uid: "987654321",
            app_doc_uid: "123456789"
        })).toBeNull();
    });
});
