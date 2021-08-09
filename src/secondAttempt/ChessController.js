import Chess from "./Chess.js";
import ChessView from "./ChessView.js";

class ChessController {
    constructor() {
        this.view = new ChessView();
    }

    start(where) {
        this.view.render(where);
    }
}

export default ChessController;
