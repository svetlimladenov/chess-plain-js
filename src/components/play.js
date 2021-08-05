require.register("Play", ["$", "ObjectComponent"], ($, ObjectComponent) => {
    const Play = Object.create(ObjectComponent);

    Play.setup = function setup(figure, x, y, attackedFigure = null) {
        this.figure = figure;
        this.x = x;
        this.y = y;
        this.attackedFigure = attackedFigure;
        if (attackedFigure) {
            this.setElement($('<div class="attack-play"></div>'));
        } else {
            this.setElement($('<div class="play"></div>'));
        }
    };

    Play.attach = function attach($where) {
        this.render($where);
    };

    Play.remove = function remove() {
        this.$element.remove();
    };

    Play.onClick = function onClick(State) {
        if (this.attackedFigure) {
            this.attackedFigure.remove(State);
        }

        this.figure.move(this.x, this.y);
    };

    return Play;
});
