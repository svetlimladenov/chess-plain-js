require.register("Pawn", ["Figure", "FigureColors"], (Figure, FigureColors) => {
    function Pawn(x, y, color) {
        Figure.call(this, x, y, "pawn", "../public/images/figures/pawn", color);
    }

    Pawn.prototype = Object.create(Figure.prototype);

    Pawn.prototype.move = function move(x, y) {
        this.x = x;
        this.y = y;
        console.log("mooving a pawn");
    };

    Pawn.prototype.getPossibleMove = function getPossibleMove() {
        if (this.color === FigureColors.BLACK) {
            return [{ x: this.x + 1, y: this.y }];
        }

        return [{ x: this.x - 1, y: this.y }];
    };

    return Pawn;
});
