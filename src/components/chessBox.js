require.register(
    "ChessBox",
    ["$", "ObjectComponent", "State", "Play"],
    ($, ObjectComponent, State, Play) => {
        const ChessBox = Object.create(ObjectComponent); // ChessBox is an empty object now {}, with ObjetComponents being its [[Prototype]]

        ChessBox.setup = function setup(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.setElement(
                $(`<div id="${this.x}-${this.y}" class="box ${this.color}">`)
            ); // delegated call
            this.figure = null;
            this.play = null;
        };

        ChessBox.onClick = function onClick(e) {
            // eslint-disable-next-line prefer-destructuring
            const { play, figure } = this;

            if (figure) {
                const possibleMoves = figure.getPossibleMove();
                const firstMove = possibleMoves[0];
                const newPlay = Object.create(Play);
                newPlay.setup(figure);
                newPlay.attach(
                    State.board[`row-${firstMove.x}`][firstMove.y].$element
                ); // attach the new play box, to the corrent box
                State.board[`row-${firstMove.x}`][firstMove.y].play = newPlay;
            }

            if (play) {
                const playedFigure = play.figure;
                State.board[`row-${playedFigure.x}`][playedFigure.y].figure =
                    null;
                play.figure.move(this.x, this.y);

                this.$element.empty();
                play.figure.render(this.$element);

                State.board[`row-${this.x}`][this.y].figure = play.figure;
                State.board[`row-${this.x}`][this.y].play = null;
            }

            const rerenderBoardEvent = new CustomEvent("rerenderBoard", {
                detail: {
                    board: State.board
                }
            });

            document.dispatchEvent(rerenderBoardEvent);
        };

        ChessBox.setFigure = function setFigure(figure) {
            this.figure = figure;
        };

        ChessBox.build = function build($parentElement) {
            this.$element.click(this.onClick.bind(this));
            if (this.figure) {
                this.figure.render(this.$element);
            }
            this.render($parentElement); // delegated call
        };

        return ChessBox;
    }
);
