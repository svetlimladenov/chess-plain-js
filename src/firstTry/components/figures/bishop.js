require.register("Bishop", ["Figure"], (Figure) => {
    function Bishop(x, y, color) {
        Figure.call(
            this,
            x,
            y,
            "bishop",
            "../../public/images/figures/bishop",
            color
        );
    }

    Bishop.prototype = Object.create(Figure.prototype);

    function getBoxFigure(board, x, y) {
        const box = board[`row-${x}`][y];
        if (box.figure) {
            return box.figure;
        }

        return false;
    }

    function addAttackMove(figure, moves, xIndex, yIndex) {
        if (figure.color !== this.color) {
            moves.push({
                x: xIndex,
                y: yIndex,
                attackedFigure: figure
            });
        }
    }

    function getDownRightDiagonalMoves(board, boardMaxLenght) {
        const moves = [];
        let idx = 1;
        for (let i = this.x; i < boardMaxLenght; i += 1) {
            const xIndex = this.x + idx;
            const yIndex = this.y + idx;
            if (xIndex > boardMaxLenght || yIndex > boardMaxLenght) {
                break;
            }

            const figure = getBoxFigure.call(this, board, xIndex, yIndex);
            if (figure) {
                addAttackMove.call(this, figure, moves, xIndex, yIndex);
                break;
            }

            moves.push({ x: xIndex, y: yIndex });
            idx += 1;
        }
        return moves;
    }

    function getDownLeftDiagonalMoves(board, boardMaxLenght) {
        const moves = [];
        let idx = 1;
        for (let i = this.x; i < boardMaxLenght; i += 1) {
            const xIndex = this.x + idx;
            const yIndex = this.y - idx;
            if (xIndex > boardMaxLenght || yIndex < 0) {
                break;
            }

            const figure = getBoxFigure.call(this, board, xIndex, yIndex);
            if (figure) {
                addAttackMove.call(this, figure, moves, xIndex, yIndex);
                break;
            }

            moves.push({ x: this.x + idx, y: this.y - idx });
            idx += 1;
        }
        return moves;
    }

    function getUpLeftDiagonalMoves(board) {
        const moves = [];
        let idx = 1;
        for (let i = this.x; i > 0; i -= 1) {
            const xIndex = this.x - idx;
            const yIndex = this.y - idx;
            if (xIndex < 0 || yIndex < 0) {
                break;
            }

            const figure = getBoxFigure.call(this, board, xIndex, yIndex);
            if (figure) {
                addAttackMove.call(this, figure, moves, xIndex, yIndex);
                break;
            }

            moves.push({ x: xIndex, y: yIndex });
            idx += 1;
        }
        return moves;
    }

    function getUpRightDiagonalMoves(board, boardMaxLenght) {
        const moves = [];
        let idx = 1;
        for (let i = this.x; i > 0; i -= 1) {
            const xIndex = this.x - idx;
            const yIndex = this.y + idx;
            if (xIndex < 0 || yIndex > boardMaxLenght) {
                break;
            }

            const figure = getBoxFigure.call(this, board, xIndex, yIndex);
            if (figure) {
                addAttackMove.call(this, figure, moves, xIndex, yIndex);
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
            State.board,
            boardMaxLenght
        );

        const downLeftDiagonalMoves = getDownLeftDiagonalMoves.call(
            this,
            State.board,
            boardMaxLenght
        );

        const upLeftDiagonalMoves = getUpLeftDiagonalMoves.call(
            this,
            State.board
        );

        const upRightDiagonalMoves = getUpRightDiagonalMoves.call(
            this,
            State.board,
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
