require.register("ChessBox", ["$", "State"], ($, State) => {
    const ChessBox = {
        init(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.$elem = $(
                `<div id="${this.x}-${this.y}" class="box ${this.color}">`
            );
        },
        onClick(e) {
            const row = State.board[`row-${this.x}`];
            if (row) {
                const figure = row.filter(
                    // eslint-disable-next-line prefer-arrow-callback
                    function filterIndex(el) {
                        return el.y === this.y;
                    }.bind(this) // Can be written as an arrow-function, but just wanted to exercise my skills for this bindings
                );

                if (figure.length) {
                    console.log(figure[0].move());
                }
            }
        },
        render($where) {
            this.$elem.click(this.onClick.bind(this));
            $where.append(this.$elem);
        }
    };

    return ChessBox;
});
