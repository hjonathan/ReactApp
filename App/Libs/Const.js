import RNFS from "react-native-fs";

export const CASE = {
    INBOX: "Inbox",
    DRAFT: "Draft",
    PARTICIPATED: "Participated",
    UNASSIGNED: "Unassigned",
    STATUS: {
        NONE: "none",
        SENDING: "sending",
        WORKING: "working",
        OFFLINE: "offline"
    }
};

export const DATETIME = {
    LOCAL: "YYYY-MM-DD HH:mm:ss",
    LOCAL_UTC: "YYYY-MM-DD HH:mm:ss Z"
};

export const DATE = {
    SIMPLE: "YYYYMMDD",
    LOCAL: "YYYY-MM-DD"
};

export const TIME = {
    LOCAL: "HH:mm:ss"
};

export const DS = "/";

export const PATH = {
    PROJECT: `${RNFS.DocumentDirectoryPath}`,
    FORMRENDER: `${DS}FormRender`,
    STEPS: `${DS}Steps`,
    NEXTSTEPS: `${DS}NextSteps`,
    FROMS: `${DS}Forms`,
    DATA: `${DS}Data`,
    EXTERNALLIBS: `${DS}ExternalLibs`,
    BUILDPROD: `${DS}build-prod`,
    MUSIC: "/storage/emulated/0/Music/processmakeraudiorecord/"
};

export const FILENAMES = {
    EXTERNALMAP: "ExtMap.json"
};
