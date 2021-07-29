require.register("ChessBox", ["$"], ($) => {
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
            console.log(e);
            console.log(this.x, this.y);
        },
        render($where) {
            this.$elem.click(this.onClick.bind(this));
            $where.append(this.$elem);
        }
    };

    return ChessBox;
});
