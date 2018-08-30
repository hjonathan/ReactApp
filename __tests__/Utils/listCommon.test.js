import React from 'react'
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';
import ListCommon from "../../App/Libs/ListCommon";

jest.mock('react-native-orientation', () => require.requireActual('../../__mocks__/react-native-orientation').default);

describe('Screen >>> Unassigned', () => {
    let listCommon;
    const props = {
            navigation: {
                dispatch: jest.fn(),
            },
            userInfoRequest: jest.fn(),
            casesTodoRequest: jest.fn(),
            requestCasesDraft: jest.fn(),
            requestCasesPartcipated: jest.fn(),
            requestCasesUnassigned: jest.fn()
        },
        paramsPrevUser = {
            caseList: [
                {
                    prevUser: {userId: "12345"},
                    task: {offlineEnabled: true},
                    process: {processId: "PO001"}
                },
                {
                    prevUser: {userId: "12346"},
                    task: {offlineEnabled: true},
                    process: {processId: "PO001"}
                }
            ],
            users: [
                {
                    userId: "12345",
                    userPhoto: "testPicture"
                }
            ]
        },
        paramsCurrentUser = {
            caseList: [
                {
                    currentUser: {userId: "12345"},
                    task:{offlineEnabled: true},
                    process: {processId: "PO001"}
                },
                {
                    currentUser: {userId: "12346"},
                    task:{offlineEnabled: true},
                    process: {processId: "PO001"}
                }
            ],
            users: [
                {
                    userId: "12345",
                    userPhoto: "testPicture"
                }
            ]
        };

    beforeAll(() => {
        listCommon = new ListCommon(props)
    });

    it("Should call getDataList method", () => {
        expect(listCommon.getDataList("casesTodoRequest"))
            .toEqual(undefined);
        expect(listCommon.getDataList("requestCasesDraft"))
            .toEqual(undefined);
        expect(listCommon.getDataList("requestCasesPartcipated"))
            .toEqual(undefined);
        expect(listCommon.getDataList("requestCasesUnassigned"))
            .toEqual(undefined);
        expect(listCommon.getDataList("otherMethod"))
            .toEqual(undefined);
    });

    it("Should call getUsersInfo method", () => {
        expect(listCommon.getUsersInfo(paramsPrevUser.caseList, "prevUser"))
            .toEqual(undefined);
        expect(listCommon.getUsersInfo(paramsCurrentUser.caseList, "currentUser"))
            .toEqual(undefined);
        expect(listCommon.getUsersInfo(paramsCurrentUser.caseList, "other"))
            .toEqual(undefined);
    });

    it("Should call mergeList method", () => {
        expect(listCommon.mergeList(paramsPrevUser, "prevUser")[0].userPhoto)
            .toEqual(paramsPrevUser.users[0].userPhoto);
        expect(listCommon.mergeList(paramsCurrentUser, "currentUser")[0].userPhoto)
            .toEqual(paramsCurrentUser.users[0].userPhoto);
        expect(listCommon.mergeList(paramsCurrentUser, "other")[0].userPhoto)
            .toEqual(paramsCurrentUser.users[0].userPhoto);
    });
});
