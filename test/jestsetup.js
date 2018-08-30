import Realm from 'realm';
import path from 'path';
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});
// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.fetch = require('jest-fetch-mock');
global.FormData = require('FormData');
global.navigator = {
    geolocation: {
        getCurrentPosition: (position) => {}
    }
};

const databasesPath = path.join(process.cwd(), '__tests__/databases');
Realm.defaultPath = path.join(databasesPath, 'defaultRealm');
