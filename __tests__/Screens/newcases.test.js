import React from 'react'
import {shallow} from 'enzyme';
import ConnectedNewCases from '../../App/Screens/NewCases';
import NewCasesView from '../../App/Screens/NewCases/newcases';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';

jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);

import {createStore} from 'redux'

describe('Screen >>> New Cases', () => {
    const initialState = {
        Cases: {
            newcases: {
                response: [
                    {
                        autoRoot: "FALSE",
                        forms: [{
                            description: "",
                            formId: "",
                            formUpdateDate: "2018-01-18T00:23:52+00:00",
                            index: 1,
                            stepCondition: "",
                            stepId: "",
                            stepMode: "",
                            stepPosition: 1,
                            stepUidObj: "",
                            title: "",
                            triggers: {
                                before: false,
                                after: false
                            }
                        }
                        ],
                        offlineEnabled: "",
                        processId: "12345",
                        taskId: "123456",
                        text: "test 1",
                        categoryName: "category 1"
                    },
                    {
                        autoRoot: "FALSE",
                        forms: [{
                            description: "",
                            formId: "",
                            formUpdateDate: "2018-01-18T00:23:52+00:00",
                            index: 1,
                            stepCondition: "",
                            stepId: "",
                            stepMode: "",
                            stepPosition: 1,
                            stepUidObj: "",
                            title: "",
                            triggers: {
                                before: false,
                                after: false
                            }
                        }
                        ],
                        offlineEnabled: "TRUE",
                        processId: "",
                        taskId: "",
                        text: "",
                        categoryName: "category 2"
                    }
                ]
            }
        },
        Screens: {
            All: {
                disabledItemList: false
            }
        },
        Net: {
            isConnected: true
        },
        data: [],
        isEmpty: false,
        isFetching: false,
        middleHeight: 0,
        results: [],
        originalData: [],
        inputSearch: '',
        searchHeight: 0
    };
    let store, container, viewCase;
    const requestNewCases = () => {},
        caseOffline = () => {},
        reset = () => {},
        mockStore = configureStore(),
        caseClaimRequest = () => {
            app_uid: ''
        },
        caseInfoRequest = () => {
        },
        setParams = () => {
        },
        navigation = {
            setParams: function setParams({}) {
            },
            state: {
                params: {
                    needsDisplay: true,
                    handlerSearch: ''
                }
            }
        };

    beforeEach(() => {
        store = mockStore(initialState)
        container = shallow(<ConnectedNewCases store={store}/>)
        viewCase = shallow(<NewCasesView
            store={store}
            navigation={navigation}
            setParams={navigation.setParams}
            requestNewCases={requestNewCases}
            reset={reset}
        />)
    })

    it('render Case Information correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });

    it('Check Prop matches with initialState', () => {
        expect(container.prop('newcases').response[0]).toEqual({
            autoRoot: "FALSE",
            forms: [
                {
                    description: "",
                    formId: "",
                    formUpdateDate: "2018-01-18T00:23:52+00:00",
                    index: 1,
                    stepCondition: "",
                    stepId: "",
                    stepMode: "",
                    stepPosition: 1,
                    stepUidObj: "",
                    title: "",
                    triggers: {before: false, after: false}
                }
            ],
            offlineEnabled: "",
            processId: "12345",
            taskId: "123456",
            text: "test 1",
            categoryName: "category 1"
        });
    });

    it('mapStateToProps', () => {
        expect(container.props('children').requestNewCases()).toMatchSnapshot();
        expect(container.props('children').caseOffline()).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(NewCasesView.navigationOptions({navigation}).title)
            .toEqual("Select_a_task_to_start");
        expect(NewCasesView.navigationOptions({navigation}).headerTintColor)
            .toEqual("#FFF");
        expect(NewCasesView.navigationOptions({navigation}).headerStyle)
            .toEqual({backgroundColor: "#1F6CBC"});
        expect(NewCasesView.navigationOptions({navigation}).headerRight).toMatchSnapshot();
    });

    it('Props coverage willReceiveProps', () => {
        viewCase.instance().componentWillReceiveProps(initialState.Cases);
        expect(viewCase.instance().state.data['category 1'][0].text).toEqual("test 1");
    });

    it('On refresh method for view', () => {
        viewCase.instance().onRefresh();
        expect(viewCase.instance().state.isFetching).toEqual(true);
    });

    it('Search handler results', () => {
        expect(viewCase.instance()._handleResults(initialState.Cases.newcases)).not.toBeNull();
    });

    it('Text Input catcher for Search option', () => {
        expect(viewCase.instance()._handleChangeText('test 1')).not.toBeNull();
    });

    it('Should call _searchBarVisual method', () => {
        viewCase.instance().searchBar = {
            show: (text) => {},
            hide: (text) => {}
        };
        expect(viewCase.instance()._searchBarVisual('test 1')).not.toBeNull();
        expect(viewCase.instance()._searchBarVisual(null)).not.toBeNull();
    });

    it('Props coverage Get cases list', () => {
        expect(viewCase.instance()._getCasesList()).not.toBeNull();
    });

    it('Props coverage for populate list', () => {
        viewCase.instance()._populateList(initialState.Cases.newcases.response);
        expect(viewCase.instance().state.data['category 1'][0].text).toEqual('test 1');
    });

    it('Should call processIfOffline method', () => {
        expect(viewCase.instance().processIfOffline(initialState.Cases.newcases.response[0])).toEqual(false);
        viewCase.setProps({caseOffline: jest.fn()});
        expect(viewCase.instance().processIfOffline(initialState.Cases.newcases.response[1])).toEqual(true);
    });

    it('On change layout method', () => {
        viewCase.instance().changeLayout();
        expect(viewCase.instance().state.middleHeight).toEqual(617);
    });

    it('validator Reasigned Text', () => {
        expect(viewCase.instance().emptyList()).toMatchSnapshot();
    });

    it('validator Reasigned Text', () => {
        expect(viewCase.instance().renderFlatListItem()).toMatchSnapshot();
    });
});
