import Utils from "../../App/Utils";

describe('Utils Project', () => {
    test('findStep', () => {
        let state = {Project: {}};
        expect(Utils.findStep(state, "prj_uid", "act_uid", "dyn_uid")).toEqual(null);
    });

    test('findStepsZeroByTaskId', () => {
        let state = {Project: {}};
        let state2 = {
            Project: {
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
            }
        };
        expect(Utils.findStepsZeroByTaskId(state, "prj_uid", "act_uid")).toEqual(null);
        expect(Utils.findStepsZeroByTaskId(state2, "prj1", "act1")).toEqual({
            formId: "dyn2",
            stepPosition: 2,
            stepId: "step2"
        });
    });

    test('findRouteByRouteName', () => {
        let navigationReducer = {
            routes: [{
                routeName: "testExist",
                routes:[{
                    routeName: "subTestExist",
                }]
            }]
        };
        expect(Utils.findRouteByRouteName({}, "Test")).toEqual(null);
        expect(Utils.findRouteByRouteName({routes: []}, "Test")).toEqual(null);
        expect(Utils.findRouteByRouteName(navigationReducer, "Test")).toEqual(null);
        expect(Utils.findRouteByRouteName(navigationReducer, "subTestNotExist")).toEqual(null);
        expect(Utils.findRouteByRouteName(navigationReducer, "testExist")).toEqual({routeName: "testExist", routes: [{routeName: "subTestExist"}]});
        expect(Utils.findRouteByRouteName(navigationReducer, "subTestExist")).toEqual({routeName: "subTestExist"});
    });
});
