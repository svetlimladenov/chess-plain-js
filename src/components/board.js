require.register(
    "Board",
    ["$", "State", "ChessBox", "Figures"],
    ($, State, ChessBox, { Pawn, Rook }) => {
        function createCurrentBox(x, y, colorToggle) {
            const currentBox = Object.create(ChessBox);
            currentBox.init(x, y, colorToggle ? "white" : "black"); // the OLOO approach
            return currentBox;
        }

        function createFigure(x, y, colorToggle) {
            if (x === 1) {
                return new Pawn(x, y);
            }

            if (x === 0 && (y === 0 || y === 7)) {
                return new Rook(x, y);
            }

            return null;
        }

        function createBoard() {
            const board = {};
            let colorToggle = true;
            for (let i = 0; i < this.size; i += 1) {
                const row = [];
                for (let j = 0; j < this.size; j += 1) {
                    const currentBox = createCurrentBox(i, j, colorToggle);
                    const figure = createFigure(i, j, colorToggle);
                    if (figure) {
                        currentBox.figure = figure;
                    }
                    row.push(currentBox);
                    colorToggle = !colorToggle;
                }

                board[`row-${i}`] = row;
                colorToggle = !colorToggle;
            }
            State.board = board;
            return board;
        }

        function attachRerenderHandler() {
            document.addEventListener("rerenderBoard", (event) => {
                console.log(event.detail.board);
                console.log("rerendering!");
                Object.keys(this.board).forEach((row) => {
                    this.board[row].forEach((box) => {
                        box.$element.unbind();
                    });
                });
                this.board = event.detail.board;
                this.render(this.$parentElement);
            });
        }

        const Board = {
            init(size, elementId) {
                this.size = size;
                this.elementId = elementId;
                this.board = createBoard.call(this);
                this.$element = $(`<div id=${this.elementId}>`);
                this.$parentElement = null;
                attachRerenderHandler.call(this);
            },
            render($parentElement) {
                this.$parentElement = $parentElement;

                Object.keys(this.board).forEach((row) => {
                    const $currentRow = $("<div class='row'>");
                    this.board[row].forEach((box) => {
                        box.render($currentRow);
                    });
                    this.$element.append($currentRow);
                });

                $parentElement.append(this.$element);
            }
        };

        return Board;
    }
);
