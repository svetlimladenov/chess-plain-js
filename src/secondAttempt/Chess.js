import { Map, List } from "../../node_modules/immutable/dist/immutable.es.js";
import Event from "./Event.js";
import Pawn from "./Pawn.js";

class Chess {
    constructor() {
        this.showPossibleMovesEvent = new Event();
        this.figuresCreatedEvent = new Event();
        this.moveFigureEvent = new Event();

        this.immutableBoard = Chess.makeImmutableBoard();
        this.availableMoves = { moves: [], figure: null };
        this.isStarted = false;
    }

    start() {
        if (this.isStarted) {
            console.error("Game already started");
            return;
        }

        this.immutableBoard = this._addFigures();
        this.isStarted = true;
    }

    restart() {
        this.isStarted = false;
        this.immutableBoard = Chess.makeImmutableBoard();
    }

    cellClicked(position) {
        const cell = this._getCellItem(position);
        const playPositions = this._getPlay(position);

        if (playPositions) {
            const playedFigure = this.availableMoves.figure;

            const updatedBoard = this.immutableBoard.map((row, rowIdx) => {
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

            this._updateBoard(updatedBoard);

            const oldPosition = {
                x: playedFigure.x,
                y: playedFigure.y
            };

            this.availableMoves.figure.x = playPositions.x;
            this.availableMoves.figure.y = playPositions.y;

            this.moveFigureEvent.trigger(
                this.availableMoves.figure,
                this.availableMoves.moves.concat(oldPosition)
            );

            this.availableMoves = { moves: [], figure: null };
        }

        if (cell) {
            const newMoves = cell.getMoves(this.immutableBoard).slice(); // make a copy so we dont pass the real reference
            const oldMoves = this.availableMoves.moves.slice(); // make a copy so we dont pass the real reference
            this.showPossibleMovesEvent.trigger(oldMoves, newMoves);
            this.availableMoves.moves = newMoves;
            this.availableMoves.figure = cell;
        }
    }

    _getCellItem(position) {
        return this.immutableBoard.get(position.y).get(position.x);
    }

    _getPlay(position) {
        return this.availableMoves.moves.find(
            (play) => play.x === position.x && play.y === position.y
        );
    }

    _updateBoard(newBoard) {
        this.immutableBoard = newBoard;
    }

    _addFigures() {
        const boardWithFigures = this.immutableBoard.map((row, rowIdx) => {
            let newRow = row;
            if (rowIdx === 1) {
                newRow = row.map((_, idx) => {
                    return new Pawn(idx, rowIdx);
                });
            }

            return newRow;
        });

        this.figuresCreatedEvent.trigger(boardWithFigures);
        return boardWithFigures;
    }

    static makeImmutableBoard() {
        return List(Array(8).fill(List(Array(8).fill(null))));
    }
}

export default Chess;
