require.register("Pawn", ["Figure"], (Figure) => {
    function Pawn(x, y, color) {
        Figure.call(this, x, y, "pawn", "../public/images/figures/pawn", color);
    }

    Pawn.prototype = Object.create(Figure.prototype);

    Pawn.prototype.move = function move(direction) {
        this.x += 1;
        console.log("mooving a pawn");
    };

    return Pawn;
});
