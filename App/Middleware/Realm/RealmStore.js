import StoreFactory from "./StoreFactory";

/**
 * Middleware to save the some storage methods in realm
 * @param store
 * @returns {function(*): function(*=)}
 * @constructor
 */
const RealmStore = store => next => (action) => {
    const state = store.getState(),
        factory = new StoreFactory(),
        modelMethod = factory.createStorm(action.type);
    if (state.Net.isConnected && modelMethod) {
        modelMethod(action.payload, state);
    }
    next(action);
};
export default RealmStore;
