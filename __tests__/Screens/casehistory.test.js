import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import ConnectHistory from '../../App/Screens/History';
import History from '../../App/Screens/History/history';
import ItemHistory from '../../App/Screens/History/ItemHistory';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';

describe('Screen >>> History', () => {
    const initialState = {
        history: {
            data: {
                flow: [
                    {
                        taskName: 'Task 1',
                        flowStatus: 'DONE',
                        userFullName: 'Juan Perez',
                        dueDate: new Date('2016-07-01T16:25:31'),
                        userPhoto: "Picture1"
                    },
                    {
                        taskName: 'Task 2',
                        flowStatus: 'PAUSED',
                        userFullName: 'Juan Perez',
                        dueDate: new Date('2016-07-01T16:25:31'),
                        userPhoto: "Picture1"
                    },
                    {
                        taskName: 'Task 2',
                        flowStatus: 'IN_PROGRESS',
                        userFullName: 'Juan Perez',
                        dueDate: new Date('2016-07-01T16:25:31'),
                        userPhoto: "Picture1"
                    },
                    {
                        taskName: 'Task 2',
                        flowStatus: 'CANCELLED',
                        userFullName: 'Juan Perez',
                        dueDate: new Date('2016-07-01T16:25:31'),
                        userPhoto: "Picture1"
                    },
                    {
                        taskName: 'Task 2',
                        flowStatus: 'ROUTED',
                        userFullName: 'Juan Perez',
                        dueDate: new Date('2016-07-01T16:25:31'),
                        userPhoto: "Picture1"
                    }
                ]
            }
        }
    };
    const navigation = {
        state: {
            params: {
                appUid: "123456789"
            }
        }
    };
    const requestHistory = () => {};
    const mockStore = configureStore();
    let store,
        container,
        view,
        itemDone,
        itemPaused,
        itemInProgress,
        itemCancelled,
        itemRouted,
        emptyItem;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<ConnectHistory store={store}/>);
        view = shallow(<History navigation={navigation} requestHistory={requestHistory}/>);
        itemDone = shallow(<ItemHistory data={initialState.history.data.flow[0]}/>);
        itemPaused = shallow(<ItemHistory data={initialState.history.data.flow[1]}/>);
        itemInProgress = shallow(<ItemHistory data={initialState.history.data.flow[2]}/>);
        itemCancelled = shallow(<ItemHistory data={initialState.history.data.flow[3]}/>);
        itemRouted = shallow(<ItemHistory data={initialState.history.data.flow[4]}/>);
        emptyItem = shallow(<ItemHistory />)
    });

    /**
     * Render test
     */
    it('Render history correctly', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Render history view', () => {
        expect(toJson(view)).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(History.navigationOptions(""))
            .toEqual({
                title: "History",
                headerTintColor: "#FFF",
                headerStyle: {backgroundColor: "#1F6CBC"}
            });
    });

    it('Render item history', () => {
        const item = {};
        expect(typeof view.props('children').children.props.renderItem).toEqual('function');
        expect(toJson(view.props('children').children.props.renderItem(item))).toMatchSnapshot();
    });

    it('Render the connected(SMART) component', () => {
        expect(container.length).toEqual(1);
    });

    it('Render history view', () => {
        view.instance().componentWillReceiveProps(initialState);
        expect(view.instance().state.data.length).toEqual(5);
    });

    it('Render item view', () => {
        expect(toJson(itemDone)).toMatchSnapshot();
        expect(toJson(itemPaused)).toMatchSnapshot();
        expect(toJson(itemInProgress)).toMatchSnapshot();
        expect(toJson(itemCancelled)).toMatchSnapshot();
        expect(toJson(itemRouted)).toMatchSnapshot();
        expect(toJson(emptyItem)).toMatchSnapshot();
    });

    it('Render item view', () => {
        expect(itemDone.instance().state.taskName).toEqual('Task 1');
        expect(itemDone.instance().state.userFullName).toEqual('Juan Perez');
        expect(itemDone.instance().state.dueDate).toEqual(new Date('2016-07-01T16:25:31'));
    });

    it('Render item view', () => {
        expect(emptyItem.instance().state.taskName).toEqual('');
        expect(emptyItem.instance().state.userFullName).toEqual('');
        expect(emptyItem.instance().state.dueDate).toEqual('');
    });
});
