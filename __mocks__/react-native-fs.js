const RNFS = {
    DocumentDirectoryPath: "test",
    writeFile: (filepath, contents, encodingOrOptions) => Promise.resolve(true),
    exists: filepath => Promise.resolve(true),
    unlink: filepath => Promise.resolve(true),
    mkdir: (filepath, options) => Promise.resolve(true),
    moveFile: (filepath, destPath) => Promise.resolve(true),
    stat: filepath => Promise.resolve(true)
};

export default RNFS;
