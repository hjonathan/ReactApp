import {handleActions} from "redux-actions";
import actions from "../Actions";

const initialState = {
    register: {
        file: null,
        error: null
    }
};
export default handleActions(
    {
    /**
         * Reducer for "file/formDataFile/success" action
         * @param state
         * @param action
         */
        [actions.file.formDataFile.success]: (state, action) => ({
            fileParams: action.payload.response
        }),
        /**
         * Reducer for "file/uploadFile/success" action
         * @param state
         * @param action
         */
        [actions.file.upload.success]: (state, action) => ({
            uploadFile: action.payload.response
        }),
        /**
         * Reducer for "file/register/success" action
         * @param state
         * @param action
         */
        [actions.file.register.success]: (state, action) => ({
            register: {
                file: action.payload,
                error: null
            }
        }),
        /**
         * Reducer for "file/register/error" action
         * @param state
         * @param action
         */
        [actions.file.register.error]: (state, action) => ({
            register: {
                ...state.register,
                error: action.payload.error
            }
        })
    },
    initialState
);
