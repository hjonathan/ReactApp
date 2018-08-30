import reducers from "../../App/Reducers/formRender";

describe("Reducer formRender.js", () => {
    const initialState = {
        flowStatus: null,
        nextStep: {
            data: null,
            path: null,
            error: null
        },
        routed: {
            isRouted: false,
            users: null
        },
        formPath: null,
        formDataPath: null,
        stepData: null,
        dataFile: null,
        fileInput: null,
        fileVersions: null,
        routeCase: null,
        routeOffline: false,
        dataAvailable: false,
        requestMap: null,
        working: {
            status: false
        },
        signature: {
            show: false,
            data: null
        },
        audio: {
            menu: false,
            panel: false,
            data: null
        },
        download: {
            show: false,
            progress: 0,
            file: null
        }
    };
    test("actions.formRender.nextStep.success", () => {
        expect(reducers({}, {
            type: "formRender/nextStep/success",
            payload: {
                status: {
                    response: {}
                }
            }
        })).toEqual({
            flowStatus: null,
            nextStep: {data: {}}
        });
    });
    test("actions.formRender.nextStep.error", () => {
        expect(reducers({}, {
            type: "formRender/nextStep/error",
            payload: {
                error: {}
            }
        })).toEqual({
            nextStep: {error: {}},
            flowStatus: null
        });
    });
    test("actions.formRender.nextStep.reset", () => {
        expect(reducers({}, {
            type: "formRender/nextStep/reset"
        })).toEqual({
            nextStep: {
                data: null,
                path: null,
                error: null
            },
            flowStatus: null
        });
    });
    test("actions.formRender.inject.continueStep", () => {
        expect(reducers({}, {
            type: "formRender/inject/continueStep",
            payload: {
                flowStatus: "",
                nextStepPath: ""
            }
        })).toEqual({
            flowStatus: "",
            nextStep: {path: ""},
            requestMap: null
        });
    });
    test("actions.formRender.inject.loadForm", () => {
        expect(reducers({}, {
            type: "formRender/inject/loadForm",
            payload: {
                flowStatus: "",
                formPath: ""
            }
        })).toEqual({
            flowStatus: "",
            formPath: ""
        });
    });
    test("actions.formRender.inject.setFormData", () => {
        expect(reducers({}, {
            type: "formRender/inject/setFormData",
            payload: {
                flowStatus: "",
                formDataPath: "",
                stepData: {}
            }
        })).toEqual({
            flowStatus: "",
            formDataPath: "",
            stepData: {}
        });
    });
    test("actions.formRender.inject.setFiles", () => {
        expect(reducers({}, {
            type: "formRender/inject/setFiles",
            payload: {
                flowStatus: "",
                response: {}
            }
        })).toEqual({
            flowStatus: "",
            dataFile: {}
        });
        expect(reducers({}, {
            type: "formRender/inject/setFiles",
            payload: {
                flowStatus: "",
                response: ""
            }
        })).toEqual({
            flowStatus: "",
            dataFile: null
        });
    });
    test("actions.formRender.inject.setFileVersions", () => {
        expect(reducers({}, {
            type: "formRender/inject/setFileVersions",
            payload: {
                flowStatus: "setFileVersions",
                response: {}
            }
        })).toEqual({
            flowStatus: "setFileVersions",
            fileVersions: {}
        });
    });
    test("actions.formRender.inject.setLocation", () => {
        expect(reducers({}, {
            type: "formRender/inject/setLocation",
            payload: {
                flowStatus: "",
                location: {}
            }
        })).toEqual({
            flowStatus: "",
            location: {},
            requestMap: null
        });
    });
    test("actions.formRender.openMap", () => {
        expect(reducers({}, {
            type: "formRender/openMap",
            payload: {
                status: "",
                idField: ""
            }
        })).toEqual({
            requestMap: {
                status: "",
                idField: ""
            }
        });
    });
    test("actions.formRender.inject.getFormData", () => {
        expect(reducers({}, {
            type: "formRender/inject/getFormData",
            payload: {
                flowStatus: "getFormData"
            }
        })).toEqual({
            flowStatus: "getFormData",
        });
    });
    test("actions.formRender.inject.hideFieldLoading", () => {
        expect(reducers({}, {
            type: "formRender/inject/hideFieldLoading",
            payload: {
                flowStatus: "hideFieldLoading",
                fileInput: {}
            }
        })).toEqual({
            flowStatus: "hideFieldLoading",
            fileInput: {}
        });
    });
    test("actions.formRender.inject.setCacheLibraryMap", () => {
        expect(reducers({}, {
            type: "formRender/inject/setCacheLibraryMap",
            payload: {
                flowStatus: "setCacheLibraryMap"
            }
        })).toEqual({
            flowStatus: "setCacheLibraryMap"
        });
    });
    test("actions.formRender.routed.route", () => {
        expect(reducers({}, {
            type: "formRender/routed/route",
            payload: {
                isRouted: true
            }
        })).toEqual({
            routed: {isRouted: true},
            requestMap: null
        });
    });
    test("actions.formRender.routed.users", () => {
        expect(reducers({routed: {users: {}}}, {
            type: "formRender/routed/users",
            payload: {
                user: "001"
            }
        })).toEqual({
            routed: {users: {user: "001"}},
            requestMap: null
        });
    });
    test("actions.formRender.reset", () => {
        expect(reducers({}, {
            type: "formRender/reset"
        })).toEqual(initialState);
    });
    test("actions.formRender.newCase", () => {
        expect(reducers({}, {
            type: "formRender/newCase"
        })).toEqual({
            routeCase: false
        });
    });
    test("actions.formRender.routeOffline", () => {
        expect(reducers({}, {
            type: "formRender/routeOffline",
            payload: {
                routeOffline: true
            }
        })).toEqual({
            routeOffline: true,
            requestMap: null
        });
    });
    test("actions.formRender.dataAvailable", () => {
        expect(reducers({}, {
            type: "formRender/dataAvailable",
            payload: true
        })).toEqual({dataAvailable: true});
    });
    test("actions.formRender.working", () => {
        expect(reducers({}, {
            type: "formRender/working",
            payload: {status: true}
        })).toEqual({
            working: {
                status: true
            }
        });
    });
    test("actions.formRender.signature.show", () => {
        expect(reducers({}, {
            type: "formRender/signature/show"
        })).toEqual({signature: {data: null, show: undefined}});
    });
    test("actions.formRender.signature.data", () => {
        expect(reducers({}, {
            type: "formRender/signature/data"
        })).toEqual({signature: {data: undefined}});
    });
    test("actions.formRender.audio.openMenu", () => {
        expect(reducers({}, {
            type: "formRender/audio/openMenu",
            payload: {status: true}
        })).toEqual({
            audio: {
                menu: true
            }
        });
    });
    test("actions.formRender.audio.openControls", () => {
        expect(reducers({}, {
            type: "formRender/audio/openControls",
            payload: {status: true}
        })).toEqual({
            audio: {
                panel: true
            }
        });
    });
    test("actions.formRender.audio.infoAudio", () => {
        expect(reducers({}, {
            type: "formRender/audio/infoAudio"
        })).toEqual({
            audio: {
                data: undefined
            }
        });
    });
    test("actions.formRender.download.file", () => {
        expect(reducers({}, {
            type: "formRender/download/file",
            payload: {}
        })).toEqual({download: {file: {}}});
    });
    test("actions.formRender.download.show", () => {
        expect(reducers({}, {
            type: "formRender/download/show",
            payload: true
        })).toEqual({download: {show: true}});
    });
    test("actions.formRender.download.progress", () => {
        expect(reducers({}, {
            type: "formRender/download/progress",
            payload: 50
        })).toEqual({download: {progress: 50}});
    });
});
