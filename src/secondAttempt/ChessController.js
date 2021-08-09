import Chess from "./Chess.js";
import ChessView from "./ChessView.js";

class ChessController {
    constructor() {
        this.view = new ChessView();
        this.view.playEvent.addListener((e) => {
            console.log("it works");
            console.log(e);
        });
    }

    start(where) {
        this.view.render(where);
    }
}

export default ChessController;
