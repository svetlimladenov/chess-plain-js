require.register("Pawn", ["Figure", "FigureColors"], (Figure, FigureColors) => {
    function Pawn(x, y, color) {
        Figure.call(this, x, y, "pawn", "../public/images/figures/pawn", color);
    }

    Pawn.prototype = Object.create(Figure.prototype);

    Pawn.prototype.getPossibleMoves = function getPossibleMoves() {
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

        return moves;
    };

    return Pawn;
});
