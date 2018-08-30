import {GoogleSignin} from "react-native-google-signin";
import {connect} from "react-redux";
import LoginScreen from "./login";
import actions from "../../Actions";

/**
 * Return state from Store to View Component
 * @param state
 */
const mapStateToProps = state => ({
    error: state.Oauth.error || null,
    isLoggedIn: state.Oauth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    /**
     * Method to get the user oauth credentials from restler service.
     */
    onLogin: (username, password) => dispatch(actions.login.request({username, password})),
    /**
     * request user data
     */
    requestUserData: params => dispatch(actions.userData.request(params)),

    /**
     * Save the device token
     * @param {*} token generated by the device.
     */
    saveTokenStorage: (token) => {
        dispatch(actions.notification.token.save(token));
    },

    signInGoogle: (callback) => {
        GoogleSignin.signIn()
            .then((user) => {
                callback(null, user);
                dispatch(actions.googleLogin.request({
                    mail: user.email,
                    token: user.accessToken,
                    clientid: user.id
                }));
            })
            .catch((err) => {
                callback(err, null);
            })
            .done();
    },
    /**
     * Applies the necessary configuration to enable Google SignIn
     */
    setupGoogleSignIn: async (callback) => {
        try {
            await GoogleSignin.hasPlayServices({autoResolve: true});
            await GoogleSignin.configure({
                iosClientId: "592781414011-evmj9utjj34m3ltu9lumfndbme1c196p.apps.googleusercontent.com",
                webClientId: "592781414011-knieb4v9rnattp8k2ljqgdng5sdqvmk5.apps.googleusercontent.com",
                offlineAccess: false
            });

            const user = await GoogleSignin.currentUserAsync();
            callback(null, user);
        } catch (err) {
            callback(err);
        }
    },
    /**
     * Method to remove session from Google (SignOut Google).
     * @param {*} callback Confirm the removed session from Google.
     */
    signOutGoogle (callback) {
        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
            callback(null, null);
        }).done();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);