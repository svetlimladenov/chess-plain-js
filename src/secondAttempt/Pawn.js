import { Map, List } from "../../node_modules/immutable/dist/immutable.es.js";

class Pawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = "../../public/images/figures/pawn-black.png";
        this.name = "pawn";
    }

    getMoves(board) {
        return List([
            Map({ x: this.x, y: this.y + 1 }),
            Map({ x: this.x, y: this.y + 2 })
        ]);
    }
}

export default Pawn;
