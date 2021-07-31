require.register("Play", ["$", "ObjectComponent"], ($, ObjectComponent) => {
    const Play = Object.create(ObjectComponent);

    Play.setup = function setup(figure) {
        this.figure = figure;
        this.setElement($('<div class="play"></div>'));
    };

    Play.attach = function attach($where) {
        this.render($where);
    };

    return Play;
});
