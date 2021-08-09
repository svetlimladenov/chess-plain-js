require.register("Rook", ["Figure"], (Figure) => {
    function Rook(x, y, color) {
        Figure.call(this, x, y, "pawn", "../public/images/figures/rook", color);
    }

    Rook.prototype = Object.create(Figure.prototype);

    return Rook;
});
