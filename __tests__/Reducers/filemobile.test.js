import actions from "../../App/Actions";
import reducers from "../../App/Reducers";

describe('Reducer notification.js', async () => {

    test('actions.file.formDataFile.success', () => {
        expect(reducers({}, {
            type: "file/formDataFile/success",
            payload: {
                response: {}
            }
        })).toBeTruthy();
    });

    test('actions.file.upload.success', async () => {
        expect(reducers({}, {
            type: "file/upload/success",
            payload: {
                response: {
                    status: "ok"
                }
            }
        })).toBeTruthy();
    });

    test('actions.file.register.success', async () => {
        expect(reducers({}, {
            type: "file/register/success",
            payload: {
                response: {
                    status: "ok"
                }
            }
        })).toBeTruthy();
    });

    test('actions.file.register.error', async () => {
        expect(reducers({}, {
            type: "file/register/error",
            payload: {
                error: {
                    status: "fail"
                }
            }
        })).toBeTruthy();
    });
});
