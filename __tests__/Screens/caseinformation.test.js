import React from 'react'
import { shallow } from 'enzyme';
import ConnectedCaseInformation from '../../App/Screens/CaseInformation';
import CaseInformationView from '../../App/Screens/CaseInformation/caseinformation';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);

import { createStore } from 'redux'
import {CASE} from "../../App/Libs/Const";

describe('Screen >>> Case Information', () => {
    const initialState = {
            Cases: {
                info: {
                    case: {
                        caseId: "123456678",
                        caseTitle: "Case title for test"
                    },
                    task: {
                        taskId: "1234567890",
                        taskTitle: "Task title for test"
                    }
                }
            },
            promptTitle: '',
            case: 'null',
            task: 'null',
            toastMessage: 'toast test',
            loader: false
    };
    let store, container, viewCase;
    const parseValueCreator = () => { },
    mockStore = configureStore(),
    caseClaimRequest = () => { app_uid: '' },
    caseInfoRequest = () => { },
    navigation = {
        state: {
            params: {
                type: CASE.PARTICIPATED,
                caseId: ''
            }
        },
        dispatch: jest.fn()
    };

    beforeEach(() => {
        store = mockStore(initialState)
        container = shallow(<ConnectedCaseInformation store={store} />)
        viewCase = shallow(<CaseInformationView parseValueCreator={parseValueCreator} navigation={navigation} caseClaimRequest={caseClaimRequest} caseInfoRequest={caseInfoRequest} store={store}/>)
    })

    /**
    * This test is related to the render of the WalkThrough view.
    */
    it('render Case Information correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });

    it('Check Prop matches with initialState', () => {
        expect(container.prop('info').case).toEqual({
            caseId: "123456678",
            caseTitle: "Case title for test"
        });
    });

    it('Check static navigationOptions', () => {
        expect(CaseInformationView.navigationOptions(""))
            .toEqual({
                title: "general_information",
                headerTintColor: "#FFF",
                headerStyle: {backgroundColor: "#1F6CBC"}
            });
    });

    it('render claim button incorrect param', () => {
        expect(viewCase.instance().renderClaimCaseButton('')).toBeNull();
    });

    it('render test valid param', () => {
        expect(viewCase.instance().renderClaimCaseButton('Unassigned')).not.toBeNull();
    });

    it('Props coverage willReceiveProps', () => {
        viewCase.instance().componentWillReceiveProps({info: {
            case: {
                caseId: "123456678",
                caseTitle: "Case title for test"
            },
            task: {
                taskId: "1234567890",
                taskTitle: "Task title for test"
            }
        }});
        expect(viewCase.instance().state.case.caseId).toEqual("123456678");
    });

    it('Props coverage componentDidUpdate', () => {
        viewCase.instance().componentDidUpdate();
        expect(viewCase.instance().state.toastMessage).toBeNull();
    });

    it('Props coverage claimCaseFromCase', () =>{
        viewCase.instance().state.case = {
            caseId: "123456678",
            caseTitle: "Case title for test",
            delIndex: 1
        };
        viewCase.instance().state.task = { taskId: "123456678"};
        viewCase.instance().claimCaseFromCase();
        expect(viewCase.instance().state.loader).toEqual(true);
    });

    it('validator To do Text', () => {
        expect(container.prop('parseValueCreator')('TO_DO')).toEqual('To do');
    });

    it('validator In Progress Text', () => {
        expect(container.prop('parseValueCreator')('in_progress')).toEqual('In progress');
    });

    it('validator Reasigned Text', () => {
        expect(container.prop('parseValueCreator')('reasigned')).toEqual('Reasigned');
    });

    it('validator Routed Text', () => {
        expect(container.prop('parseValueCreator')('null')).toEqual('Routed');
    });

    it('validator null Text', () => {
        expect(container.prop('parseValueCreator')()).toBeNull();
    });
});
