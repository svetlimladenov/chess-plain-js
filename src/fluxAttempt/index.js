import Chess from "./Chess.js";

const root = document.getElementById("root");

const state = {
    board: Array(8).fill(Array(8).fill(null))
};

const chess = new Chess(state);

root.appendChild(chess.render());
