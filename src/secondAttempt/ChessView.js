class ChessView {
    // eslint-disable-next-line class-methods-use-this
    render(where) {
        const board = document.createElement("div");

        this.cells = Array(8)
            .fill()
            .map((_, rowIdx) => {
                const row = document.createElement("div");
                row.className = "row";

                const rowCells = Array(8)
                    .fill()
                    .map((_, idx) => {
                        const cell = document.createElement("div");
                        cell.className = "box";

                        let defaultColor = "white";
                        let secondaryColor = "black";

                        if (rowIdx % 2 !== 0) {
                            defaultColor = "black";
                            secondaryColor = "white";
                        }

                        if (idx % 2 === 0) {
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

        const parent = document.getElementById(where);
        parent.appendChild(board);

        console.log(this.cells);
    }
}

export default ChessView;
