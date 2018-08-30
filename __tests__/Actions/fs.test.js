import {createActions} from "redux-actions"
import oauth from "../../App/Actions/fs"

const actions = createActions(oauth);
describe('Actions fs', () => {
    test('Actions for create folders', () => {
        expect(actions.fs.app.folders.create()).toEqual({type: "fs/app/folders/create"});
        expect(actions.fs.app.folders.remove()).toEqual({type: "fs/app/folders/remove"});
    });

    test('Actions for download build prod', () => {
        expect(actions.fs.app.buildProd.download()).toEqual({type: "fs/app/buildProd/download"});
    });
});