import React from 'react'
import {shallow} from 'enzyme';
import ConnectSettings from '../../App/Screens/Settings';
import Settings from '../../App/Screens/Settings/settings';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';

jest.mock('react-native-restart', () => require.requireActual('../../__mocks__/react-native-restart').default);

describe('Screen >>> Settings', () => {
    const initState = {
        Settings: {
            error: {
                error: "",
                error_description: ""
            },
            server: {
                url: "https://poc-1.processmaker.net",
                workspace: "workflowpoc1"
            }
        },
        Net: {
            progressShow: false
        },
        Oauth: {
            isLoggedIn: true
        }
    };
    const initStateEmpty = {
        Settings: {
            error: null,
            server: null
        },
        Net: {
            progressShow: false
        },
        Oauth: {
            isLoggedIn: true
        }
    };
    const propTypes = {
        updateUrl: () => {
        },
        updateWorkspace: () => {
        },
        syncDown: () => {
        }
    };
    const navigation = {
        dispatch: () => {},
        setParams: () => {}
    };
    const toast = {
        _toastSettings: {
            show: (message, duration) => {}
        }
    };
    const nextProps = {
        error: {
            error_description: "message error"
        },
        server: {
            url: "https://poc-1.processmaker.net",
            workspace: "workflowpoc1"
        }
    };
    const nextPropsElse = {
        error: null,
        server: {
            url: "https://poc-1.processmaker.net",
            workspace: "workflowpoc1"
        }
    };
    const mockStore = configureStore();
    let connect,
        connectEmpty,
        view;

    beforeEach(() => {
        connect = shallow(<ConnectSettings store={mockStore(initState)}/>);
        connectEmpty = shallow(<ConnectSettings store={mockStore(initStateEmpty)}/>);
        view = shallow(<Settings
            isLoggedIn={true}
            navigation={navigation}
            server={initState.Settings.server}
            updateUrl={propTypes.updateUrl}
            updateWorkspace={propTypes.updateWorkspace}
            syncDown={propTypes.syncDown} />);
    });

    it('Settings connect', () => {
        expect(toJson(connect)).toMatchSnapshot();
    });

    it('mapStateToProps', () => {
        expect(toJson(connectEmpty)).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(Settings.navigationOptions({navigation}).title)
            .toEqual("menu_drawer_settings_item_settings");
        expect(Settings.navigationOptions({navigation}).headerTintColor)
            .toEqual("#FFF");
        expect(Settings.navigationOptions({navigation}).headerStyle)
            .toEqual({backgroundColor: "#1F6CBC"});
        expect(Settings.navigationOptions({navigation}).headerLeft).toMatchSnapshot();
    });

    it('mapDispatchToProps', () => {
        expect(connect.props('children').updateUrl()).toMatchSnapshot();
        expect(connect.props('children').updateWorkspace()).toMatchSnapshot();
        expect(connect.props('children').syncDown()).toMatchSnapshot();
    });

    it('Render Settings view', () => {
        expect(toJson(view)).toMatchSnapshot();
    });

    it('OnPress sections', () => {
        let mainContainer = view.props('children').children.props.children.props.children.props.children,
            serverUrl = mainContainer[0].props.children[1].props,
            workspace = mainContainer[0].props.children[3].props,
            cleanCache = mainContainer[1].props.children[1].props,
            externalLibs = mainContainer[1].props.children[3].props.children[0].props,
            languages = mainContainer[2].props.children[1].props;

        expect(toJson(serverUrl.onPress())).toMatchSnapshot();
        expect(toJson(workspace.onPress())).toMatchSnapshot();
        expect(toJson(cleanCache.onPress())).toMatchSnapshot();
        expect(toJson(externalLibs.onPress())).toMatchSnapshot();
        expect(toJson(languages.onPress())).toMatchSnapshot();
        expect(view.instance()._syncDown()).toMatchSnapshot()
    });


    it('componentWillReceiveProps function', () => {
        expect(view.instance().componentWillReceiveProps(nextPropsElse)).toMatchSnapshot();
        view.instance().refs = toast;
        expect(view.instance().componentWillReceiveProps(nextProps)).toMatchSnapshot();
    });

    it('updateServer function', () => {
        view.instance().setState({tmpServer: ""});
        view.instance().refs = toast;
        expect(view.instance().updateServer()).toMatchSnapshot();
    });

    it('initialSettings function', async () => {
        expect(await view.instance().initialSettings()).toMatchSnapshot();
    });

    it('_onChangeServerUrl function', () => {
        expect(view.instance()._onChangeServerUrl("http://sample.com")).toMatchSnapshot();
        expect(view.instance()._onChangeServerUrl("")).toMatchSnapshot();
    });

    it('_onChangeWorkspace function', () => {
        expect(view.instance()._onChangeWorkspace("")).toMatchSnapshot();
        expect(view.instance()._onChangeWorkspace("sample")).toMatchSnapshot();
    });

    it('_onChangeExternalLibs function', () => {
        expect(view.instance()._onChangeExternalLibs(true)).toMatchSnapshot();
    });

    it('_onChangeLanguage function', () => {
        expect(view.instance()._onSelectLanguage("ar")).toMatchSnapshot();
        expect(view.instance()._onSelectLanguage()).toMatchSnapshot();
    });

    it('renderDialog ServerUrl function', () => {
        const dialogServerUrl = view.instance()._renderDialogServerUrl(),
            controls = dialogServerUrl.props.children.props.children[1].props,
            buttonCancel = controls.children[0],
            buttonOk = controls.children[1];
        expect(dialogServerUrl.props.onTouchOutside()).toMatchSnapshot();
        expect(buttonCancel.props.onPress()).toMatchSnapshot();
        view.instance().refs = toast;
        expect(buttonOk.props.onPress()).toMatchSnapshot();
    });

    it('renderDialog ServerUrl function', () => {
        const dialogServerUrl = view.instance()._renderDialogServerUrl(),
            controls = dialogServerUrl.props.children.props.children[1].props,
            buttonOk = controls.children[1];
        view.instance().setState({tmpServer: "http://example.com"});
        expect(buttonOk.props.onPress()).toMatchSnapshot();
    });

    it('renderDialog Workspace function', () => {
        const dialogWorkspace = view.instance()._renderDialogWorkspace(),
            controls = dialogWorkspace.props.children.props.children[1].props,
            buttonCancel = controls.children[0],
            buttonOk = controls.children[1];
        expect(dialogWorkspace.props.onTouchOutside()).toMatchSnapshot();
        expect(buttonCancel.props.onPress()).toMatchSnapshot();
        expect(buttonOk.props.onPress()).toMatchSnapshot();
    });

    it('renderDialog CleanCache function', () => {
        let dialogCleanCache = view.instance()._renderDialogCleanCache(),
            controls = dialogCleanCache.props.children.props.children[1].props,
            buttonCancel = controls.children[0],
            buttonOk = controls.children[1];
        expect(dialogCleanCache.props.onTouchOutside()).toMatchSnapshot();
        expect(buttonCancel.props.onPress()).toMatchSnapshot();
        expect(buttonOk.props.onPress()).toMatchSnapshot();
    });

    it('renderDialog Languages function', () => {
        let dialogLanguages = view.instance()._renderDialogLanguages(),
            languages = dialogLanguages.props.children.props.children[0],
            firstLanguage = languages[0],
            controls = dialogLanguages.props.children.props.children[1].props,
            buttonCancel = controls.children;
        expect(dialogLanguages.props.onTouchOutside()).toMatchSnapshot();
        expect(buttonCancel.props.onPress()).toMatchSnapshot();
        expect(firstLanguage.props.onPress()).toMatchSnapshot();
    });
});
