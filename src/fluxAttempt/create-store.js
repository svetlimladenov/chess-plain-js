// Store.
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter((cb) => cb !== listener);
        };
    };

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((cb) => cb());
    };

    dispatch({});

    return { subscribe, getState, dispatch };
};

export default createStore;
