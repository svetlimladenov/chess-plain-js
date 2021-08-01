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

        function onFigureClick(figure, State) {
            const possibleMoves = figure.getPossibleMoves();
            const { availablePlays } = State;
            possibleMoves.forEach((move) => {
                const moveBox = State.board[`row-${move.x}`][move.y];
                if (moveBox.figure && moveBox.figure.color === figure.color) {
                    // you cant move to a place where you have a figure
                    return;
                }
                const newPlay = Object.create(Play);
                newPlay.setup(figure);
                newPlay.attach(moveBox.$element); // attach the new play box, to the possible boxes
                availablePlays.push(newPlay);
                moveBox.play = newPlay;
            });

            if (possibleMoves.length) {
                State.playSelected = true;
            }
        }

        // For now will leave this as unpure functions
        function onPlayClick(play, State) {
            const playedFigure = play.figure;
            State.board[`row-${playedFigure.x}`][playedFigure.y].figure = null; // remove the figure from the last position
            play.figure.move(this.x, this.y);

            // this.$element.empty();
            // play.remove();
            play.figure.render(this.$element); // render the figure in the current box

            State.board[`row-${this.x}`][this.y].figure = play.figure;
            State.board[`row-${this.x}`][this.y].play = null;
            State.playSelected = false;

            State.availablePlays.forEach((play) => {
                play.remove();
            });
        }

        ChessBox.onClick = function onClick(e) {
            const { play, figure } = this;

            if (figure) {
                onFigureClick.call(this, figure, State);
            }

            if (play) {
                onPlayClick.call(this, play, State);
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
