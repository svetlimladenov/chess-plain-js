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

    Bishop.prototype.getPossibleMoves = function getPossibleMoves() {
        return [{ x: this.x + 1, y: this.y + 1 }];
    };

    return Bishop;
});
