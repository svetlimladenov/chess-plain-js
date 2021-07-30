require.register("ChessBox", ["$", "State", "Rook"], ($, State, Rook) => {
    const ChessBox = {
        init(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.$element = $(
                `<div id="${this.x}-${this.y}" class="box ${this.color}">`
            );
            this.$parentElement = null;
            this.figure = null;
        },
        onClick(e) {
            // const row = State.board[`row-${this.x}`];
            // if (row) {
            //     const figure = row.filter(
            //         // eslint-disable-next-line prefer-arrow-callback
            //         function filterIndex(el) {
            //             return el.y === this.y;
            //         }.bind(this) // Can be written as an arrow-function, but just wanted to exercise my skills for this bindings
            //     );

            //     if (figure.length) {
            //         console.log(figure[0].move());
            //     }
            // }

            State.board[`row-${this.x}`][this.y].figure = new Rook(
                this.x,
                this.y
            );

            const rerenderBoardEvent = new CustomEvent("rerenderBoard", {
                detail: {
                    board: State.board
                }
            });

            document.dispatchEvent(rerenderBoardEvent);
        },
        render($parentElement) {
            this.$parentElement = $parentElement;
            this.$element.click(this.onClick.bind(this));
            if (this.figure) {
                this.figure.render(this.$element);
            }
            $parentElement.append(this.$element);
        }
    };

    return ChessBox;
});
