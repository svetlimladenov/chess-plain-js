/* eslint-disable class-methods-use-this */
import store from "./store.js";
import Button from "./Button.js";
import createFigure from "./figures-creator.js";
import createPlay from "./plays-creator.js";

class Chess {
    constructor(props) {
        this.props = props;
    }

    render() {
        const board = this.props.board.reduce((prev, cur, rowIdx) => {
            const row = cur.reduce((acc, curCol, colIdx) => {
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

                if (curCol) {
                    if (curCol === "PLAY") {
                        const play = createPlay(rowIdx, colIdx);
                        cell.appendChild(play.render());
                    } else {
                        const figure = createFigure(rowIdx, colIdx, curCol);
                        cell.appendChild(figure.render());
                    }
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

        // added it just to show how we are what we typed, because of the DOM re-render
        const textArea = document.createElement("textarea");
        wrapper.appendChild(textArea);

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
