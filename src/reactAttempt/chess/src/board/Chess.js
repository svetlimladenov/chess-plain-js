import React from "react";
import styles from "./styles.module.css";

class Chess extends React.Component {
  constructor() {
    super();
    this.state = {
      board: Array(8).fill(Array(8).fill(null))
    };
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }

  renderBoard() {
    let isWhite = true;
    return this.state.board.map((row, rowIdx) => {
      const boxes = row.map((col, colIdx) => {
        const boxClasses = [styles.box];
        isWhite ? boxClasses.push(styles.white) : boxClasses.push(styles.black);
        isWhite = !isWhite;
        return <div key={colIdx} className={boxClasses.join(" ")}></div>;
      });
      isWhite = !isWhite;
      return (
        <div key={rowIdx} className={styles.row}>
          {boxes}
        </div>
      );
    });
  }
}

export default Chess;
