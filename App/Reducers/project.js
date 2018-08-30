import {handleActions} from "redux-actions";
import actions from "../Actions";
import Utils from "../Utils";
/** Example: Structure of Project Object in state
 * {
    projects: {
     processid1:{
       tasks:{
         taskid1:{
           steps:[]
           }
         }
      }
    }
 * }
 *
 */

const initialState = {};

export default handleActions(
    {
    /**
         * Reducer for action project/task/steps/success
         * @param state
         * @param action
         * @returns {*}
         */
        [actions.project.task.steps.success]: (state, action) => {
            let nState = Object.assign({}, state);
            return Utils.saveStepsInState(nState, action.payload.params.prj_uid, action.payload.params.act_uid, action.payload.response);
        }
    },
    initialState
);
