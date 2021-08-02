require.register(
    "ChessBox",
    ["$", "ObjectComponent", "State", "Play"],
    ($, ObjectComponent, State) => {
        const ChessBox = Object.create(ObjectComponent); // ChessBox is an empty object now {}, with ObjetComponents being its [[Prototype]]

        ChessBox.setup = function setup(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.setElement(
                $(`<div id="${this.x}-${this.y}" class="box ${this.color}">`)
            ); // delegated call
            this.figure = null;
            this.play = null;
        };

        ChessBox.onClick = function onClick(e) {
            const { play, figure } = this;

            if (figure) {
                figure.onClick(State);
            }

            if (play) {
                play.onClick(State);
            }
        };

        ChessBox.setFigure = function setFigure(figure) {
            this.figure = figure;
        };

        ChessBox.setPlay = function setPlay(play) {
            this.play = play;
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
