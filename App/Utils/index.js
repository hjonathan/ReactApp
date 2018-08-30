import apiUtil from "./api";
import effectsUtil from "./effects";
import formRender from "./formRender";
import * as project from "./project";
import formData from "./formData";
import fs from "./fs";
import * as preferences from "./preferences";
import toast from "./toastMessage";

const Utils = Object.assign(
    {},
    apiUtil,
    effectsUtil,
    formRender,
    project,
    formData,
    fs,
    preferences,
    toast
);

export default Utils;
