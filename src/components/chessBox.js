require.register(
    "ChessBox",
    ["$", "ObjectComponent", "State", "Play"],
    ($, ObjectComponent, State) => {
        const ChessBox = Object.create(ObjectComponent); // ChessBox is an empty object now {}, with ObjetComponents being its [[Prototype]]

        function cleanAvailablePlays() {
            if (State.availablePlays.length > 0) {
                State.availablePlays.forEach((availablePlay) => {
                    availablePlay.remove();
                });

                State.availablePlays = [];
            }
        }

        ChessBox.setup = function setup(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.setElement(
                $(`<div id="${this.x}-${this.y}" class="box ${this.color}">`)
            ); // delegated call
            this.figure = null;
        };

        ChessBox.onClick = function onClick() {
            const { figure } = this;
            const play = State.availablePlays.find(
                (p) => p.x === this.x && p.y === this.y
            );

            if (figure) {
                cleanAvailablePlays(State);
                figure.onClick(State);
            }

            if (play) {
                play.onClick(State);
                cleanAvailablePlays(State);
            }
        };

        ChessBox.setFigure = function setFigure(figure) {
            this.figure = figure;
        };

        ChessBox.build = function build($parentElement) {
            this.$element.click(this.onClick.bind(this));
            if (this.figure) {
                this.figure.render(this.$element);
            }
            this.render($parentElement); // delegated call
        };

        return ChessBox;
    }
);
