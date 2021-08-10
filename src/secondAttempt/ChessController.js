import Chess from "./Chess.js";
import ChessView from "./ChessView.js";

class ChessController {
    constructor() {
        this.view = new ChessView();
        this.model = new Chess();

        this.view.cellClickedEvent.addListener((e) => {
            this.model.cellClicked(e);
        });

        this.view.startEvent.addListener((data) => {
            this.model.start(data);
        });

        this.view.restartEvent.addListener(() => {
            this.model.restart();
        });

        this.model.showPossibleMovesEvent.addListener((oldMoves, newMoves) => {
            this.view.showPossibleMoves(oldMoves, newMoves);
        });

        this.model.figuresCreatedEvent.addListener((data) => {
            this.view.appendFigures(data);
        });
    }

    start(where) {
        this.view.render(where);
    }
}

export default ChessController;
