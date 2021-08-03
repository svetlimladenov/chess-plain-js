require.register("Bishop", ["Figure"], (Figure) => {
    function Bishop(x, y, color) {
        Figure.call(
            this,
            x,
            y,
            "bishop",
            "../public/images/figures/bishop",
            color
        );
    }

    Bishop.prototype = Object.create(Figure.prototype);

    function boxHasFigure(State, x, y) {
        const box = State.board[`row-${x}`][y];
        if (box.figure) {
            return box.figure;
        }

        return false;
    }

    function getDownRightDiagonalMoves(State, boardMaxLenght) {
        const moves = [];
        let idx = 1;
        for (let i = this.x; i < boardMaxLenght - 1; i += 1) {
            const xIndex = this.x + idx;
            const yIndex = this.y + idx;
            if (xIndex > boardMaxLenght || yIndex > boardMaxLenght) {
                break;
            }

            const figure = boxHasFigure.call(this, State, xIndex, yIndex);
            if (figure) {
                if (figure.color !== this.color) {
                    console.log("a");
                    moves.push({
                        x: xIndex,
                        y: yIndex,
                        attackedFigure: figure
                    });
                }
                break;
            }

            moves.push({ x: xIndex, y: yIndex });
            idx += 1;
        }
        return moves;
    }

    function getDownLeftDiagonalMoves(State, boardMaxLenght) {
        const moves = [];
        let idx = 1;
        for (let i = this.x; i < boardMaxLenght - 1; i += 1) {
            const xIndex = this.x + idx;
            const yIndex = this.y - idx;
            if (xIndex > boardMaxLenght || yIndex < 0) {
                break;
            }

            if (boxHasFigure.call(this, State, xIndex, yIndex)) {
                break;
            }

            moves.push({ x: this.x + idx, y: this.y - idx });
            idx += 1;
        }
        return moves;
    }

    function getUpLeftDiagonalMoves(State) {
        const moves = [];
        let idx = 1;
        for (let i = this.x; i > 0; i -= 1) {
            const xIndex = this.x - idx;
            const yIndex = this.y - idx;
            if (xIndex < 0 || yIndex < 0) {
                break;
            }

            if (boxHasFigure.call(this, State, xIndex, yIndex)) {
                break;
            }

            moves.push({ x: xIndex, y: yIndex });
            idx += 1;
        }
        return moves;
    }

    function getUpRightDiagonalMoves(State, boardMaxLenght) {
        const moves = [];
        let idx = 1;
        for (let i = this.x; i > 0; i -= 1) {
            const xIndex = this.x - idx;
            const yIndex = this.y + idx;
            if (xIndex < 0 || yIndex > boardMaxLenght) {
                break;
            }

            if (boxHasFigure.call(this, State, xIndex, yIndex)) {
                break;
            }
            moves.push({ x: this.x - idx, y: this.y + idx });
            idx += 1;
        }
        return moves;
    }

    Bishop.prototype.getPossibleMoves = function getPossibleMoves(State) {
        const boardMaxLenght = 7;
        const downRightDiagonalMoves = getDownRightDiagonalMoves.call(
            this,
            State,
            boardMaxLenght
        );

        const downLeftDiagonalMoves = getDownLeftDiagonalMoves.call(
            this,
            State,
            boardMaxLenght
        );

        const upLeftDiagonalMoves = getUpLeftDiagonalMoves.call(this, State);

        const upRightDiagonalMoves = getUpRightDiagonalMoves.call(
            this,
            State,
            boardMaxLenght
        );

        const moves = [
            ...downRightDiagonalMoves,
            ...downLeftDiagonalMoves,
            ...upLeftDiagonalMoves,
            ...upRightDiagonalMoves
        ];

        return moves;
    };

    return Bishop;
});
