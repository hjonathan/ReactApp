export default {
    /**
     * String to inject in webView: openCase
     * @param data
     * @returns {string}
     */
    injectOpenCase: data => `app.openCase("${data.url}",` +
            `"${data.workspace}",` +
            `"${data.access_token}",` +
            `"${data.refresh_token}",` +
            `"${data.prj_uid}",` +
            `"${data.act_uid}",` +
            `"${data.app_uid}",` +
            `"file://${data.steps}",` +
            `"${data.del_index}",` +
            `"${data.lang}",` +
            `"${data.isRTL}",` +
            `"${data.offLineMode}",` +
            `"${data.statusConnection}")`,
    /**
     * String to inject in webView: openStep
     * @param data
     * @returns {string}
     */
    injectOpenStep: data => `app.openStep("${data.url}",` +
        `"${data.workspace}",` +
        `"${data.access_token}",` +
        `"${data.refresh_token}",` +
        `"${data.prj_uid}",` +
        `"${data.act_uid}",` +
        `"${data.app_uid}",` +
        `"file://${data.steps}",` +
        `"${data.del_index}",` +
        `"${data.lang}",` +
        `"file://${data.dataPath}",` +
        `"${data.isRTL}",` +
        `"${data.offLineMode}",` +
        `"${data.statusConnection}")`,
    /**
     * String to inject in webView: continueStep
     * @param data
     * @returns {string}
     */
    injectContinueStep: data => `${"app.continueStep(" +
            "\"file://"}${data.path}")`,
    /**
     * String to Inject in webView: loadForm
     * @param data
     * @returns {string}
     */
    injectLoadForm: data => `${"app.loadForm(\"\"," +
            "\"file://"}${data.path}")`,
    /**
     * String to Inject in webView: setFormData
     * @param data
     * @returns {string}
     */
    injectSetFormData: data => `app.setFormData('${JSON.stringify(data.stepData)}',` +
            `'file://${data.path}')`,
    /**
     * Calls getFormData pmDynaform function
     * @returns {string}
     */
    injectGetFormData: () => "app.getFormData()",
    /**
     * String to inject data in webView: setFiles
     * @param data
     * @returns {string}
     */
    injectSetFiles: data => `app.setFiles('${JSON.stringify(data)}')`,
    /**
     * String to inject data in webView: setFileVersions
     * @param params object
     * @returns {string}
     */
    injectSetFileVersions: params => `app.setFileVersions("${params.fieldID}",` +
        `"${params.appDocUid}",` +
        `'${params.response}',` +
        `"${params.success}")`,
    /**
     * String to inject data to setLocation function
     * @param data
     * @returns {string}
     */
    injectSetLocation: data => `app.setLocation('${JSON.stringify(data)}')`,
    /**
     * String to Inject in webView: hideFieldLoading
     * @param input string
     * @returns {string}
     */
    injectHideFieldLoading: input => `app.hideFieldLoading('${JSON.stringify(input)}')`,
    /**
     * String to Inject in webView: setFormData
     * @param data
     * @returns {string}
     */
    injectHideMaskLoading: data => "app.hideMaskLoading()",
    /**
     * String to Inject in webView: getWhichDataToUse
     * @param data
     * @returns {string}
     */
    injectGetWhichDataToUse: data => `app.getWhichDataToUse('${data}')`,
    /**
     * String to Inject in webView: setCacheLibraryMap
     * @param params
     * @returns {string}
     */
    injectSetCacheLibraryMap: params => `app.setCacheLibraryMap('${params.path}')`
};
