import {select} from "redux-saga/effects";
import RNFetchBlob from "react-native-fetch-blob";
import {unzip} from "react-native-zip-archive";
import {DocumentDirectoryPath} from "react-native-fs";
import actions from "../Actions";
import Utils from "../Utils";
import config from "../conf.json";

export default () => {
    /**
     * Create folders in app
     */
    function* createFolders () {
        if (config && config.folders) {
            yield Utils.createDirectory(config.folders, "");
        }
    }

    function* downloadBuildProd () {
        const {dirs} = RNFetchBlob.fs;
        let name = "build-prod.zip",
            folder = "FormRender",
            folderUnzip = "build-prod",
            sourcePath = `${DocumentDirectoryPath}/${folder}/${name}`,
            targetPath = `${DocumentDirectoryPath}/${folder}/${folderUnzip}`,
            state = yield select(),
            Settings = Utils.getSettings(state);

        if (state.Net.isConnected) {
            yield RNFetchBlob
                .config({path: `${dirs.DocumentDir}/${folder}/${name}`})
                .fetch("GET", `${Settings.server.url}/${name}`, {})
                .then((res) => {
                    console.log("The file saved to ", res.path());
                    unzip(sourcePath, targetPath)
                        .then((path) => {
                            console.log(`Unzip completed at ${path}`);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
        }
    }

    return {
        [actions.fs.app.folders.create]: createFolders,
        [actions.fs.app.buildProd.download]: downloadBuildProd
    };
};
