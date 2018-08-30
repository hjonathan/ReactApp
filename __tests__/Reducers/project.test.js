import reducers from "../../App/Reducers/project";

describe("Reducer project.js", () => {
    test("actions.project.task.steps.success", () => {
        expect(reducers({}, {
            type: "project/task/steps/success",
            payload: {
                params: {
                    prj_uid: "123",
                    act_uid: "456",
                },
                response: {}
            }
        })).toEqual({
            "123": {
                "tasks": {
                    "456": {
                        "steps": {}
                    }
                }
            }
        });
    });
});