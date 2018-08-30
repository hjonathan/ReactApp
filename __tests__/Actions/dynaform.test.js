import {createActions} from "redux-actions"
import oauth from "../../App/Actions/dynaform"

const actions = createActions(oauth);
describe('Actions dynaform', () => {
    test('Actions for dynaforms', () => {
        expect(actions.dynaform.processed.request()).toEqual({type: "dynaform/processed/request"});
        expect(actions.dynaform.processed.success({})).toEqual({
            type: "dynaform/processed/success",
            payload: {status: {}}
        });
        expect(actions.dynaform.processed.error({})).toEqual({
            type: "dynaform/processed/error",
            payload: {error: {}}
        });
    });
});

