/* eslint-disable indent */
import { getDefaultCellValue } from "./board.js";
import Play from "./Play.js";
import { updateObject, updateItem } from "./utils.js";

const chessReducer = (state = {}, action) => {
    switch (action.type) {
        case "INIT": {
            return {
                board: Array(8).fill(Array(8).fill(null))
            };
        }
        case "GAME_START": {
            const boardWithFigures = state.board.map((row, rowIdx) => {
                return row.map((col, colIdx) => {
                    return getDefaultCellValue(col, rowIdx, colIdx);
                });
            });
            return updateObject(state, { board: boardWithFigures });
        }
        case "GAME_RESET": {
            return updateObject(state, {
                board: Array(8).fill(Array(8).fill(null))
            });
        }
        case "GET_PLAY_POSITIONS": {
            const updatedRow = updateItem(
                state.board[action.position.y],
                action.position.x,
                {
                    render() {
                        return new Play(
                            action.position.x,
                            action.position.y
                        ).render();
                    }
                }
            );

            const board = updateItem(
                state.board,
                action.position.y,
                updatedRow
            );

            return updateObject(state, { board });
        }
        case "PLAY_CLICKED": {
            return state;
        }
        default: {
            return state;
        }
    }
};

export default chessReducer;
