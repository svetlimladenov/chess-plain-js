class Chess {
    constructor(props) {
        this.props = props;
    }

    render() {
        const board = this.props.board.reduce((prev, cur, rowIdx) => {
            const row = cur.reduce((acc, cur, colIdx) => {
                const cell = document.createElement("div");
                cell.className = "box";

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

                acc.appendChild(cell);
                return acc;
            }, document.createElement("div"));

            row.className = "row";
            prev.appendChild(row);
            return prev;
        }, document.createElement("div"));
        return board;
    }
}

export default Chess;
