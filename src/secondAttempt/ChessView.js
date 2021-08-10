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

    appendFigures(data) {
        data.forEach((row, rowIdx) => {
            row.forEach((col, colIdx) => {
                if (col) {
                    const figureWrapper = document.createElement("div");
                    figureWrapper.className = "figure-wrapper";

                    const figureImage = document.createElement("img");
                    figureImage.src = col.image;
                    figureImage.classList.add("figure");
                    figureImage.classList.add(col.name);

                    figureWrapper.appendChild(figureImage);

                    this.cells[rowIdx][colIdx].appendChild(figureWrapper);
                }
            });
        });
    }

    showPossibleMoves(data) {
        console.log(this.cells[data.x][data.y]);
        console.log(data);
    }
}

export default ChessView;
