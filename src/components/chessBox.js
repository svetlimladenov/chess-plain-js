require.register(
    "ChessBox",
    ["$", "ObjectComponent", "State", "Rook"],
    ($, ObjectComponent, State, Rook) => {
        const ChessBox = Object.create(ObjectComponent); // ChessBox is an empty object now {}, with ObjetComponents being its [[Prototype]]

        ChessBox.setup = function setup(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.setElement(
                $(`<div id="${this.x}-${this.y}" class="box ${this.color}">`)
            ); // delegated call
            this.figure = null;
        };

        ChessBox.onClick = function onClick(e) {
            const rerenderBoardEvent = new CustomEvent("rerenderBoard", {
                detail: {
                    board: State.board
                }
            });

            document.dispatchEvent(rerenderBoardEvent);
        };

        ChessBox.setFigure = function setFigure(figure) {
            this.figure = figure;
        };

        ChessBox.build = function build($parentElement) {
            this.setParentElement($parentElement);
            this.$element.click(this.onClick.bind(this));
            if (this.figure) {
                this.figure.render(this.$element);
            }
            this.render($parentElement); // delegated call
        };

        return ChessBox;
    }
);
