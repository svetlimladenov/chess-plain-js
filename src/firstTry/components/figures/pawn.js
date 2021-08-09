require.register("Pawn", ["Figure", "FigureColors"], (Figure, FigureColors) => {
    function Pawn(x, y, color) {
        Figure.call(this, x, y, "pawn", "../public/images/figures/pawn", color);
    }

    Pawn.prototype = Object.create(Figure.prototype);

    function getBoxFigure(board, x, y) {
        const box = board[`row-${x}`][y];
        if (box.figure && box.figure.color !== this.color) {
            return box.figure;
        }

        return false;
    }

    function getAttackMoves(board) {
        const boardMaxLength = 7;
        const attackMoves = [];
        const leftAttackX = this.x + 1;
        const leftAttackY = this.y + 1;
        if (leftAttackX > boardMaxLength || leftAttackY > boardMaxLength) {
            return attackMoves;
        }
        const leftAttackFigure = getBoxFigure.call(
            this,
            board,
            leftAttackX,
            leftAttackY
        );

        if (leftAttackFigure) {
            attackMoves.push({
                x: leftAttackX,
                y: leftAttackY,
                attackedFigure: leftAttackFigure
            });
        }

        const rightAttackX = this.x + 1;
        const rightAttackY = this.y - 1;
        if (rightAttackY < 0 || rightAttackX > boardMaxLength) {
            return attackMoves;
        }

        const rightAttackFigure = getBoxFigure.call(
            this,
            board,
            rightAttackX,
            rightAttackY
        );

        if (rightAttackFigure) {
            attackMoves.push({
                x: rightAttackX,
                y: rightAttackY,
                attackedFigure: rightAttackFigure
            });
        }

        return attackMoves;
    }

    Pawn.prototype.getPossibleMoves = function getPossibleMoves(State) {
        const moves = [];
        if (this.color === FigureColors.BLACK) {
            if (this.x + 1 <= 7) {
                moves.push({ x: this.x + 1, y: this.y });
            }

            if (this.x === 1) {
                moves.push({ x: this.x + 2, y: this.y });
            }
        }

        if (this.color === FigureColors.WHITE) {
            if (this.x - 1 >= 0) {
                moves.push({ x: this.x - 1, y: this.y });
            }

            if (this.x === 6) {
                moves.push({ x: this.x - 2, y: this.y });
            }
        }

        const attackMoves = getAttackMoves.call(this, State.board, moves);
        moves.push(...attackMoves);

        return moves;
    };

    return Pawn;
});
