import Event from "./Event.js";

class ChessView {
    constructor() {
        this.startEvent = new Event();
        this.restartEvent = new Event();
        this.cellClickedEvent = new Event();
    }

    render(where) {
        const board = this._createBoard();

        const wrapper = document.getElementById(where);
        wrapper.appendChild(board);
        wrapper.appendChild(this._createGameControlls());
    }

    _createBoard() {
        const board = document.createElement("div");

        this.cells = Array(8)
            .fill()
            .map((_, rowIdx) => {
                const row = document.createElement("div");
                row.className = "row";

                const rowCells = Array(8)
                    .fill()
                    .map((_, colIdx) => {
                        const cell = document.createElement("div");
                        cell.className = "box";

                        cell.addEventListener("click", (e) => {
                            this.cellClickedEvent.trigger({
                                y: rowIdx,
                                x: colIdx
                            });
                        });

                        let defaultColor = "white";
                        let secondaryColor = "black";

                        if (rowIdx % 2 !== 0) {
                            defaultColor = "black";
                            secondaryColor = "white";
                        }

                        if (colIdx % 2 === 0) {
                            cell.classList.add(defaultColor);
                        } else {
                            cell.classList.add(secondaryColor);
                        }

                        row.appendChild(cell);

                        return cell;
                    });

                board.appendChild(row);

                return rowCells;
            });

        return board;
    }

    _createGameControlls() {
        function createStartButton() {
            const startButton = document.createElement("button");
            startButton.textContent = "Start";
            startButton.addEventListener("click", () => {
                this.startEvent.trigger();
            });
            return startButton;
        }

        function createRestartButton() {
            const restartButton = document.createElement("button");
            restartButton.textContent = "Restart";
            restartButton.addEventListener("click", () => {
                this.restartEvent.trigger();
                this.cells.forEach((row) => {
                    row.forEach((col) => {
                        while (col.lastElementChild) {
                            col.removeChild(col.lastElementChild);
                        }
                    });
                });
            });
            return restartButton;
        }

        const controlls = document.createElement("div");

        controlls.appendChild(createStartButton.call(this));
        controlls.appendChild(createRestartButton.call(this));
        return controlls;
    }

    renderFigures(data) {
        data.forEach((row, rowIdx) => {
            row.forEach((col, colIdx) => {
                if (col) {
                    const figureWrapper = this.renderFigure(col);
                    this.cells[rowIdx][colIdx].appendChild(figureWrapper);
                }
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    renderFigure(figure) {
        const figureWrapper = document.createElement("div");
        figureWrapper.className = "figure-wrapper";

        const figureImage = document.createElement("img");
        figureImage.src = figure.image;
        figureImage.classList.add("figure");
        figureImage.classList.add(figure.name);

        figureWrapper.appendChild(figureImage);
        return figureWrapper;
    }

    showPossibleMoves(oldMoves, newMoves) {
        this.emptyCells(oldMoves);

        newMoves.forEach((move) => {
            const playCircle = document.createElement("div");
            playCircle.classList.add("play");
            this.cells[move.y][move.x].appendChild(playCircle);
        });
    }

    emptyCells(cellPositions) {
        cellPositions.forEach((cellPosition) => {
            const cell = this.cells[cellPosition.y][cellPosition.x];
            cell.removeChild(cell.firstChild);
        });
    }

    moveFigure(figure, oldPosition) {
        this.emptyCells(oldPosition);
        const renderedFigure = this.renderFigure(figure);
        this.cells[figure.y][figure.x].appendChild(renderedFigure);
    }
}

export default ChessView;
