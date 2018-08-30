import RNFS from "react-native-fs";
import _ from "lodash";
import RNFetchBlob from "react-native-fetch-blob";

/**
 * Check file exists, if exist return new name with de count
 * @param pathDir
 * @param filename
 * @param count
 * @returns {*}
 */
const newNameIfExist = (pathDir, filename, count = 0) => new Promise((resolve, reject) => {
    let newName = count === 0 ? filename : `${count}-${filename}`,
        path = `${pathDir}/${newName}`;
    RNFS.exists(path).then((exists) => {
        if (exists) {
            count += 1;
            newName = `${count}-${filename}`;
            resolve(newNameIfExist(pathDir, filename, count));
        } else {
            resolve(newName);
        }
    });
});

export default {
    /**
     * Create directories structure based in a json object
     * @param folder
     * @param root
     */
    * createDirectory (folder, root) {
        let path = "";
        if (_.isString(folder)) {
            path = yield `${RNFS.DocumentDirectoryPath + root}/${folder}`;
            if (!(yield RNFS.exists(path))) {
                yield RNFS.mkdir(path);
            }
            return;
        } else if (_.isObject(folder) && !folder.length) {
            // eslint-disable-next-line no-restricted-syntax,guard-for-in
            for (let fol in folder) {
                path = yield `${RNFS.DocumentDirectoryPath + root}/${fol}`;
                if (!(yield RNFS.exists(path))) {
                    yield RNFS.mkdir(path);
                }
                yield this.createDirectory(folder[fol], `${root}/${fol}`);
            }
            return;
        } else if (_.isArray(folder)) {
            for (let index = 0; index <= folder.length; index += 1) {
                path = RNFS.DocumentDirectoryPath + root;
                if (!(yield RNFS.exists(path))) {
                    yield RNFS.mkdir(path);
                }
                yield this.createDirectory(folder[index], root);
            }
            return;
        }
    },
    /**
     * Write in file with RFNS with options
     * @param options
     */
    * writeFile (options) {
        let flag = yield RNFS.exists(options.path);
        if (!flag) {
            yield RNFS.writeFile(options.path, options.body, options.encode);
        } else if (options.overwrite === true) {
            yield RNFS.unlink(options.path);
            yield RNFS.writeFile(options.path, options.body, options.encode);
        }
    },
    /**
     * Download file from a url and save in new path
     * @param url
     * @param pathSaveFile
     * @returns {Promise<any> | Promise}
     */
    urlDownloadFile (url, pathSaveFile) {
        return new Promise((resolve, reject) => {
            RNFetchBlob
                .config({
                    path: pathSaveFile
                })
                .fetch("GET", url)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    newNameIfExist
};
