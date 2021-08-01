require.register("Pawn", ["Figure", "FigureColors"], (Figure, FigureColors) => {
    function Pawn(x, y, color) {
        Figure.call(this, x, y, "pawn", "../public/images/figures/pawn", color);
    }

    Pawn.prototype = Object.create(Figure.prototype);

    Pawn.prototype.getPossibleMoves = function getPossibleMoves() {
        if (this.color === FigureColors.BLACK) {
            const moves = [];
            if (this.x + 1 <= 7) {
                moves.push({ x: this.x + 1, y: this.y });
            }

            if (this.x === 1) {
                moves.push({ x: this.x + 2, y: this.y });
            }

            return moves;
        }

        return [
            { x: this.x - 1, y: this.y },
            { x: this.x - 2, y: this.y }
        ];
    };

    return Pawn;
});
