import 'react-native';
import React from 'react';
import WebFormComponent from '../../App/Components/WebForm';
import {WebForm} from '../../App/Components/WebForm';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import Data from "../../App/Model/Data";
import {CASE} from "../../App/Libs/Const";

describe('Test of Web form component', () => {
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
                fileVersions: {
                    fieldID: "image1234",
                    appDocUid: "Doc000122",
                    response: "[]",
                    success: true
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
                },
                routeName: CASE.INBOX
            }
        },
        webView = {
            injectJavaScript: jest.fn()
        },
        payload = {app_uid: "WF133"},
        spreadWebView = jest.fn(),
        onMessage = jest.fn(),
        finishLoadWebView = jest.fn(),
        clearWebForm = jest.fn();

    const mockStore = configureStore(),
        nextProps = {
            errorNextStep: {}
        },
        nextPropsView = {
            flowStatus: 'continueStep'
        };
    let store, container, view;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(
            <WebFormComponent
                store={store}
                spreadWebView={spreadWebView}
                onMessage={onMessage}
                finishLoadWebView={finishLoadWebView}
                clearWebForm={clearWebForm}
            />
        );
        view = shallow(
            <WebForm
                payload={payload}
                store={store}
                spreadWebView={spreadWebView}
                onMessage={onMessage}
                finishLoadWebView={finishLoadWebView}
                clearWebForm={clearWebForm}
            />
        );
    });

    it('render Item correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });

    it('mapStateToProps', () => {
        const data = {
            type: "continueStep"
        };
        expect(container.props('children').spreadWebView()).toMatchSnapshot();
        expect(container.props('children').onMessage(data)).toMatchSnapshot();
        expect(container.props('children').finishLoadWebView()).toMatchSnapshot();
        expect(container.props('children').clearWebForm()).toMatchSnapshot();
    });

    it("componentWillReceiveProps", () => {
        view.instance().webView = webView;
        expect(view.instance().componentWillReceiveProps(nextProps)).toMatchSnapshot();
    });

    it("componentDidUpdate", () => {
        view.instance().webView = webView;
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
        view.setProps({flowStatus: "continueStep"});
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
        view.setProps({flowStatus: "loadForm"});
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
        view.setProps({flowStatus: "hideFieldLoading"});
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
        view.setProps({flowStatus: "setFormData"});
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
        view.setProps({flowStatus: "setFiles"});
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
        view.setProps({flowStatus: "setFileVersions", fileVersions: initialState.FormRender.fileVersions});
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
        view.setProps({flowStatus: "setLocation"});
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
        view.setProps({flowStatus: "getFormData"});
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
        view.setProps({flowStatus: "setCacheLibraryMap"});
        expect(view.instance().componentDidUpdate(nextPropsView, {})).toMatchSnapshot();
    });

    it('onMessage function', () => {
        const data = {
            nativeEvent: {
                data: '{"type":"","data":""}'
            }
        };
        expect(view.instance().onMessage(data)).toMatchSnapshot();
    });

    it('onLoad function', () => {
        view.setProps({
            state: {
                Settings: {
                    error: {
                        error: "",
                        error_description: ""
                    },
                    server: {
                        url: "https://poc-1.processmaer.net",
                        workspace: "workflowpoc1"
                    }
                },
                Oauth: {credentials: {token: "token"}},
                Net: {isConnected: true}
            }
        });
        view.instance().webView = webView;
        expect(view.instance().onLoad({nativeEvent: {}})).toMatchSnapshot();
    });

    it('onLoad function', () => {
        view.setProps({
            state: {
                Settings: {
                    error: {
                        error: "",
                        error_description: ""
                    },
                    server: {
                        url: "https://poc-1.processmaer.net",
                        workspace: "workflowpoc1"
                    }
                },
                Oauth: {credentials: {token: "token"}},
                Net: {isConnected: true}
            }
        });
        view.instance().webView = webView;
        Data.saveCaseData({params: {
                app_uid: "WF133",
                del_index: "3",
                dyn_uid: "4783964",
                status: CASE.STATUS.WORKING
            },
            response: {var001: 'value001'}
        }, initialState);
        expect(view.instance().onLoad({nativeEvent: {}})).toMatchSnapshot();
    });

    it('render ref function', () => {
        let webView = view.instance().render();
        expect(webView.ref()).toMatchSnapshot();
    });
});
