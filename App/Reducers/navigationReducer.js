import {createNavigationReducer} from "react-navigation-redux-helpers";
import NavigatorStack from "../Navigation/navigationStack";

const NavigationReducer = createNavigationReducer(NavigatorStack);

export default NavigationReducer;
