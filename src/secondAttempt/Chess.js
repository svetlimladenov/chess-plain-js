import { Map, List } from "../../node_modules/immutable/dist/immutable.es.js";
import Event from "./Event.js";
import Pawn from "./Pawn.js";

class Chess {
    constructor() {
        this.showPossibleMovesEvent = new Event();
        this.figuresCreatedEvent = new Event();
        this.moveFigureEvent = new Event();

        this.board = Chess.makeBoardStore();
        this.availableMoves = Chess.makeMovesStore();
        this.isStarted = false;
    }

    start() {
        if (this.isStarted) {
            console.error("Game already started");
            return;
        }

        this.board = this._addFigures();
        this.isStarted = true;
    }

    restart() {
        this.isStarted = false;
        this.board = Chess.makeBoardStore();
    }

    cellClicked(position) {
        const cell = this._getCellItem(position);
        const playPositions = this._getPlay(position);

        if (playPositions) {
            const playedFigure = this.availableMoves.get("figure");

            const updatedBoard = this.board.map((row, rowIdx) => {
                return row.map((col, colIdx) => {
                    if (
                        rowIdx === playPositions.y &&
                        colIdx === playPositions.x
                    ) {
                        return playedFigure;
                    }

                    if (
                        rowIdx === playedFigure.y &&
                        colIdx === playPositions.x
                    ) {
                        return null;
                    }

                    return col;
                });
            });

            const oldPosition = {
                x: playedFigure.x,
                y: playedFigure.y
            };

            this.availableMoves.figure.x = playPositions.x; // mutation to remove
            this.availableMoves.figure.y = playPositions.y; // mutation to remove

            this.moveFigureEvent.trigger(
                this.availableMoves.get("figure"),
                this.availableMoves.moves.concat(oldPosition)
            );

            return {
                board: updatedBoard,
                availableMoves: Chess.makeMovesStore()
            };
        }

        if (cell) {
            const newMoves = cell.getMoves(this.board);
            const oldMoves = this.availableMoves.get("moves");
            this.showPossibleMovesEvent.trigger(oldMoves, newMoves);
            return {
                availableMoves: this.availableMoves
                    .set("moves", newMoves)
                    .set("figure", cell),
                board: this.board
            };
        }

        return {
            availableMoves: this.availableMoves,
            board: this.board
        };
    }

    _getCellItem(position) {
        return this.board.get(position.y).get(position.x);
    }

    _getPlay(position) {
        return this.availableMoves
            .get("moves")
            .find(
                (play) =>
                    play.get("x") === position.x && play.get("y") === position.y
            );
    }

    _addFigures() {
        const boardWithFigures = this.board.map((row, rowIdx) => {
            if (rowIdx === 1) {
                return row.map((_, idx) => {
                    return new Pawn(idx, rowIdx);
                });
            }

            return row;
        });

        this.figuresCreatedEvent.trigger(boardWithFigures);
        return boardWithFigures;
    }

    static makeBoardStore() {
        return List(Array(8).fill(List(Array(8).fill(null))));
    }

    static makeMovesStore() {
        return Map({ moves: List(), figure: null });
    }
}

export default Chess;
