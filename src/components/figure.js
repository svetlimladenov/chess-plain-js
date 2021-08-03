/* eslint-disable max-len */
require.register("Figure", ["$", "Component", "Play"], ($, Component, Play) => {
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
        this.x = x;
        this.y = y;
    };

    Figure.prototype.getPossibleMoves = function getPossibleMoves() {
        if (this.color === "black") {
            return [{ x: this.x, y: this.y + 1 }];
        }

        return [{ x: this.x, y: this.y - 1 }];
    };

    Figure.prototype.onClick = function onClick(State) {
        const possibleMoves = this.getPossibleMoves.call(this, State); // this will first find the specific figure method: E.g. Pawn.getPossibleMoves(..)

        possibleMoves.forEach((move) => {
            const moveBox = State.board[`row-${move.x}`][move.y];
            const newPlay = Object.create(Play);
            newPlay.setup(this, move.x, move.y, move.attackedFigure);
            newPlay.attach(moveBox.$element); // attach the new play box, to the possible boxes
            State.availablePlays.push(newPlay);
            moveBox.play = newPlay;
        });
    };

    return Figure;
});
