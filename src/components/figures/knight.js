require.register("Knight", ["Figure"], (Figure) => {
    function Knight(x, y, color) {
        Figure.call(
            this,
            x,
            y,
            "knight",
            "../public/images/figures/knight",
            color
        );
    }

    Knight.prototype = Object.create(Figure.prototype);

    return Knight;
});
