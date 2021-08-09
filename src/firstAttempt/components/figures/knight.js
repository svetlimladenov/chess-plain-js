require.register("Knight", ["Figure"], (Figure) => {
    function Knight(x, y, color) {
        Figure.call(
            this,
            x,
            y,
            "knight",
            "../../public/images/figures/knight",
            color
        );
    }

    Knight.prototype = Object.create(Figure.prototype);

    Knight.prototype.getPossibleMoves = function getPossibleMoves() {
        const moves = [];

        if (this.x + 2 <= 7 && this.y + 1 <= 7) {
            moves.push({ x: this.x + 2, y: this.y + 1 });
        }

        if (this.x + 2 <= 7 && this.y - 1 >= 0) {
            moves.push({ x: this.x + 2, y: this.y - 1 });
        }

        return moves;
    };

    return Knight;
});
