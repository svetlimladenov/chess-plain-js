import Event from "./Event.js";
import Pawn from "./Pawn.js";

class Chess {
    constructor() {
        this.showPossibleMovesEvent = new Event();
        this.figuresCreatedEvent = new Event();

        this._boards = [Chess.makeEmptyBoard()];
        this.availableMoves = [];
        this.isStarted = false;
    }

    start() {
        if (this.isStarted) {
            console.error("Game already started");
            return;
        }

        this._boards.push(this._addFigures());
        this.isStarted = true;
    }

    restart() {
        this.isStarted = false;
        this._updateBoard(Chess.makeEmptyBoard());
    }

    cellClicked(position) {
        const cell = this._getCellItem(position);
        if (cell) {
            const newMoves = cell.getMoves(this._getLatestBoard());
            const oldMoves = this.availableMoves;
            this.showPossibleMovesEvent.trigger(oldMoves, newMoves);
            this.availableMoves = newMoves;
        }
    }

    _getLatestBoard() {
        return this._boards[this._boards.length - 1];
    }

    _getCellItem(position) {
        return this._getLatestBoard()[position.y][position.x];
    }

    _updateBoard(newBoard) {
        this._boards.push(newBoard);
    }

    _addFigures() {
        const boardWithFigures = this._getLatestBoard().map((row, rowIdx) => {
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

    static makeEmptyBoard() {
        const board = Array(8).fill(Array(8).fill());
        return board;
    }
}

export default Chess;