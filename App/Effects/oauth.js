import {GoogleSignin} from "react-native-google-signin";
import {NavigationActions} from "react-navigation";
import {call, put, select} from "redux-saga/effects";
import actions from "../Actions";
import Utils from "../Utils";
import I18n from "../I18n";

export default (WsManager) => {
    /**
     * Function Generator for login request to Processmaker coming from dispatcher and open the inbox
     * @param action
     */
    function* loginRequest (action) {
        let state = yield select(),
            user;
        try {
            user = yield call(WsManager.login, Utils.mergePropsStateApi(state), action.payload);
            if (user.error) {
                if (user.error.code) {
                    yield put(actions.login.error({
                        error: user.error.code,
                        error_description: user.error.message
                    }));
                } else {
                    yield put(actions.login.error(user));
                }
            } else {
                yield put(actions.login.success(user));
                yield put(actions.userData.request());
                yield put(actions.notification.device.request());
                yield put(actions.fs.app.folders.create());
                yield put(actions.fs.app.buildProd.download());
                const routeToScreen = NavigationActions.navigate({
                    routeName: "Drawer"
                });
                yield put(routeToScreen);
            }
        } catch (e) {
            yield put(actions.login.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Function Generator for login request to Processmaker using google account, this coming from dispatcher and open the inbox
     * @param action
     */
    function* googleLoginRequest (action) {
        try {
            let state = yield select();
            const user = yield call(WsManager.googleLogin, Utils.mergePropsStateApi(state), action.payload);
            if (user.error) {
                if (user.error.code) {
                    yield put(actions.login.error({
                        error: user.error.code,
                        error_description: user.error.message
                    }));
                } else {
                    yield put(actions.login.error(user));
                }
            } else {
                yield put(actions.login.success(user));
                yield put(actions.userData.request());
                yield put(actions.fs.app.folders.create());
                yield put(actions.fs.app.buildProd.download());
                const routeToScreen = NavigationActions.navigate({
                    routeName: "Drawer"
                });
                yield put(routeToScreen);
            }
        } catch (e) {
            yield put(actions.login.error({error: "error", error_description: e.toString()}));
        }
    }

    /**
     * Function Generator for logout request to Processmaker
     * @param action
     */
    function* logoutRequest (action) {
        let state = yield select(),
            payload;
        if (state.Net.isConnected) {
            yield call(WsManager.resetNotification, Object.assign({}, Utils.mergePropsStateApi(state), state.Notification));
            payload = yield call(Utils.tryEffectsApiRequest, {
                wsManager: WsManager,
                payload: action.payload,
                state,
                service: "logout",
                action: actions.logout
            });
            if (!payload.error) {
                yield put(actions.oauth.reset());
                yield put(actions.cases.reset());
                if (state.Oauth && state.Oauth.isGoogleLoggedIn) {
                    GoogleSignin.revokeAccess()
                        .then(() => GoogleSignin.signOut())
                        .then(() => {
                        })
                        .done();
                }
                yield put(NavigationActions.navigate({
                    routeName: "Login"
                }));
            }
        } else {
            Utils.showToast({message: I18n.t("Message_Internet")});
        }
    }

    return {
        [actions.login.request]: loginRequest,
        [actions.googleLogin.request]: googleLoginRequest,
        [actions.logout.request]: logoutRequest
    };
};
