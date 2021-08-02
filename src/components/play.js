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
        State.board[`row-${this.x}`][this.y].figure = this.figure; // place the figure
        State.board[`row-${this.x}`][this.y].play = null;
        State.playSelected = false;

        this.figure.move(this.x, this.y);
        this.figure.render(this.$parent); // render the figure in the current box

        State.availablePlays.forEach((play) => {
            play.remove();
        });
    };

    return Play;
});
