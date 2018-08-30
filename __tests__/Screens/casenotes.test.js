import React from 'react'
import {shallow} from 'enzyme';
import ConnectCaseNotes from '../../App/Screens/CaseNotes';
import CaseNotes from '../../App/Screens/CaseNotes/casenotes';
import ItemNote from '../../App/Screens/CaseNotes/ItemNote';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';

describe('Screen >>> Case Notes', () => {
    const initialState = {
        CaseNotes: {
            app_uid: null,
            notes: [],
            error: null,
            users: []
        }
    };
    const notes = [
        {
            caseId: "1111111111",
            notes: {
                content: "Lorem ipsum dolor",
                date: "2018-02-09T16:16:36+00:00"
            },
            user: {
                email: "john.guest@gmail.com",
                firstName: "John",
                lastName: "Guest",
                name: "John",
                userId: "123456789"
            }
        }
    ], users = [
        {
            userId: "123456789",
            userPhoto: "picture1"
        }
    ];
    const data = {
        notes: {
            content: '',
            date: ''
        },
        user: {
            firstName: '',
            lastName: ''
        }
    };
    const navigation = {
        state: {
            params: {
                handlerModal: () => {}
            }
        },
        setParams: () => {}
    };
    const toast = {
        _toastCaseNotes: {
            show: (message, duration) => {}
        },
        _toastCaseNotesPost: {
            show: (message, duration) => {}
        }
    };
    const requestCaseNotes = () => {};
    const postCaseNote = () => {};
    const userInfoRequest = jest.fn();
    const nextProps = {
        caseNotes: {
            status: 'ok',
            notes: notes
        },
        users
    };
    const nextPropsError = {
        caseNotes: {
            error: {
                error_description: "error permission"
            },
            notes: []
        }
    };
    const mockStore = configureStore();
    let store,
        container,
        view,
        itemNoteEmpty,
        itemNote;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<ConnectCaseNotes store={store}/>);
        view = shallow(<CaseNotes
            navigation={navigation}
            requestCaseNotes={requestCaseNotes}
            postCaseNote={postCaseNote}
            userInfoRequest={userInfoRequest}
        />);
        itemNoteEmpty = shallow(<ItemNote/>);
        itemNote = shallow(<ItemNote data={data}/>);
    });

    it('Render Case Notes index', () => {
        expect(toJson(container)).toMatchSnapshot();
    });

    it('Check static navigationOptions', () => {
        expect(CaseNotes.navigationOptions("").title)
            .toEqual("title_activity_case_notes");
        expect(CaseNotes.navigationOptions("").headerTintColor)
            .toEqual("#FFF");
        expect(CaseNotes.navigationOptions("").headerStyle)
            .toEqual({backgroundColor: "#1F6CBC"});
        expect(CaseNotes.navigationOptions("").headerRight).toMatchSnapshot();
    });

    it('mapStateToProps', () => {
        expect(container.props('children').requestCaseNotes()).toMatchSnapshot();
        expect(container.props('children').postCaseNote()).toMatchSnapshot();
        expect(container.props('children').userInfoRequest()).toMatchSnapshot();
    });

    it('Render Case Notes view', () => {
        expect(toJson(view)).toMatchSnapshot();
    });

    it('Render Item Notes', () => {
        expect(toJson(itemNote)).toMatchSnapshot();
        expect(toJson(itemNoteEmpty)).toMatchSnapshot();
    });

    it('Render list', () => {
        view.instance().setState({notes: notes});
        let list = view.instance().renderList();
        expect(view.instance().state.notes.length).toEqual(1);
        expect(list).toMatchSnapshot();
        expect(list.props.renderItem({})).toMatchSnapshot();
        expect(list.props.keyExtractor({}, 1)).toMatchSnapshot();
    });

    it('Render list empty', () => {
        view.instance().setState({isEmpty: true});
        let list = view.instance().renderList();
        expect(view.instance().state.isEmpty).toEqual(true);
        expect(list).toMatchSnapshot();
    });

    it('componentWillReceiveProps', () => {
        view.instance().refs = toast;
        view.instance().setState({errorPermission: true});
        expect(view.instance().componentWillReceiveProps(nextProps)).toMatchSnapshot();
        expect(view.instance().componentWillReceiveProps(nextPropsError)).toMatchSnapshot();
    });

    it('_populateNotes', () => {
        let notes = [
            {
                caseId: "1111111111",
                notes: {
                    content: "Lorem ipsum dolor",
                    date: "2018-02-09T16:16:36+00:00"
                },
                user: {
                    email: "john.guest@gmail.com",
                    firstName: "John",
                    lastName: "Guest",
                    name: "John",
                    userId: "123456789"
                }
            },
            {
                caseId: "2222222222",
                notes: {
                    content: "Lorem ipsum dolor",
                    date: "2018-02-09T16:16:36+00:00"
                },
                user: {
                    email: "john.guest@gmail.com",
                    firstName: "John",
                    lastName: "Guest",
                    name: "John",
                    userId: "123456789"
                }
            }
        ];
        expect(view.instance()._populateNotes(notes)).toMatchSnapshot();
        expect(view.instance().state.notes.length).toEqual(notes.length);
        expect(view.instance().state.isEmpty).toEqual(false);
    });

    it('changeLayout', () => {
        expect(view.instance().changeLayout()).toMatchSnapshot();
    });

    it('_onChangeNote', () => {
        const message = "message test";
        expect(view.instance()._onChangeNote(message)).toMatchSnapshot();
        expect(view.instance().state.valid).toEqual(true);
        expect(view.instance().state.noteContent).toEqual(message);
    });

    it('onPress checkbox', () => {
        let modal = view.props('children').children[1].props.children[0],
            sectionBody = modal.props.children[1],
            checkbox = sectionBody.props.children[1];
        expect(checkbox.props.onPress()).toMatchSnapshot();
    });

    it('onPress cancel', () => {
        let modal = view.props('children').children[1].props.children[0],
            sectionFooter = modal.props.children[2],
            btnCancel = sectionFooter.props.children[0].props.children;
        expect(btnCancel.props.onPress()).toMatchSnapshot();
    });

    it('onPress send', () => {
        let modal = view.props('children').children[1].props.children[0],
            sectionFooter = modal.props.children[2],
            btnSend = sectionFooter.props.children[1].props.children;
        view.instance().refs = toast;
        expect(btnSend.props.onPress()).toMatchSnapshot();
        view.instance().setState({valid: true});
        expect(btnSend.props.onPress()).toMatchSnapshot();
    });

    it("Should call mergeData method", () => {
        let notesWithPicture = Object.assign(notes, users.userPhoto);
        view.instance().mergeData({notes, users});
        expect(view.instance().state.notes[0])
            .toEqual(notesWithPicture[0]);
    });
});
