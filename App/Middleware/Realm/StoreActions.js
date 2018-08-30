const actionsSelected = [
    /**
     * This array contains the action and its corresponding model in Realm
     */
    {action: "userData/success", className: "User", fn: "createUser"}, // Save data user after login
    {action: "cases/userInfo/success", className: "User", fn: "createBatch"}, // Save request all users of each case
    {action: "cases/newcases/success", className: "StartCase", fn: "createBatch"}, // Save list start-case
    {action: "cases/inbox/success", className: "Todo", fn: "saveList"}, // Save list Inbox
    {action: "cases/unassigned/success", className: "Unassigned", fn: "saveList"}, // Save list Unassigned
    {action: "cases/participated/success", className: "Participated", fn: "saveList"}, // Save list Participated
    {action: "cases/draft/success", className: "Draft", fn: "saveList"}, // Save list Draft
    {action: "cases/data/success", className: "Data", fn: "saveCaseData"}, // Save list Draft
    {action: "project/task/steps/success", className: "Step", fn: "createOffline"}, // Save Step of open case
    {action: "dynaform/processed/success", className: "Form", fn: "saveList"} // Save Step of open case
];
export default actionsSelected;
