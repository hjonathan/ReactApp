import "react-native";
import React from "react";
import FlatButton from "../../App/Components/FlatButton";
import Swiper from "../../App/Components/Swiper";
import Card from "../../App/Components/Card";
import ItemList from "../../App/Components/ItemList";
import NavigatorTitle from "../../App/Components/NavigatorTitle";
import NavigatorButton from "../../App/Components/NavigatorButton";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";

import renderer from "react-test-renderer";
import {CASE} from "../../App/Libs/Const";

describe("Component >>> ItemList", () => {
    const parent = {
        navigation: {
            dispatch: () => {},
            state: {
                routeName: CASE.PARTICIPATED
            }
        }
    };
    const data = {
        caseId: "",
        caseNumber: 0,
        caseTitle: "",
        dueDate: "1995-12-25",
        process: {
            name: ""
        },
        task: {
            name: ""
        },
        prevUser: {
            fullName: "",
            firstName: "",
            lastName: ""
        },
        userPhoto: ""
    };
    const dataDraft = {
        caseId: "",
        caseNumber: 0,
        caseTitle: "",
        dueDate: "1995-12-25",
        process: {
            name: ""
        },
        task: {
            name: ""
        },
        currentUser: {
            fullName: "",
            firstName: "",
            lastName: ""
        },
        userPhoto: ""
    };
    const dataIncomplete = {
        caseId: "",
        caseNumber: 0,
        caseTitle: "",
        dueDate: "1995-12-25",
        process: {
            name: ""
        },
        task: {
            name: ""
        },
        userPhoto: ""
    };
    let itemList,
        itemListDraft,
        itemListIncomplete;

    beforeEach(() => {
        itemList = shallow(<ItemList parent={parent} data={data} />);
        itemListDraft = shallow(<ItemList parent={parent} data={dataDraft} />);
        itemListIncomplete = shallow(<ItemList parent={parent} data={dataIncomplete} />);
    });

    it("Render ItemList", () => {
        expect(toJson(itemList)).toMatchSnapshot();
        expect(toJson(itemListDraft)).toMatchSnapshot();
    });

    it("ItemList test onPress", () => {
        expect(toJson(itemList.props("children").onPress())).toMatchSnapshot();
    });

    it("ItemList test _onLoadImage", () => {
        expect(toJson(itemList.instance()._onLoadImage())).toMatchSnapshot();
    });

    it("ItemList test _getCapitalLetter", () => {
        expect(toJson(itemList.instance()._getCapitalLetter())).toMatchSnapshot();
        expect(toJson(itemListDraft.instance()._getCapitalLetter())).toMatchSnapshot();
        expect(toJson(itemListIncomplete.instance()._getCapitalLetter())).toMatchSnapshot();
    });

    it("ItemList test onPress controls", () => {
        let cardView = itemList.props("children").children,
            cardContent = cardView.props.children,
            secondSection = cardContent.props.children[1],
            controlGroup = secondSection.props.children[1],
            iconButtons = controlGroup.props.children[1],
            btnHistory = iconButtons.props.children[0].props,
            btnNotes = iconButtons.props.children[1].props;
        expect(toJson(btnHistory.onPress())).toMatchSnapshot();
        expect(toJson(btnNotes.onPress())).toMatchSnapshot();
    });
});

it("Render FlatButton", () => {
    const button = shallow(<FlatButton />);
    expect(toJson(button)).toMatchSnapshot();
});

it("Render Swiper", () => {
    const swiper = renderer.create(<Swiper />).toJSON();
    expect(swiper).toMatchSnapshot();
});

it("Render Card", () => {
    const card = renderer.create(<Card />).toJSON();
    expect(card).toMatchSnapshot();
});

it("Validator On Time", () => {
    const valuesTest = {
        dueDateFormated: new Date("2018-01-17T13:30:13+00:00"),
        sentDateFormated: new Date("2018-01-17T11:54:13+00:00"),
        now: new Date("2018-01-16T13:30:13+00:00")
    };
    const wrapper = shallow(<ItemList />);
    expect(wrapper.instance().getStatus(valuesTest)).toEqual("ontime");
});
it("Validator dates Overdue", () => {
    const valuesTest = {
        dueDateFormated: new Date("2018-01-15T13:30:13+00:00"),
        sentDateFormated: new Date("2018-01-17T11:54:13+00:00"),
        now: new Date("2018-01-16T13:30:13+00:00")
    };
    const wrapper = shallow(<ItemList />);
    expect(wrapper.instance().getStatus(valuesTest)).toEqual("overdue");
});

it("Validator At Risk", () => {
    const valuesTest = {
        dueDateFormated: new Date("2018-01-17T16:30:13+00:00"),
        sentDateFormated: new Date("2018-01-16T11:54:13+00:00"),
        now: new Date("2018-01-16T13:30:13+00:00")
    };
    const wrapper = shallow(<ItemList />);
    expect(wrapper.instance().getStatus(valuesTest)).toEqual("atrisk");
});

it("Property maps - On time", () => {
    const wrapper = shallow(<ItemList />);
    expect(wrapper.instance().statusSettingMap.ontime).toEqual({
        color: "#1FBC99",
        textStatus: "lists_activity_due_date_on_time"
    });
});

it("Property maps - Overdue", () => {
    const wrapper = shallow(<ItemList />);
    expect(wrapper.instance().statusSettingMap.overdue).toEqual({
        color: "#E14333",
        textStatus: "lists_activity_due_date_overdue"
    });
});

it('Property maps - At risk', () => {
    const wrapper = shallow(<ItemList/>);
    expect(wrapper.instance().statusSettingMap['atrisk']).toEqual({
        "color": "#F1C500",
        "textStatus": "lists_activity_due_date_at_risk"
    });
});

it("Render NavigatorTitle", () => {
    const navigatorTitle = renderer
        .create(<NavigatorTitle title="test" number={5} />)
        .toJSON();
    expect(navigatorTitle).toMatchSnapshot();
});

it("Render NavigatorButton", () => {
    const navigatorButton = shallow(<NavigatorButton title="test" icon="sign-out" onPress={() => {}} />);
    expect(toJson(navigatorButton)).toMatchSnapshot();
});
