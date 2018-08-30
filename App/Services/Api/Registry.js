/* eslint-disable no-restricted-syntax */
const urlBase = "{url}/api/1.0/{workspace}{service}",
    services = {
        AUTHENTICATE_USER: "/oauth2/token",
        USER_DATA: "/light/user/data",
        GET_MAIN_MENU_COUNTERS: "/light/counters",
        GET_CASE_NOTES_LIST: "/light/case/{app_uid}/notes",
        GET_PROCESS_MAP: "/light/project/{prj_uid}/case/{app_uid}",
        GET_LISTS_TODO: "/light/todo?search={search}",
        GET_LIST_UNASSIGNED: "/light/unassigned?search={search}",
        GET_LISTS_PARTICIPATED: "/light/participated?search={search}",
        GET_LISTS_DRAFT: "/light/draft?search={search}",
        GET_LISTS_PAUSED: "/light/paused",
        GET_LISTS_COMPLETED: "/light/completed",
        GET_USERS_PICTURES: "/light/users/data",
        FORMS_ARRAY: "/light/project/{prj_uid}/activity/{act_uid}/steps",
        GET_NEW_CASES: "/light/start-case",
        GET_HISTORY_CASES: "/light/history/{app_uid}",
        LOGOUT_USER: "/light/logout",
        UPLOAD_LOCATION: "/light/case/{app_uid}/upload/location",
        GET_FORM_ID_TO_UPLOAD: "/light/case/{app_uid}/upload",
        UPLOAD_FILE: "/light/case/{app_uid}/upload/{app_doc_uid}",
        GET_CASE_INFO: "/light/{type}/case/{app_uid}",
        REQUEST_PAUSE_CASE: "/light/cases/{app_uid}/pause",
        REQUEST_UNPAUSE_CASE: "/light/cases/{app_uid}/unpause",
        REQUEST_CANCEL_CASE: "/light/cases/{app_uid}/cancel",
        REQUEST_SYS_CONFIG: "/light/config",
        REQUEST_SYS_CONFIG_V2: "/light/config?fileLimit=true",
        ROUTE_CASE: "/light/cases/{app_uid}/route-case",
        CLAIM_CASE: "/light/case/{app_uid}/claim",
        GET_FILE_VERSIONS: "/cases/{app_uid}/input-document/{app_doc_uid}/versions",
        REGISTER: "https:trial32.processmaker.com/syscolosa/en/neoclassic_pro/9893000714bdb2d52ecc317052629917/Trial_RequestPostMobile.php",
        ADD_NOTE: "/light/case/{app_uid}/note",
        REGISTER_WITH_GOOGLE_FAKE_URL: "fakeurl",
        SIGN_IN_TO_PM_WITH_GOOGLE: "/authentication/gmail",
        GET_CASE_VARIABLES: "/light/{app_uid}/variables?pro_uid={pro_uid}&act_uid={act_uid}&app_index={del_index}",
        REGISTER_DEVICE_TOKEN_FOR_NOTIFICATIONS: "/light/notification",
        UNREGISTER_DEVICE_TOKEN_FOR_NOTIFICATIONS: "/light/notification/{dev_uid}",
        GET_ASSIGMENT_USERS: "/light/task/{act_uid}/case/{app_uid}/{del_index}/assignment",
        DOWNLOAD_FILE: "/cases/{app_uid}/input-document/{app_doc_uid}/file?v=1",
        VERIFY_CASE_NOT_ROUTED: "/light/case/{app_uid}/{del_index}",
        GET_FORM_DEFINITION: "/light/project/{pro_uid}/dynaform/{dyn_uid}",
        GET_FORM_DEFINITION_PREPROCESSED: "/light/project/{prj_uid}/dynaformprocessed/{dyn_uid}?app_uid={app_uid}&del_index={del_index}",
        START_CASE: "/light/process/{prj_uid}/task/{act_uid}/start-case",
        GET_FORM_DEFINITIONS: "/cases/{app_uid}/input-document/{app_doc_uid}/file?v={version}",
        SAVE_FORM_DATA: "/light/{app_uid}/variable?dyn_uid={dyn_uid}&del_index={del_index}",
        EXECUTE_TRIGGERS_AFTER: "/light/process/{pro_uid}/task/{act_uid}/case/{app_uid}/step/{step_uid}/execute-trigger/after",
        CHECK: "/light/{listType}/check",
        GET_NEXT_STEP: "/light/get-next-step/{app_uid}"
    };

export default {
    getUrl (keys, service) {
        let k,
            url = urlBase.replace(/{service}/, services[service]),
            index,
            reg;

        for (k in keys) {
            if (Object.prototype.hasOwnProperty.call(keys, k)) {
                url = url.replace(new RegExp(`{${k}}`, "g"), keys[k]);
            }
        }
        index = url.indexOf("?");
        if (index !== -1) {
            reg = new RegExp("{\\w+}", "g");
            if (reg.exec(url)) {
                url = url.substring(0, index);
            }
        }
        return url;
    }
};
