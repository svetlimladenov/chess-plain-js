/* eslint-disable import/prefer-default-export */
import Pawn from "./Pawn.js";

export const getDefaultCellValue = (box, rowIdx, colIdx) => {
    if (rowIdx === 1) {
        return new Pawn(colIdx, rowIdx);
    }
    return box;
};
