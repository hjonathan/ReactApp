import {createActions} from "redux-actions";
import oauth from "./oauth";
import user from "./user";
import settings from "./settings";
import caseNotes from "./caseNotes";
import cases from "./cases";
import dynaform from "./dynaform";
import formRender from "./formRender";
import project from "./project";
import fs from "./fs";
import dataForm from "./formData";
import fileMobile from "./fileMobile";
import notification from "./notification";
import screens from "./screens";
import net from "./net";

const actions = createActions(Object.assign(
    {},
    oauth,
    user,
    settings,
    caseNotes,
    cases,
    dynaform,
    formRender,
    project,
    fs,
    dataForm,
    screens,
    fileMobile,
    notification,
    net
));

export default actions;
