import React from "react";
import styles from "./styles.module.css";
import Box from "../box/Box";

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
        isWhite = !isWhite;
        return <Box key={colIdx} isWhite={isWhite} />;
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
