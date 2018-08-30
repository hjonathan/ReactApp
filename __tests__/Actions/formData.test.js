import {createActions} from "redux-actions"
import oauth from "../../App/Actions/formData"

const actions = createActions(oauth);
describe('Actions formData', () => {
    test('Actions to save data local', () => {
        expect(actions.formData.local.save()).toEqual({type: "formData/local/save"});
    });
    test('Actions to save data server', () => {
        expect(actions.formData.server.update()).toEqual({type: "formData/server/update"});
        expect(actions.formData.server.success({})).toEqual({
            type: "formData/server/success",
            payload: {status: {}}
        });
        expect(actions.formData.server.error({})).toEqual({
            type: "formData/server/error",
            payload: {error: {}}
        });
    });

});