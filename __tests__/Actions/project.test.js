import {createActions} from "redux-actions"
import oauth from "../../App/Actions/project"

const actions = createActions(oauth);
describe('Actions fs', () => {
    test('Actions for Project', () => {
        expect(actions.project.task.steps.request()).toEqual({type: "project/task/steps/request"});
        expect(actions.project.task.steps.success()).toEqual({type: "project/task/steps/success"});
        expect(actions.project.task.steps.error()).toEqual({type: "project/task/steps/error"});
    });
});