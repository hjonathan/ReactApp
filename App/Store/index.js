import {applyMiddleware, createStore, compose} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import RealmStore from "../Middleware/Realm/RealmStore";
import rootReducer from "../Reducers";
import {navMiddleware} from "../../App/Navigation/navigationStack";
import saga from "../Effects";

const sagaMiddleware = createSagaMiddleware(),
    store = createStore(
        rootReducer,
        compose(applyMiddleware(logger, thunk, sagaMiddleware, navMiddleware, RealmStore))
    );

sagaMiddleware.run(saga);
export default store;
