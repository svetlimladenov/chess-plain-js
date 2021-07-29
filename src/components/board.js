require.register(
    "Board",
    ["$", "ChessBox", "Figures"],
    ($, ChessBox, Figures) => {
        function createCurrentBox(x, y, colorToggle) {
            const currentBox = Object.create(ChessBox);
            currentBox.init(x, y, colorToggle ? "white" : "black");

            if (x === 1) {
                const pawn = new Figures.Pawn(x, y);
                pawn.render(currentBox.$elem);
            } else if (x === 0 && (y === 0 || y === 7)) {
                const rook = new Figures.Rook(x, y);
                rook.render(currentBox.$elem);
            }

            return currentBox;
        }

        const Board = {
            init(size, elementId) {
                this.size = size;
                this.elementId = elementId;
                this.$elem = $(`<div id=${this.elementId}>`);
            },
            render($where) {
                let colorToggle = true;

                for (let i = 0; i < this.size; i += 1) {
                    const $currentRow = $("<div class='row'>");
                    for (let j = 0; j < this.size; j += 1) {
                        const currentBox = createCurrentBox(i, j, colorToggle);
                        currentBox.render($currentRow);
                        colorToggle = !colorToggle;
                    }
                    colorToggle = !colorToggle;
                    this.$elem.append($currentRow);
                }
                $where.append(this.$elem);
            }
        };

        return Board;
    }
);
