import 'react-native';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import SearchBar from '../../App/Components/SearchBar';

describe('Component >>> searchBar', () => {
    let searchBar;

    beforeEach(() => {
        searchBar = shallow(<SearchBar />);
    });

    it('Render searchBar', () => {
        expect(toJson(searchBar)).toMatchSnapshot();
    });
});
