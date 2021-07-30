/* eslint-disable max-len */
require.register("Figure", ["$", "Component"], ($, Component) => {
    function Figure(x, y, name, imageSource) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.imageSource = imageSource;
        this.$element = $(`<div class="figure-wrapper">
                <img class="figure ${this.name}" src="${this.imageSource}" alt="${this.name}"/>
            </div>`);
    }

    Figure.prototype = Object.create(Component.prototype);

    return Figure;
});
