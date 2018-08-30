/* eslint-disable consistent-return,no-restricted-syntax */
import {AsyncStorage} from "react-native";

/**
 * Gets item of the user preferences
 * @param key
 * @returns {Promise<*>}
 */
export const getItem = async (key) => {
    try {
        return AsyncStorage.getItem(key)
            .then(value => value);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Sets user preferences
 * @param key
 * @param value
 */
export const setItem = async (key, value) => {
    try {
        if (key && value) {
            await AsyncStorage.setItem(key, value);
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Gets multiple items of the user preferences
 * @param arrayKeys
 * @returns {Promise<*>}
 */
export const multiGet = async (arrayKeys) => {
    const items = {};
    return AsyncStorage.multiGet(arrayKeys)
        .then((arr) => {
            for (const item of arr) {
                items[item[0]] = item[1];
            }
            return items;
        });
};
