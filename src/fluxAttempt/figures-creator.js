import Pawn from "./pawn.js";

export default function createFigure(rowIdx, colIdx, col) {
    if (col === "PAWN_BLACK") {
        return new Pawn(colIdx, rowIdx);
    }

    return null;
}
