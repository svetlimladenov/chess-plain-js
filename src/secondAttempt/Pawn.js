class Pawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = "../../public/images/figures/pawn-black.png";
        this.name = "pawn";
    }

    getMoves(board) {
        return [
            { x: this.x, y: this.y + 1 },
            { x: this.x, y: this.y + 2 }
        ];
    }
}

export default Pawn;
