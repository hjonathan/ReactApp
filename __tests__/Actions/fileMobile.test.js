import actions from "../../App/Actions"

describe('Actions Image Control', () => {
    test('Actions for image control (Service)', () => {
        expect(actions.file.formDataFile.request()).toEqual({type: "file/formDataFile/request"});
        expect(actions.file.formDataFile.success({})).toEqual({type: "file/formDataFile/success", payload: {response: {}}});
        expect(actions.file.formDataFile.error({})).toEqual({type: "file/formDataFile/error", payload: {error: {}}});

        expect(actions.file.register.request()).toEqual({type: "file/register/request"});
        expect(actions.file.register.success({})).toEqual({type: "file/register/success", payload: {}});
        expect(actions.file.register.error({})).toEqual({type: "file/register/error", payload: {error: {}}});

        expect(actions.file.upload.request()).toEqual({type: "file/upload/request"});
        expect(actions.file.upload.success({})).toEqual({type: "file/upload/success", payload: {response: {}}});
        expect(actions.file.upload.error({})).toEqual({type: "file/upload/error", payload: {error: {}}});
    });
});
