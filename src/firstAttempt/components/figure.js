/* eslint-disable max-len */
require.register(
    "Figure",
    ["$", "Component", "Play", "State"],
    ($, Component, Play, State) => {
        function Figure(x, y, name, imageSource, color) {
            this.x = x;
            this.y = y;
            this.name = name;
            this.imageSource = imageSource;
            this.color = color;
            Component.prototype.setElement.call(
                this,
                $(`<div class="figure-wrapper">
                <img class="figure ${this.name}" src="${this.imageSource}-${this.color}.png" alt="${this.name}"/>
            </div>`)
            );
        }

        Figure.prototype = Object.create(Component.prototype);

        Figure.prototype.move = function move(x, y) {
            State.board[`row-${this.x}`][this.y].figure = null; // remove the figure from its position
            const newPosition = State.board[`row-${x}`][y];
            newPosition.figure = this; // place the figure to a new position
            this.render(newPosition.$element); // render the figure to the new position
            this.x = x;
            this.y = y;
        };

        Figure.prototype.remove = function remove() {
            this.$element.remove();
            State.board[`row-${this.x}`][this.y].figure = null;
            State.removedFigures.push(this);
        };

        Figure.prototype.getPossibleMoves = function getPossibleMoves() {
            if (this.color === "black") {
                return [{ x: this.x, y: this.y + 1 }];
            }

            return [{ x: this.x, y: this.y - 1 }];
        };

        Figure.prototype.onClick = function onClick() {
            const possibleMoves = this.getPossibleMoves.call(this, State); // this will first find the specific figure method: E.g. Pawn.getPossibleMoves(..)

            possibleMoves.forEach((move) => {
                const moveBox = State.board[`row-${move.x}`][move.y];
                const newPlay = Object.create(Play);
                newPlay.setup(this, move.x, move.y, move.attackedFigure);
                newPlay.attach(moveBox.$element); // attach the new play box, to the possible boxes
                State.availablePlays.push(newPlay);
            });
        };

        return Figure;
    }
);
