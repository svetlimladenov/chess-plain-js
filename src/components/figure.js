/* eslint-disable max-len */
require.register("Figure", ["$"], ($) => {
    function Figure(x, y, name, imageSource) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.imageSource = imageSource;
        this.$elem = $(`<div class="figure-wrapper">
                <img class="figure ${this.name}" src="${this.imageSource}" alt="${this.name}"/>
            </div>`);
    }

    Figure.prototype.render = function render($where) {
        this.$elem = $where.append(this.$elem);
    };

    return Figure;
});
