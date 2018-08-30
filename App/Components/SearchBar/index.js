import React, {Component} from "react";
import {View, TextInput} from "react-native";
import I18n from "../../I18n";
import * as Res from "../../Assets/resources";
import Styles from "./styles";

const type = "search";
/**
 * Class SearchBar
 * Example:
 *      import SearchBar from "../../SearchBar";
 *
 *      class SearchBar extendes Component {
 *          render(
 *              <SearchBar />
 *          );
 *      }
 * }
 */
class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchInput: false
        };
    }
    /**
     * Renders searchBar
     */
    render () {
        return (
            <View style={{opacity: 0.9}}>
                <TextInput
                    style={Styles.searchBox}
                    onEndEditing={this.props.onEndEdit}
                    returnKeyType={type}
                    placeholderTextColor={Res.colors.gray}
                    placeholder={I18n.t("activity_lists_search_action_hint")}
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    }
}

export default SearchBar;
