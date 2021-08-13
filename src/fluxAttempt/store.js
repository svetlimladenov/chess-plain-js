import Pawn from "./Pawn.js";

/* eslint-disable indent */
// Reducer.
const chessReducer = (state = {}, action) => {
    switch (action.type) {
        case "INIT": {
            return {
                board: Array(8).fill(Array(8).fill(null))
            };
        }
        case "GAME_START": {
            const boardWithFigures = state.board.map((row, rowIdx) => {
                if (rowIdx === 1) {
                    return row.map((_, idx) => {
                        return new Pawn(idx, rowIdx);
                    });
                }

                return row;
            });
            return { board: boardWithFigures };
        }
        case "GAME_RESET": {
            return {
                board: Array(8).fill(Array(8).fill(null))
            };
        }
        default: {
            return state;
        }
    }
};

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

const store = createStore(chessReducer);

export default store;
