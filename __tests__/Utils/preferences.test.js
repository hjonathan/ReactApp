import * as preferences from "../../App/Utils/preferences";

jest.mock('react-native', () => ({
    AsyncStorage: {
        setItem: jest.fn((item, value) => {
            return new Promise((resolve, reject) => {
                resolve({});
            });
        }),
        getItem: jest.fn((item) => {
            return new Promise((resolve, reject) => {
                resolve("item");
            });
        }),
        multiGet: jest.fn((arr) => {
            return new Promise((resolve, reject) => {
                resolve([[arr[0], "item"]]);
            });
        })
    }
}));

describe("Preferences", () => {
    test("getItem", async () => {
        expect(await preferences.getItem("@test")).toEqual("item");
    });
    test("multiGet", async () => {
        expect(await preferences.multiGet(["@test"])).toEqual({"@test": "item"});
    });
    test("setItem", async () => {
        expect(await preferences.setItem("@test", "item")).toBeUndefined();
    });
});