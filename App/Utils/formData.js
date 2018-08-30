import RNFS, {DocumentDirectoryPath} from "react-native-fs";
import cleaner from "react-native-clear-cache";
import RNSettings from "react-native-settings";
import _ from "lodash";
import * as Models from "../Model";
import Utils from "./index";
import {PATH} from "../Libs/Const";

/**
 * Get all path external libraries
 * @param formContent object
 * @param librariesInside
 * @param level
 * @returns {Array}
 */
const externalLibraries = (formContent, librariesInside = [], level = 0) => {
    if (formContent.items) {
        librariesInside = externalLibraries(formContent.items, librariesInside, level);
    }
    if (formContent instanceof Array) {
        formContent.map((item) => {
            if (item.items) {
                librariesInside = externalLibraries(item.items, librariesInside, level);
            }
            if (item instanceof Array && level <= 1) {
                librariesInside = externalLibraries(item, librariesInside, level += 1);
            }
            if (Object.hasOwnProperty.call(item, "externalLibs") && !_.isEmpty(item.externalLibs)) {
                let libs = item.externalLibs.replace(/\s/g, "").replace("\n", "").replace("\r", "").split(",");
                librariesInside = _.concat(librariesInside, libs);// Object.assign({}, librariesInside, libs);
            }
            return;
        });
    }
    return librariesInside;
};

export default {
    /**
     * Get the form data from state by appUid
     * @param state
     * @param appUid
     * @returns {*}
     */
    getFormData (state, appUid) {
        if (state.FormData && state.FormData[appUid]) {
            return state.FormData[appUid];
        }
        return null;
    },
    /**
     * Save steps in State by prjUid, actUid, steps
     * @param state
     * @param prjUid
     * @param actUid
     * @param steps
     * @returns {*}
     */
    saveStepsInState (state, prjUid, actUid, steps) {
        if (!state[prjUid]) {
            state[prjUid] = {tasks: {}};
        }
        if (!state[prjUid].tasks[actUid]) {
            state[prjUid].tasks[actUid] = {steps: []};
        }
        state[prjUid].tasks[actUid].steps = steps;
        return state;
    },
    /**
     * Gets the file name
     * @param pathFile
     * @returns {string|undefined}
     */
    getFileName (pathFile) {
        let fileName;
        if (pathFile && pathFile.trim()) {
            fileName = pathFile.split("/").pop();
        }
        return fileName;
    },
    /**
     * Gets the fileName's extension
     * @param fileName
     * @returns {string|undefined}
     */
    getExtensionFile (fileName) {
        let extension;
        if (fileName && fileName.trim()) {
            // eslint-disable-next-line no-bitwise
            extension = fileName.trim().slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
        }
        return extension;
    },
    /**
     * Saves the path file
     * @param filePath
     * @returns {IterableIterator<Promise<T>>}
     */
    savePath (filePath) {
        let storeFile = "text.txt",
            routeStoreFile = "/FormRender/build-prod/",
            defaultPath = RNFS.DocumentDirectoryPath + routeStoreFile + storeFile;

        if (RNFS.exists(defaultPath)) {
            RNFS.unlink(defaultPath);
        }
        RNFS.writeFile(defaultPath, filePath, "utf8")
            .then(success => success).catch(error => error);
    },
    /**
     * Method for clean realm's models
     */
    cleanDB () {
        Models.Step.destroyObject();
        Models.Form.destroyObject();
        Models.Data.destroyObject();
    },
    /**
     * Method for clean app's folders
     */
    cleanFolders () {
        cleaner.runClearCache(() => {
            console.log("Cache was cleaned");
        });
    },
    /**
     * Method for clean db and folders
     */
    cleanCache () {
        this.cleanDB();
        this.cleanFolders();
    },
    /**
     * Checks if the buildProd file was deleted
     * @returns {Promise<*|Promise<*>|undefined|PromiseLike<T>|Promise<T>|void>}
     */
    async wasCleaned () {
        let fileName = "index.html",
            folderRoute = "/FormRender/build-prod/",
            filePath = DocumentDirectoryPath + folderRoute + fileName;
        return RNFS.exists(filePath).then(result => result);
    },
    /**
     * Moves audio file to the default directory
     * @param tmpFilePath
     * @returns {{path: string, type: string}}
     */
    moveToAudioDirectory (tmpFilePath) {
        const defaultDir = PATH.MUSIC;
        let fileName,
            newFilePath,
            response = null;

        if (tmpFilePath) {
            if (!RNFS.exists(defaultDir)) {
                RNFS.mkdir(defaultDir);
            }
            fileName = Utils.getFileName(tmpFilePath);
            newFilePath = defaultDir + fileName;
            RNFS.moveFile(tmpFilePath, newFilePath);
            response = {path: newFilePath, type: `audio/${Utils.getExtensionFile(fileName)}`};
        }
        return response;
    },
    /**
     * Gets current GPS status
     * @param callback
     */
    getStatusGPS (callback) {
        RNSettings.getSetting(RNSettings.LOCATION_SETTING).then((result) => {
            let status = (result === RNSettings.ENABLED);
            callback(status);
        });
    },
    /**
     * Opens the location settings
     * @param callback
     */
    openLocationSettings (callback) {
        RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then((result) => {
            let status = (result === RNSettings.ENABLED);
            callback(status);
        });
    },
    /**
     * Changes fakeId by realId
     * @param params
     * @param dataOffline
     */
    exchangeIds (params, dataOffline) {
        let casesData = {},
            formData;
        if (dataOffline) {
            formData = dataOffline;
            formData[params.idField].id = params.appDocUid;
            casesData.data = formData;
        }
        return casesData;
    },
    /**
     * Call to function externalLibraries
     */
    externalLibraries
};
