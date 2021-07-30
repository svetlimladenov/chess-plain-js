/* eslint-disable max-len */
require.register("Figure", ["$", "Component"], ($, Component) => {
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

    return Figure;
});
