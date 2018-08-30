import Utils from "../../App/Utils";

jest.mock('react-native-fs', () => require.requireActual('../../__mocks__/react-native-fs').default);
jest.mock('react-native-clear-cache', () => require.requireActual('../../__mocks__/react-native-clear-cache').default);
jest.mock('react-native-settings', () => require.requireActual('../../__mocks__/react-native-settings').default);

describe("Effect Utils FormData", () => {
    test("getFormData", () => {
        let data = {
            FormData: {
                app1: {test: "test"}
            }
        };
        expect(Utils.getFormData({FormData: null})).toEqual(null);
        expect(Utils.getFormData(data, "app1")).toEqual({test: "test"});
    });
    test("saveStepsInState", () => {
        let data = {
            prj1: {
                tasks: {
                    act1: {
                        steps: [{
                            formId: "dyn1",
                            stepPosition: 0,
                            stepId: "step1"
                        }]
                    }
                }
            }
        };
        let state2 = {};

        expect(Utils.saveStepsInState(data, "prj1", "act1", [{
            formId: "dyn2",
            stepPosition: 2,
            stepId: "step2"
        }
        ])).toEqual({
            prj1: {
                tasks: {
                    act1: {
                        steps: [
                            {
                                formId: "dyn2",
                                stepPosition: 2,
                                stepId: "step2"
                            }
                        ]
                    }
                }
            }
        });

        expect(Utils.saveStepsInState(state2, "prj1", "act1", [{
            formId: "dyn2",
            stepPosition: 2,
            stepId: "step2"
        }
        ])).toEqual({
            prj1: {
                tasks: {
                    act1: {
                        steps: [
                            {
                                formId: "dyn2",
                                stepPosition: 2,
                                stepId: "step2"
                            }
                        ]
                    }
                }
            }
        });
    });

    test("getFileName", () => {
        const fileName = "internalStorage/downloads/fileTest.jpg";
        expect(Utils.getFileName(fileName)).toEqual("fileTest.jpg");
        expect(Utils.getFileName("")).toEqual(undefined);
    });

    test("getExtensionFile", () => {
        const fileName = "examplefile.extension.jpg";
        expect(Utils.getExtensionFile(fileName)).toEqual("jpg");
        expect(Utils.getExtensionFile("")).toEqual(undefined);
    });

    test("savePath", () => {
        const path = "/downloads/exmaplefile.jpg",
            spy = jest.spyOn(Utils, "savePath");
        Utils.savePath(path);
        expect(spy).toHaveBeenCalled();
    });

    test("cleanDB", () => {
        const spy = jest.spyOn(Utils, "cleanDB");
        Utils.cleanDB();
        expect(spy).toHaveBeenCalled();
    });

    test("cleanFolders", () => {
        const spy = jest.spyOn(Utils, "cleanFolders");
        Utils.cleanFolders();
        expect(spy).toHaveBeenCalled();
    });

    test("moveToAudioDirectory", () => {
        expect(Utils.moveToAudioDirectory()).toEqual(null);
        expect(Utils.moveToAudioDirectory("fakePath/audio.m4a")).toEqual({
            path: "/storage/emulated/0/Music/processmakeraudiorecord/audio.m4a",
            type: "audio/m4a"
        });
    });

    test("getStatusGPS", () => {
        const spy = jest.spyOn(Utils, "getStatusGPS");
        Utils.getStatusGPS(() => {});
        expect(spy).toHaveBeenCalled();
    });

    test("openLocationSettings", () => {
        const spy = jest.spyOn(Utils, "openLocationSettings");
        Utils.openLocationSettings(() => {});
        expect(spy).toHaveBeenCalled();
    });

    test("externalLibraries", () => {
        const spy = jest.spyOn(Utils, "externalLibraries"),
            formContent = {
                items: [{
                    externalLibs: "https://code.jquery.com/ui/1.11.4/jquery-ui.js",
                    items: [{
                        externalLibs: "https://code.jquery.com/ui/1.11.4/jquery-ui.js"
                    }]
                }]
            };
        Utils.externalLibraries(formContent);
        expect(spy).toHaveBeenCalled();
    });
});
