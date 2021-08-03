require.register(
    "Board",
    ["$", "State", "ObjectComponent", "ChessBox", "Figures", "FigureColors"],
    ($, State, ObjectComponent, ChessBox, Figures, FigureColors) => {
        // inside this arrow function, 'this' will be bound to the windows object (lexical scope),
        // so if we create other arrow functions in here, their 'this' will also be bound to the windows object

        function createCurrentBox(x, y, colorToggle) {
            const currentBox = Object.create(ChessBox); // currentBox is an empty object, with [[Prototype]] - ChessBox - [[Prototype]] - ObjectComponent
            currentBox.setup(x, y, colorToggle ? "white" : "black"); // the OLOO approach
            return currentBox;
        }

        function createFigure(x, y) {
            if (x === 1) {
                return new Figures.Pawn(x, y, FigureColors.BLACK);
            }

            if (x === 0 && (y === 0 || y === 7)) {
                return new Figures.Rook(x, y, FigureColors.BLACK);
            }

            if (x === 0 && (y === 2 || y === 5)) {
                return new Figures.Bishop(x, y, FigureColors.BLACK);
            }

            if (x === 0 && (y === 1 || y === 6)) {
                return new Figures.Knight(x, y, FigureColors.BLACK);
            }

            if (x === 6) {
                return new Figures.Pawn(x, y, FigureColors.WHITE);
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
                    const figure = createFigure(i, j);
                    if (figure) {
                        currentBox.setFigure(figure);
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

        const Board = Object.create(ObjectComponent);

        Board.setup = function setup(size, elementId) {
            this.size = size;
            this.elementId = elementId;
            this.board = createBoard.call(this);
            this.setElement($(`<div id=${this.elementId}>`));
        };

        function createFilesRow() {
            const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
            const filesRow = $("<div class='row'>");
            filesRow.append($("<div class='files-prefix-box'>"));
            files.forEach((file) => {
                filesRow.append($(`<div class="box">${file}</div>`));
            });
            return filesRow;
        }

        Board.build = function build($parentElement) {
            Object.keys(this.board).forEach((row, idx) => {
                const $currentRow = $("<div class='row'>");
                $currentRow.append(
                    $(`<div class='x-numbers'>${this.size - idx}</div>`)
                );
                this.board[row].forEach((box) => {
                    box.build($currentRow);
                });
                this.$element.append($currentRow);
            });

            const filesRow = createFilesRow();

            this.$element.append(filesRow);
            this.render($parentElement);
        };

        return Board;
    }
);
