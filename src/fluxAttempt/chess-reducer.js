/* eslint-disable indent */
import { getDefaultCellValue } from "./board.js";
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
        case "SHOW_PLAYABLE_POSITIONS": {
            const boardWithPlays = state.board.map((row, rowIdx) => {
                return row.map((col, colIdx) => {
                    if (col === "PLAY") {
                        return null;
                    }

                    const a = action.playPositions.find(
                        (pos) => pos.x === colIdx && pos.y === rowIdx
                    );

                    if (a) {
                        return "PLAY";
                    }

                    return col;
                });
            });

            return updateObject(state, { board: boardWithPlays });
        }
        case "PLAY_CLICKED": {
            console.log("play clicked action");
            return state;
        }
        default: {
            return state;
        }
    }
};

export default chessReducer;
