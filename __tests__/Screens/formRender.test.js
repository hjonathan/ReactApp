import React from 'react'
import {shallow, mount} from 'enzyme';
import FormRender from '../../App/Screens/FormRender'
import FormRenderView from '../../App/Screens/FormRender/formRender'
import configureStore from 'redux-mock-store'
import toJson from 'enzyme-to-json'
import {createStore} from 'redux'

jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);
describe('Screen >>> FormRender', () => {
    const initialState = {
            FormData: {
                server: {
                    error: null
                }
            },
            FormRender: {
                routed: {
                    isRouted: false,
                    users: []
                },
                nextStep: {
                    error: null
                },
                getNextStep: "",
                flowStatus: "",
                nextStepPath: "",
                formPath: "",
                formDataPath: "",
                stepData: "",
                signature: {
                    show: true
                },
                audio: {
                    menu: true,
                    panel: true
                },
                working: {
                    status: true
                },
                download: {
                    show: true,
                    progress: 0,
                    file: {}
                }
            },
            Cases: {
                error: {},
                assignment: {
                    info: [
                        {
                            test: ""
                        }
                    ],
                    error: null
                },
                routedCase: {
                    info: null,
                    error: null
                }
            }
        },
        navigation = {
            state: {
                params: {
                    state: {
                        User: {}
                    },
                    payload: {
                        webView: {
                            injectJavaScript: jest.fn()
                        }
                    }
                }
            },
            dispatch: () => {}
        },
        webView = {
            injectJavaScript: jest.fn()
        },
        assignment = {
            map: () => {}
        },
        mockStore = configureStore(),
        requestRoute = jest.fn(),
        finishLoadWebView = jest.fn(),
        addUserId = jest.fn(),
        changeRouted = jest.fn(),
        clearFormRender = jest.fn(),
        changeDataAvailable = jest.fn(),
        changeSignature = jest.fn(),
        sendSignature = jest.fn(),
        setLocation = jest.fn(),
        refs = {
            toastError: {
                show: (message, duration) => {
                }
            }
        },
        nextProps = {
            isRouted: true,
            assignment: {
                info: {
                    test: ""
                }
            },
            routeUsers: {}
        };

    let store,
        container,
        view;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<FormRender store={store}/>);
        store = mockStore(nextProps);
        view = shallow(<FormRenderView
            store={store}
            navigation={navigation}
            requestRoute={requestRoute}
            finishLoadWebView={finishLoadWebView}
            addUserId={addUserId}
            changeRouted={changeRouted}
            clearFormRender={clearFormRender}
            changeDataAvailable={changeDataAvailable}
            changeSignature={changeSignature}
            sendSignature={sendSignature}
            setLocation={setLocation}
            assignment={assignment}
        />);
        view.instance().refs = {
            viewMap: {
                getLastPosition: () => null
            }
        }
    });

    it('Render form correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('mapStateToProps', () => {
        expect(container.props('children').requestRoute()).toMatchSnapshot();
        expect(container.props('children').finishLoadWebView()).toMatchSnapshot();
        expect(container.props('children').addUserId()).toMatchSnapshot();
        expect(container.props('children').changeRouted()).toMatchSnapshot();
        expect(container.props('children').clearFormRender()).toMatchSnapshot();
        expect(container.props('children').changeDataAvailable()).toMatchSnapshot();
        expect(container.props('children').setLocation()).toMatchSnapshot();
        expect(container.props('children').changeSignature()).toMatchSnapshot();
        expect(container.props('children').sendSignature()).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(FormRenderView.navigationOptions({navigation}).title)
            .toEqual("");
        expect(FormRenderView.navigationOptions({navigation}).headerTintColor)
            .toEqual("#FFF");
        expect(FormRenderView.navigationOptions({navigation}).headerStyle)
            .toEqual({backgroundColor: "#1F6CBC"});
        expect(FormRenderView.navigationOptions({navigation}).headerLeft).toMatchSnapshot();
    });

    it('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1);
    });

    it('componentDidMount', () => {
        expect(view.instance().componentDidMount()).toMatchSnapshot();
    });

    it('componentWillReceiveProps', () => {
        let nextP;
        view.instance().refs = refs;
        expect(view.instance().componentWillReceiveProps(nextProps)).toMatchSnapshot();
        nextP = {isRouted: true, errorNextStep: {}, errorAssignment: {}, errorData: {}};
        view.instance().setState({webView: webView});
        expect(view.instance().componentWillReceiveProps(nextP)).toMatchSnapshot();
    });

    it('getWhichDataToUse', () => {
        view.instance().setState({webView: webView});
        expect(view.instance().getWhichDataToUse("0")).toMatchSnapshot();
    });

    it('spreadWebView', () => {
        expect(view.instance().spreadWebView(webView)).toMatchSnapshot();
    });

    it('setLocation', () => {
        const coordinates = {
            latitude: null,
            longitude: null
        };
        expect(view.instance().setLocation({})).toMatchSnapshot();
        expect(view.instance().setLocation(coordinates)).toMatchSnapshot();
    });

    it('validateGPS', () => {
        expect(view.instance().validateGPS({})).toMatchSnapshot();
    });

    it('openSettings', () => {
        expect(view.instance().openSettings({})).toMatchSnapshot();
    });

    it('closeDerivationModal', () => {
        view.instance().setState({webView: webView});
        expect(view.instance().closeDerivationModal()).toMatchSnapshot();
    });

    it('closeMapViewModal', () => {
        view.instance().closeMapViewModal();
        expect(view.instance().state.modalMap).toEqual(false);
    });

    it('closeSettingsModal', () => {
        view.instance().closeSettingsModal();
        expect(view.instance().state.modalSettings).toEqual(false);
    });

    it('renderList', () => {
        let list;
        view.instance().setState({isEmpty: true});
        expect(view.instance().renderList()).toMatchSnapshot();
        view.instance().setState({isEmpty: false});
        expect(view.instance().renderList()).toMatchSnapshot();
        list = view.instance().renderList();
        expect(list.props.renderItem({item: {taskAssignType: "MANUAL"}})).toMatchSnapshot();
        expect(list.props.renderItem({item: {taskAssignType: ""}})).toMatchSnapshot();
        expect(list.props.keyExtractor({}, 1)).toMatchSnapshot();
    });

    it('renderMapViewModal', () => {
        view.instance().setState({modalMap: true});
        let mapModal = view.instance().renderMapViewModal(),
            headerModal = mapModal.props.children.props.children[0].props.children,
            buttonDone = headerModal[0].props.children,
            buttonClose = headerModal[2].props.children;

        expect(buttonDone.props.onPress()).toMatchSnapshot();
        expect(buttonClose.props.onPress()).toMatchSnapshot();

        expect(mapModal).toMatchSnapshot();
        view.instance().setState({modalMap: false});
        expect(mapModal).toMatchSnapshot();
    });

    it('renderSettingsModal', () => {
        view.instance().setState({modalSettings: true});
        let settingsModal = view.instance().renderSettingsModal(),
            footer = settingsModal.props.children.props.children.props.children[2],
            buttonOk = footer.props.children[0].props.children,
            buttonCancel = footer.props.children[1].props.children;

        expect(buttonOk.props.onPress()).toMatchSnapshot();
        expect(buttonCancel.props.onPress()).toMatchSnapshot();

        expect(settingsModal).toMatchSnapshot();
        view.instance().setState({modalSettings: false});
        expect(settingsModal).toMatchSnapshot();
    });

    it('renderDerivationModal', () => {
        let derivationModal = view.instance().renderDerivationModal(),
            footer = derivationModal.props.children.props.children.props.children[2],
            closeButton = footer.props.children[0],
            routeButton = footer.props.children[1];
        view.instance().setState({
            webView: {
                injectJavaScript: () => {}
            }
        });
        view.instance().setState({modalDerivation: true});
        expect(derivationModal).toMatchSnapshot();
        view.instance().setState({modalDerivation: false});
        expect(view.instance().renderDerivationModal()).toMatchSnapshot();
        expect(closeButton.props.children.props.onPress()).toMatchSnapshot();
        expect(routeButton.props.children.props.onPress()).toMatchSnapshot();
    });

    it('renderModalDataAvailable', () => {
        let dataAvailableModal = view.instance().renderModalDataAvailable(),
            footer = dataAvailableModal.props.children.props.children.props.children[2],
            cancelButton = footer.props.children[0],
            dataButton = footer.props.children[1];
        view.instance().setState({
            webView: {
                injectJavaScript: () => {}
            }
        });
        view.instance().setState({dataAvailable: true});
        expect(view.instance().renderModalDataAvailable()).toMatchSnapshot();
        view.instance().setState({dataAvailable: false});
        expect(view.instance().renderModalDataAvailable()).toMatchSnapshot();
        expect(cancelButton.props.children.props.onPress()).toMatchSnapshot();
        expect(dataButton.props.children.props.onPress()).toMatchSnapshot();
    });

    it('renderModalDataAvailable', () => {
        view.setProps({dataAvailable: true});
        expect(view.instance().renderModalDataAvailable()).toMatchSnapshot();
    });

    it('renderModalSignature', () => {
        view.setProps({showSignature: true});
        expect(view.instance().renderModalSignature()).toMatchSnapshot();
    });

    it('workingDialog', () => {
        view.setProps({working: true});
        expect(view.instance().workingDialog()).toMatchSnapshot();
    });

    it('renderAudioMenuModal', () => {
        view.setProps({showAudioMenu: true});
        expect(view.instance().renderAudioMenuModal()).toMatchSnapshot();
    });

    it('renderAudioModal', () => {
        view.setProps({showAudioPanel: true});
        expect(view.instance().renderAudioModal()).toMatchSnapshot();
    });

    it('renderModalDownload', () => {
        view.setProps({showDownload: true, fileDownload: {name: "TestFile"}});
        expect(view.instance().renderModalDownload()).toMatchSnapshot();
    });
});
