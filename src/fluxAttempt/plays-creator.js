import Play from "./play.js";

export default function createPlay(rowIdx, colIdx) {
    return new Play(colIdx, rowIdx);
}
