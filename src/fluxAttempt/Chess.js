/* eslint-disable class-methods-use-this */
import Button from "./Button.js";
import store from "./store.js";

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

                if (cur) {
                    // if there is a figure or play
                    cell.appendChild(cur.render());
                }

                acc.appendChild(cell);
                return acc;
            }, document.createElement("div"));

            row.className = "row";
            prev.appendChild(row);
            return prev;
        }, document.createElement("div"));

        const startButton = this._createStartButton();
        const restartButton = this._createRestartButton();

        const wrapper = document.createElement("div");

        wrapper.appendChild(board);
        wrapper.appendChild(startButton);
        wrapper.appendChild(restartButton);

        return wrapper;
    }

    _createStartButton() {
        const args = {
            title: "Start",
            onClick(e) {
                store.dispatch({
                    type: "GAME_START",
                    event: e
                });
            }
        };

        return new Button(args).render();
    }

    _createRestartButton() {
        const args = {
            title: "Reset",
            onClick(e) {
                store.dispatch({
                    type: "GAME_RESET",
                    event: e
                });
            }
        };

        return new Button(args).render();
    }
}

export default Chess;
