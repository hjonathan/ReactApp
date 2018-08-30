import Utils from "../../App/Utils/formRender";
jest.mock('react-native-fs', () => require.requireActual('../../__mocks__/react-native-fs').default);

describe("Effect Utils FormData", () => {
    test("injectSetFormData", () => {
        expect(
            Utils.injectSetFormData({
                stepData: {},
                path: "path"
            })
        ).toEqual("app.setFormData('{}','file://path')")
    })
    test("injectLoadForm", () => {
        expect(
            Utils.injectLoadForm({
                path: "path"
            })
        ).toEqual('app.loadForm("","file://path")')
    })
    test("injectContinueStep", () => {
        expect(
            Utils.injectContinueStep({
                path: "path"
            })
        ).toEqual('app.continueStep("file://path")')
    })

    test("injectOpenCase", () => {
        expect(
            Utils.injectOpenCase({
                url: "url",
                workspace: "workspace",
                access_token: "access_token",
                refresh_token: "refresh_token",
                prj_uid: "prj_uid",
                act_uid: "act_uid",
                app_uid: "app_uid",
                del_index: "del_index",
                steps: "steps",
                lang: "lang",
                isRTL: "isRTL",
                offLineMode: "offLineMode",
                statusConnection: "statusConnection"
            })
        ).toEqual(
            'app.openCase("url","workspace","access_token","refresh_token","prj_uid","act_uid","app_uid","file://steps","del_index","lang","isRTL","offLineMode","statusConnection")'
        )
    });
    test("injectOpenStep", () => {
        expect(
            Utils.injectOpenStep({
                url: "url",
                workspace: "workspace",
                access_token: "access_token",
                refresh_token: "refresh_token",
                prj_uid: "prj_uid",
                act_uid: "act_uid",
                app_uid: "app_uid",
                del_index: "del_index",
                steps: "steps",
                lang: "lang",
                dataPath: "dataPath",
                isRTL: "isRTL",
                offLineMode: "offLineMode",
                statusConnection: "statusConnection"
            })
        ).toEqual(
            'app.openStep("url","workspace","access_token","refresh_token","prj_uid","act_uid","app_uid","file://steps","del_index","lang","file://dataPath","isRTL","offLineMode","statusConnection")'
        )
    });
    test('injectSetFiles', () => {
        expect(Utils.injectSetFiles({
            files: [{}],
            idField: "imageControl00001"
        })).toEqual("app.setFiles('{\"files\":[{}],\"idField\":\"imageControl00001\"}')");
    });
    test('injectSetFileVersions', () => {
        expect(Utils.injectSetFileVersions({
            fieldID: "imageControl00001",
            appDocUid: "Doc00001",
            response: '[]',
            success: true
        })).toEqual('app.setFileVersions("imageControl00001","Doc00001",\'[]\',"true")');
    });
    test('injectHideFieldLoading', () => {
        expect(Utils.injectHideFieldLoading({idField:"multipleFileVar001",idFile:"8986153925b4e0b954350f7079020359",docVersion:1}))
            .toEqual("app.hideFieldLoading('{\"idField\":\"multipleFileVar001\",\"idFile\":\"8986153925b4e0b954350f7079020359\",\"docVersion\":1}')");
    });
    test('injectHideMaskLoading', () => {
        expect(Utils.injectHideMaskLoading()).toEqual("app.hideMaskLoading()");
    });
    test("injectGetFormData", () => {
        expect(
            Utils.injectGetFormData()
        ).toEqual("app.getFormData()")
    });
    test("injectSetCacheLibraryMap", () => {
        expect(
            Utils.injectSetCacheLibraryMap({path:"/test/folder"})
        ).toEqual("app.setCacheLibraryMap('/test/folder')")
    });
});
