import _ from "lodash";
import BaseModel from "./Interface/BaseModel";
import {RealmObject, StepSchema} from "./Schemas";

/**
 * Model for Step
 */
class Step extends BaseModel {
    constructor () {
        super(StepSchema.schema.name);
    }

    /**
     * Store a newly created resource in storage.
     * @param params
     */
    create (params) {
        RealmObject.write(() => {
            RealmObject.create(StepSchema.schema.name, params, true);
        });
    }

    /**
     * Save the list when the action project/task/steps/success is executed
     * @param params
     */
    createOffline (params) {
        let steps = [];
        if (params.data) {
            steps = params.data;
        }
        if (params.response) {
            steps = params.response;
        }
        RealmObject.write(() => {
            steps.map((step) => {
                RealmObject.create(StepSchema.schema.name, Object.assign({
                    id: step.stepId + step.formId,
                    processId: params.params.prj_uid,
                    taskId: params.params.act_uid
                }, step), true);
                return;
            });
        });
    }

    /**
     * Return all rows that it has processId and taskId
     * @param processId
     * @param taskId
     * @returns {Array}
     */
    getStepOffline (processId, taskId) {
        let result = RealmObject.objects(StepSchema.schema.name)
            .filtered(`processId = "${processId}" AND taskId = "${taskId}"`).sorted("stepPosition");
        return result.map(x => _.assign({}, x));
    }

    /**
     * Return all rows that it has processId and taskId
     * @param processId
     * @param taskId
     * @returns {Array}
     */
    existSteps (processId, taskId) {
        let result = RealmObject.objects(StepSchema.schema.name)
            .filtered(`processId = "${processId}" AND taskId = "${taskId}"`);
        return result.length > 0;
    }

    /**
     * Latest caseNumber of new cases
     * @returns {number}
     */
    latestStepId (processId, taskId) {
        let lastForm = RealmObject.objects(StepSchema.schema.name)
            .filtered(`processId = "${processId}" AND taskId = "${taskId}"`).sorted("stepPosition", true)[0];
        return lastForm && lastForm.stepId ? lastForm.stepId : null;
    }

    /**
     * Delete multiple Steps
     */
    destroyObject () {
        RealmObject.write(() => {
            let allObjects = RealmObject.objects(StepSchema.schema.name);
            RealmObject.delete(allObjects); // Deletes all Steps
        });
    }
}

export default new Step();
