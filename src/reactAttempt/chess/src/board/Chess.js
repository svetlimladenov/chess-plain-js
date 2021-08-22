import React from "react";
import styles from "./styles.module.css";
import Controls from "../controls/Controls";
import Box from "../box/Box";

class Chess extends React.Component {
  constructor() {
    super();
    this.state = {
      isStarted: false,
      board: Array(8).fill(Array(8).fill(null))
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
        <Controls
          handleStart={this.handleStart}
          handleReset={this.handleReset}
        />
      </div>
    );
  }

  renderBoard() {
    let isWhite = true;
    return this.state.board.map((row, rowIdx) => {
      const boxes = row.map((col, colIdx) => {
        isWhite = !isWhite;
        return <Box key={colIdx} figure={col} isWhite={isWhite} />;
      });
      isWhite = !isWhite;
      return (
        <div key={rowIdx} className={styles.row}>
          {boxes}
        </div>
      );
    });
  }

  handleStart() {
    this.setState((state) => {
      const { board, isStarted } = state;
      if (isStarted) {
        alert("Game already started");
        return state;
      }

      const startedBoard = board.map((row, rowIdx) => {
        return row.map((col, colIdx) => {
          if (rowIdx === 1) {
            return "PAWN_BLACK";
          }
          return col;
        });
      });

      return {
        isStarted: true,
        board: startedBoard
      };
    });
  }

  handleReset() {
    this.setState({
      board: Array(8).fill(Array(8).fill(null)),
      isStarted: false
    });
  }
}

export default Chess;
