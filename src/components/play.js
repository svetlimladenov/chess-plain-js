require.register("Play", ["$", "ObjectComponent"], ($, ObjectComponent) => {
    const Play = Object.create(ObjectComponent);

    Play.setup = function setup(figure, x, y) {
        this.figure = figure;
        this.x = x;
        this.y = y;
        this.setElement($('<div class="play"></div>'));
    };

    Play.attach = function attach($where) {
        this.render($where);
    };

    Play.remove = function remove() {
        this.$element.remove();
    };

    Play.onClick = function onClick(State) {
        State.board[`row-${this.figure.x}`][this.figure.y].figure = null; // remove the figure from its last position
        State.board[`row-${this.x}`][this.y].figure = this.figure; // place the figure in the current box
        State.board[`row-${this.x}`][this.y].play = null; // remove the play from the current box
        State.playSelected = false;

        this.figure.move(this.x, this.y);
        this.figure.render(this.$parent); // render the figure in the current box

        State.availablePlays.forEach((play) => {
            play.remove();
        });
    };

    return Play;
});
