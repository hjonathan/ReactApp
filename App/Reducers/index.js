import {combineReducers} from "redux";
import NavigationReducer from "./navigationReducer";
import Oauth from "./Login";
import Settings from "./settings";
import CaseNotes from "./caseNotes";
import Cases from "./cases";
import Project from "./project";
import FormRender from "./formRender";
import FormData from "./formData";
import Net from "./net";
import User from "./user";
import FileMobile from "./fileMobile";
import Notification from "./notification";
import Screens from "./screens";

const AppReducer = combineReducers({
    NavigationReducer,
    Oauth,
    Settings,
    CaseNotes,
    Cases,
    Project,
    FormRender,
    FormData,
    Net,
    User,
    Notification,
    Screens,
    FileMobile
});

export default AppReducer;
