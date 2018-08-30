import 'react-native';
import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import ItemList from '../../App/Components/ItemList';
import {DraftSchema, RealmObject} from "../../App/Model/Schemas";
import {CASE} from "../../App/Libs/Const";

describe('Component >>> ItemList', () => {
    const parent = {
        list: CASE.DRAFT,
        navigation: {
            dispatch: () => {
            },
            state: {
                routeName: CASE.DRAFT
            }
        }
    };
    const parentEmpty = {
        list: ""
    };
    const parentUnassigned = {
        list: CASE.UNASSIGNED,
        navigation: {
            dispatch: () => {
            },
            state: {
                routeName:CASE.UNASSIGNED
            }
        }
    };
    const data = {
        caseId: "",
        caseNumber: 0,
        caseTitle: '',
        dueDate: '1995-12-25',
        process: {
            name: ''
        },
        task: {
            name: '',
        },
        prevUser: {
            fullName: '',
            firstName: '',
            lastName: '',
        },
        userPhoto: ""
    };
    const dataDraft = {
        caseId: "IL01",
        delIndex: "1",
        user: {
            userId: "1"
        },
        currentUser: {
            userId: "100",
            userName: "Test",
            firstName: "Data",
            lastName: "Base",
        },
        task: {
            taskId: "t001",
            name: "task test",
            autoRoot: "TRUE",
            offlineEnabled: "FALSE",
        },
        process: {
            processId: "p001",
            name: "Process test"
        },
        caseNumber: "1",
        caseTitle: "Case test",
        date: '2018-05-16 09:27:02',
        delegateDate: '2018-05-16 09:27:02',
        dueDate: '2018-05-16 09:27:02',
        status: CASE.STATUS.SENDING
    };
    const dataIncomplete = {
        caseId: "",
        caseNumber: 0,
        caseTitle: '',
        dueDate: '1995-12-25',
        process: {
            name: ''
        },
        task: {
            name: '',
        },
        userPhoto: ""
    };
    const componentWillReceiveProps = () => {};
    let itemList,
        itemListEmpty,
        itemListDraft,
        itemListIncomplete,
        itemListUnassigned,
        itemListCnn;

    beforeEach(() => {
        itemListEmpty = shallow(<ItemList parent={parentEmpty}/>);
        itemList = shallow(<ItemList componentWillReceiveProps={componentWillReceiveProps} parent={parent} data={data} isConnected={true}/>);
        itemListCnn = shallow(<ItemList componentWillReceiveProps={componentWillReceiveProps} parent={parent} data={dataDraft} isConnected={false}/>);
        itemListDraft = shallow(<ItemList parent={parent} data={dataDraft}/>);
        itemListIncomplete = shallow(<ItemList parent={parent} data={dataIncomplete}/>);
        itemListUnassigned = shallow(<ItemList parent={parentUnassigned} data={data}/>);
    });

    it('Render ItemList', () => {
        expect(toJson(itemList)).toMatchSnapshot();
        expect(toJson(itemListEmpty)).toMatchSnapshot();
        expect(toJson(itemListDraft)).toMatchSnapshot();
        expect(toJson(itemListIncomplete)).toMatchSnapshot();
    });

    it('ItemList test onPress', () => {
        expect(toJson(itemList.props('children').onPress())).toMatchSnapshot();
    });

    it('ItemList test _onLoadImage', () => {
        expect(toJson(itemList.instance()._onLoadImage())).toMatchSnapshot();
    });

    it('ItemList test _getCapitalLetter', () => {
        expect(toJson(itemList.instance()._getCapitalLetter())).toMatchSnapshot();
        expect(toJson(itemListDraft.instance()._getCapitalLetter())).toMatchSnapshot();
        expect(toJson(itemListIncomplete.instance()._getCapitalLetter())).toMatchSnapshot();
    });

    it('ItemList test onPress controls', () => {
        let cardView = itemList.props('children').children,
            cardContent = cardView.props.children,
            secondSection = cardContent.props.children[1],
            controlGroup = secondSection.props.children[1],
            iconButtons = controlGroup.props.children[1],
            btnHistory = iconButtons.props.children[0].props,
            btnNotes = iconButtons.props.children[1].props;
        expect(toJson(btnHistory.onPress())).toMatchSnapshot();
        expect(toJson(btnNotes.onPress())).toMatchSnapshot();
    });

    it('ItemList componentWillReceiveProps', () => {
        expect(toJson(itemList.instance().componentWillReceiveProps({
            parent: {
                disableItemList: true
            }
        }))).toMatchSnapshot();
    });

    it('ItemList getStatus', () => {
        const paramsOverdue = {
            dueDateFormated: {getTime: () => 10},
            sentDateFormated: {getTime: () => 9},
            now: {getTime: () => 11}
        };
        const paramsOnTime = {
            dueDateFormated: {getTime: () => 13},
            sentDateFormated: {getTime: () => 12},
            now: {getTime: () => 11}
        };
        const paramsAtRisk = {
            dueDateFormated: {getTime: () => 11},
            sentDateFormated: {getTime: () => 11},
            now: {getTime: () => 11}
        };
        expect(toJson(itemList.instance().getStatus(paramsOverdue))).toMatchSnapshot();
        expect(toJson(itemList.instance().getStatus(paramsOnTime))).toMatchSnapshot();
        expect(toJson(itemList.instance().getStatus(paramsAtRisk))).toMatchSnapshot();
    });

    it('ItemList goToCaseInformation', () => {
        expect(toJson(itemList.instance().goToCaseInformation())).toMatchSnapshot();
        expect(toJson(itemListCnn.instance().goToCaseInformation())).toMatchSnapshot();
    });

    it('ItemList goToFormRender', () => {
        RealmObject.write(() => {
            RealmObject.create(DraftSchema.schema.name, dataDraft, true);
        });
        expect(toJson(itemListCnn.instance().goToFormRender(CASE.DRAFT))).toMatchSnapshot();
    });

    it('ItemList goToView', () => {
        const item = shallow(<ItemList parent={{}}/>);
        expect(toJson(itemListEmpty.instance().goToView())).toMatchSnapshot();
        RealmObject.write(() => {
            RealmObject.create(DraftSchema.schema.name, dataDraft, true);
        });
        expect(toJson(itemListDraft.instance().goToView())).toMatchSnapshot();
        expect(toJson(itemListUnassigned.instance().goToView())).toMatchSnapshot();
    });

    it('Validator On Time', () => {
        const valuesTest = {
            dueDateFormated: new Date("2018-01-17T13:30:13+00:00"),
            sentDateFormated: new Date("2018-01-17T11:54:13+00:00"),
            now: new Date("2018-01-16T13:30:13+00:00")

        };
        expect(itemListEmpty.instance().getStatus(valuesTest)).toEqual('ontime');
    });
    it('Validator dates Overdue', () => {
        const valuesTest = {
            dueDateFormated: new Date("2018-01-15T13:30:13+00:00"),
            sentDateFormated: new Date("2018-01-17T11:54:13+00:00"),
            now: new Date("2018-01-16T13:30:13+00:00")
        };
        expect(itemListEmpty.instance().getStatus(valuesTest)).toEqual('overdue');
    });

    it('Validator At Risk', () => {
        const valuesTest = {
            dueDateFormated: new Date("2018-01-17T16:30:13+00:00"),
            sentDateFormated: new Date("2018-01-16T11:54:13+00:00"),
            now: new Date("2018-01-16T13:30:13+00:00")
        };
        expect(itemListEmpty.instance().getStatus(valuesTest)).toEqual('atrisk');
    });

    it('Property maps - On time', () => {
        expect(itemListEmpty.instance().statusSettingMap['ontime']).toEqual({
            "color": "#1FBC99",
            "textStatus": "lists_activity_due_date_on_time",
        });
    });

    it('Property maps - Overdue', () => {
        expect(itemListEmpty.instance().statusSettingMap['overdue']).toEqual({
            "color": "#E14333",
            "textStatus": "lists_activity_due_date_overdue"
        });
    });

    it('Property maps - At risk', () => {
        expect(itemListEmpty.instance().statusSettingMap['atrisk']).toEqual({
            "color": "#F1C500",
            "textStatus": "lists_activity_due_date_at_risk"
        });
    });

    it('ItemList renderCaseRunOptions', () => {
        expect(toJson(itemList.instance().renderCaseRunOptions(CASE.STATUS.OFFLINE))).toMatchSnapshot();
        expect(toJson(itemList.instance().renderCaseRunOptions(CASE.STATUS.WORKING))).toMatchSnapshot();
        expect(toJson(itemList.instance().renderCaseRunOptions(CASE.STATUS.SENDING))).toMatchSnapshot();
    });
});
