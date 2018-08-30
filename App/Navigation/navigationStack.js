import React from "react";
import {connect} from "react-redux";
import {Image, I18nManager} from "react-native";
import {
    createStackNavigator,
    createDrawerNavigator,
    createSwitchNavigator
} from "react-navigation";
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import * as Res from "../Assets/resources";
import WalkThrough from "../Screens/WalkThrough";
import Login from "../Screens/Login";
import FormRender from "../Screens/FormRender";
import Inbox from "../Screens/Inbox";
import Draft from "../Screens/Draft";
import Unassigned from "../Screens/Unassigned";
import Participated from "../Screens/Participated";
import Switch from "../Screens/Switch";
import Settings from "../Screens/Settings";
import CaseInformation from "../Screens/CaseInformation";
import CaseNotes from "../Screens/CaseNotes";
import History from "../Screens/History";
import NewCases from "../Screens/NewCases";
import NavigatorTitle from "../Components/NavigatorTitle";
import I18n from "../I18n";
import BodyDrawer from "./bodyDrawer";
import {CASE} from "../Libs/Const";

/**
 * Define the navigator stack with all available screens into the App.
 */
const InboxStack = createStackNavigator({
        Inbox,
        History,
        CaseNotes,
        NewCases,
        FormRender,
        Settings
    }, {
        initialRouteName: CASE.INBOX
    }),
    UnassignedStack = createStackNavigator({
        Unassigned,
        NewCases,
        FormRender,
        CaseNotes,
        History,
        CaseInformation,
        Settings
    }, {
        initialRouteName: CASE.UNASSIGNED
    }),
    ParticipatedStack = createStackNavigator({
        Participated,
        NewCases,
        CaseNotes,
        History,
        CaseInformation,
        Settings
    }, {
        initialRouteName: CASE.PARTICIPATED
    }),
    DraftStack = createStackNavigator({
        Draft,
        NewCases,
        FormRender,
        CaseNotes,
        History,
        Settings
    }, {
        initialRouteName: CASE.DRAFT
    }),
    /**
     * Function for navigationOptions in drawer stacks items
     * @param menuName Name of list
     * @param icon Icon of list
     * @param number is number case in a list
     * @returns {{drawerLabel: *, drawerIcon: *}}
     */
    navOptionsListCase = (menuName, icon, number) => ({
        drawerLabel: (
            <NavigatorTitle
                title={menuName}
                number={number}
            />
        ),
        drawerIcon: (
            <Image
                source={icon}
                style={{width: 24, height: 24}}
            />
        )
    }),
    /**
     * Define the draw navigator stack with all available App.
     */
    AppDrawerStack = createDrawerNavigator({
        Inbox: {
            screen: InboxStack,
            navigationOptions: ({navigation}) => {
                const number = navigation.state.params && navigation.state.params.counters
                    ? navigation.state.params.counters.toDo
                    : 0;
                return navOptionsListCase(I18n.t("menu_drawer_main_menu_item_inbox"), Res.images.inbox, number);
            }
        },
        Unassigned: {
            screen: UnassignedStack,
            navigationOptions: ({navigation}) => {
                const number = navigation.state.params && navigation.state.params.counters
                    ? navigation.state.params.counters.unassigned
                    : 0;
                return navOptionsListCase(
                    I18n.t("menu_drawer_main_menu_item_unassigned"),
                    Res.images.unassigned,
                    number
                );
            }
        },
        Participated: {
            screen: ParticipatedStack,
            navigationOptions: ({navigation}) => {
                const number = navigation.state.params && navigation.state.params.counters
                    ? navigation.state.params.counters.participated
                    : 0;
                return navOptionsListCase(
                    I18n.t("menu_drawer_main_menu_item_participated"),
                    Res.images.participated,
                    number
                );
            }
        },
        Draft: {
            screen: DraftStack,
            navigationOptions: ({navigation}) => {
                const number = navigation.state.params && navigation.state.params.counters
                    ? navigation.state.params.counters.draft
                    : 0;
                return navOptionsListCase(I18n.t("menu_drawer_main_menu_item_draft"), Res.images.draft, number);
            }
        }
    }, {
        contentComponent: BodyDrawer,
        drawerPosition: I18nManager.isRTL ? "right" : "left"
    }),
    /**
     * Define the Login navigator stack.
     */
    LoginStack = createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        Settings
    }, {
        initialRouteName: "Login"
    }),
    /**
     * Define the Switch navigator stack.
     */
    NavigatorStack = createSwitchNavigator(
        {
            Auth: Switch,
            WalkThrough,
            Login: LoginStack,
            Drawer: AppDrawerStack
        },
        {
            initialRouteName: "Auth"
        }
    ),
    /**
     * Function to work navigation redux helpers
     * @returns {{navMiddleware, AppWithNavigationState}}
     */
    redux = () => {
        const navMiddleware = createReactNavigationReduxMiddleware(
                "Login",
                state => state.NavigationReducer
            ),
            AppWithNavigationState = reduxifyNavigator(NavigatorStack, "Login");
        return {
            navMiddleware,
            AppWithNavigationState
        };
    },
    {navMiddleware, AppWithNavigationState} = redux(),
    mapStateToProps = state => ({
        state: state.NavigationReducer
    }),
    AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export default NavigatorStack;
export {AppNavigator, navMiddleware};
