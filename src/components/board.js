require.register(
    "Board",
    ["$", "ChessBox", "Figures"],
    ($, ChessBox, Figures) => {
        function createCurrentBox(x, y, colorToggle) {
            const currentBox = Object.create(ChessBox);
            currentBox.init(x, y, colorToggle ? "white" : "black"); // the OOLE approach
            return currentBox;
        }

        function createFigure(x, y, colorToggle) {
            if (x === 1) {
                return new Figures.Pawn(x, y);
            }

            if (x === 0 && (y === 0 || y === 7)) {
                return new Figures.Rook(x, y);
            }

            return null;
        }

        const Board = {
            init(size, elementId) {
                this.size = size;
                this.elementId = elementId;
                this.state = {};
                this.$elem = $(`<div id=${this.elementId}>`);
            },
            render($where) {
                let colorToggle = true;

                for (let i = 0; i < this.size; i += 1) {
                    const $currentRow = $("<div class='row'>");
                    const row = [];
                    for (let j = 0; j < this.size; j += 1) {
                        const currentBox = createCurrentBox(i, j, colorToggle);
                        const figure = createFigure(i, j, colorToggle);
                        if (figure) {
                            row.push(figure);
                            figure.render(currentBox.$elem); // render the figure inside the box element
                        }

                        currentBox.render($currentRow);
                        colorToggle = !colorToggle;
                    }

                    this.state[`row-${i}`] = row;
                    this.$elem.append($currentRow);
                    colorToggle = !colorToggle;
                }

                $where.append(this.$elem);
            }
        };

        return Board;
    }
);
