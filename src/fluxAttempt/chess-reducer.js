/* eslint-disable indent */
import { getDefaultCellValue } from "./board.js";
import { updateObject, updateItem } from "./utils.js";

const chessReducer = (state = {}, action) => {
    switch (action.type) {
        case "INIT": {
            return {
                board: Array(8).fill(Array(8).fill(null)),
                figureInPlay: null
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
                board: Array(8).fill(Array(8).fill(null)),
                figureInPlay: null
            });
        }
        case "SHOW_PLAYABLE_POSITIONS": {
            const boardWithPlays = state.board.map((row, rowIdx) => {
                return row.map((col, colIdx) => {
                    // reset the old plays
                    if (col === "PLAY") {
                        return null;
                    }

                    const currentPlay = action.playPositions.find(
                        (pos) => pos.x === colIdx && pos.y === rowIdx
                    );

                    if (currentPlay) {
                        return "PLAY";
                    }

                    return col;
                });
            });

            return updateObject(state, {
                board: boardWithPlays,
                figureInPlay: action.figureInPlay
            });
        }
        case "PLAY_CLICKED": {
            const figurePosition = state.figureInPlay.position;
            const newPosition = action.position;

            const moved = state.board.map((row, rowIdx) => {
                return row.map((col, colIdx) => {
                    if (
                        rowIdx === figurePosition.y &&
                        colIdx === figurePosition.x
                    ) {
                        return null;
                    }

                    if (rowIdx === newPosition.y && colIdx === newPosition.x) {
                        return state.figureInPlay.name;
                    }

                    if (col === "PLAY") {
                        return null;
                    }

                    return col;
                });
            });
            console.log(moved);
            return updateObject(state, { board: moved });
        }
        default: {
            return state;
        }
    }
};

export default chessReducer;
