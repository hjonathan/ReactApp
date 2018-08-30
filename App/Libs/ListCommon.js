import _ from "lodash";
import Task from "../Model/Task";
import Step from "../Model/Step";
import {CASE} from "./Const";

/**
 * Function commons for: inbox, draft, unassigned and participated
 */
export default class ListCommon {
    /**
     * Constructor
     * @param props
     */
    constructor (props) {
        this.props = props;
        this.task = Task.allTaskIdOffline();
    }

    /**
     * Get data lists
     * @param method
     * @param params
     */
    getDataList (method, params = {}) {
        if (this.props[method]) {
            this.props[method](params);
        }
    }

    /**
     * Gets usersInfo
     * @param caseList
     * @param type is type in list: prevUser, currentUser
     */
    getUsersInfo (caseList, type) {
        if (caseList.length > 0 && caseList[0][type]) {
            const ids = caseList.map(cases => cases[type].userId);
            this.props.userInfoRequest({
                size: "1",
                user: {
                    ids: _.uniq(ids)
                }
            });
        }
    }

    /**
     * Merges userPhoto props to dataList
     * @param params
     * @param type is type in list: prevUser, currentUser
     */
    mergeList (params, type) {
        let i,
            j,
            cbUser = function (user) { return user.userId === params.caseList[i][type].userId; };
        if (params.caseList) {
            for (i = 0; i < params.caseList.length; i += 1) {
                if (params.caseList[i][type]) {
                    j = _.findIndex(params.users, cbUser);
                    if (j >= 0) {
                        params.caseList[i].userPhoto = params.users[j].userPhoto;
                    }
                    params.caseList[i].status = this.processIfOffline(params.caseList[i]);
                }
            }
        }
        return params.caseList;
    }

    /**
     * Check if case is offline and get all necessary for case
     * @param caseData
     * @returns {boolean}
     */
    processIfOffline (caseData) {
        let isOffline,
            {status} = caseData;
        if (!status || status === CASE.STATUS.NONE) {
            if (caseData.task.offlineEnabled === "TRUE" && this.props.caseOffline) {
                this.props.caseOffline(caseData);
                status = CASE.STATUS.OFFLINE;
            }
            isOffline = Step.existSteps(caseData.process.processId, caseData.task.taskId);
            if (isOffline && _.includes(this.task, caseData.task.taskId)) {
                status = CASE.STATUS.OFFLINE;
            }
        }
        return status;
    }

    /**
     * Key for FlatList formed by delIndex and caseId
     * @param item
     * @returns {string}
     */
    keyExtractor (item, index) {
        return `${item.delIndex}_${item.caseId}`;
    }
}
