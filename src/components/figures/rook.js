require.register("Rook", ["Figure"], (Figure) => {
    function Rook(x, y) {
        Figure.call(this, x, y, "pawn", "../public/images/figures/rook.png");
    }

    Rook.prototype = Object.create(Figure.prototype);

    Rook.prototype.move = function move(direction) {
        console.log("moving a rook");
    };

    return Rook;
});
