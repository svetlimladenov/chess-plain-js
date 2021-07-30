require.register("Bishop", ["Figure"], (Figure) => {
    function Bishop(x, y, color) {
        Figure.call(
            this,
            x,
            y,
            "bishop",
            "../public/images/figures/bishop",
            color
        );
    }

    Bishop.prototype = Object.create(Figure.prototype);

    return Bishop;
});
