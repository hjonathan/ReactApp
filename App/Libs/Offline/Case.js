import UUIDGenerator from "react-native-uuid-generator";
import _ from "lodash";
import Data from "../../Model/Data";
import * as Models from "../../Model";

/**
 * Methods for offline mode
 */
class Case {
    /**
     * Create a case with a uuid in local storage
     * @param params
     * @returns {Promise<any>}
     */
    createCase (params) {
        let caseNumber = Models.NewCase.latestCase() + 1,
            delIndex = params.delIndex || 1;
        return new Promise((resolve, reject) => {
            UUIDGenerator.getRandomUUID().then((uuid) => {
                Models.NewCase.create({
                    caseId: uuid,
                    delIndex,
                    userId: params.userId,
                    taskId: params.act_uid,
                    processId: params.prj_uid,
                    caseNumber: `${caseNumber}`,
                    date: new Date()
                });
                resolve({
                    caseId: uuid,
                    caseIndex: delIndex,
                    caseNumber
                });
            });
        });
    }

    /**
     * Get the next step
     * @param params
     * @returns {{}}
     */
    getNextStep (params) {
        let steps = Models.Step.getStepOffline(params.prj_uid, params.act_uid),
            caseData = _.values(Data.read("caseId", params.app_uid))[0],
            data = caseData ? caseData.dataJSON : {},
            {step, position} = this.evaluateConditionalStep(steps, params.step_pos, data),
            response = {};
        if (!_.isEmpty(step)) {
            response = {
                conditionalSteps: {
                    TYPE: "DYNAFORM",
                    UID: step.stepUidObj,
                    POSITION: position,
                    PAGE: `cases_Step?TYPE=DYNAFORM&UID=${step.stepUidObj}&POSITION=${position}&ACTION=${step.stepMode}`
                },
                triggers: {
                    status: "200"
                },
                variables: data
            };
        } else {
            response = {
                conditionalSteps: {
                    TYPE: "DERIVATION",
                    UID: -1,
                    POSITION: position,
                    PAGE: "cases_Step?TYPE=ASSIGN_TASK&UID=-1&POSITION=10000&ACTION=ASSIGN"
                }
            };
        }
        return response;
    }

    /**
     * Evaluate de variable for conditional step
     * @param steps
     * @param stepPosition
     * @param data
     * @returns {*}
     */
    evaluateConditionalStep (steps, stepPosition, data) {
        let newStepPosition = null,
            stepsCondition,
            position,
            value,
            condition;
        if (!_.isEmpty(data)) {
            for (let sp = stepPosition; sp < steps.length; sp += 1) {
                stepsCondition = steps[sp].stepCondition;
                position = steps[sp].stepPosition;
                if (stepsCondition === "") {
                    newStepPosition = sp;
                    break;
                }
                // eslint-disable-next-line no-useless-escape
                const regex = /\@(?:([\@\%\#\?\$\=\&])([a-zA-Z\_]\w*)|([a-zA-Z\_][\w\-\>\:]*)\(((?:[^\\\\\)]*(?:[\\\\][\w\W])?)*)\))((?:\s*\[['"]?\w+['"]?\])+|\-\>([a-zA-Z\_]\w*))?/g;
                while ((condition = regex.exec(stepsCondition)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (condition.index === regex.lastIndex) {
                        regex.lastIndex += 1;
                    }
                    switch (condition[1]) {
                        case "@": // String
                            value = data[condition[2]] ? `"${data[condition[2]]}"` : "\"\"";
                            break;
                        case "%": // Int
                            value = data[condition[2]] ? parseInt(data[condition[2]], 10) : 0;
                            break;
                        case "#": // Float
                            value = data[condition[2]] ? parseFloat(data[condition[2]]) : 0;
                            break;
                        case "$":
                            // not support, because is method mysql
                            break;
                        case "=": // Original type
                            value = data[condition[2]] ? data[condition[2]] : null;
                            break;
                        case "&": // Object
                            // not support, because is object php
                            break;
                        default:
                            break;
                    }
                    stepsCondition = stepsCondition.replace(new RegExp(`@${condition[1]}${condition[2]}`, "g"), value);
                }
                // eslint-disable-next-line no-eval
                let evExpression = eval(stepsCondition);
                if (evExpression) {
                    newStepPosition = sp;
                    break;
                }
            }
        } else {
            return {
                step: steps[stepPosition],
                position: stepPosition
            };
        }
        return {
            step: _.isInteger(newStepPosition) ? steps[newStepPosition] : {},
            position
        };
    }

    /**
     * Returns the form with your data together
     * @param params
     * @returns {*}
     */
    formWithData (params) {
        let form = Models.Form.getFormOffline(params.dyn_uid),
            caseData = _.values(Models.Data.read("caseId", params.app_uid)).shift();
        if (caseData) {
            form.formContent = this.mergeData(form.formContent, caseData.dataJSON);
        }
        return form;
    }

    /**
     * Recursive function that joins the data in each field of the form
     * @param formContent
     * @param caseData
     * @returns {*}
     */
    mergeData (formContent, caseData) {
        if (formContent.items) {
            this.mergeData(formContent.items, caseData);
        }
        if (formContent instanceof Array) {
            formContent.map((item) => {
                if (item.items) {
                    this.mergeData(item.items, caseData);
                }
                if (item instanceof Array) {
                    item.map((field) => {
                        if (_.has(caseData, field.id) && field.data && field.dataType !== "grid") {
                            field.data.value = caseData[field.id];
                            field.data.label = caseData[`${field.id}_label`];
                        }
                        if (field.dataType && field.dataType === "grid") {
                            let objectGrid = {},
                                data,
                                dataRow,
                                dataColumn;
                            _.map(caseData[field.id], (colData, keyData) => {
                                dataRow = {};
                                dataColumn = [];
                                _.map(field.columns, (col, key) => {
                                    if (_.has(colData, col.id)) {
                                        data = {};
                                        data.value = colData[col.id];
                                        data.label = colData[`${col.id}_label`] ? colData[`${col.id}_label`] : "";
                                        dataColumn[key] = data;
                                    }
                                });
                                dataRow[keyData] = dataColumn;
                                _.assign(objectGrid, dataRow);
                            });
                            field.data = objectGrid;
                        }
                        return;
                    });
                }
                return;
            });
        }
        return formContent;
    }
}

export default new Case();
