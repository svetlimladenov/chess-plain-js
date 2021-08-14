/* eslint-disable import/prefer-default-export */

export const getDefaultCellValue = (box, rowIdx, colIdx) => {
    if (rowIdx === 1) {
        return "PAWN_BLACK";
    }
    return box;
};
