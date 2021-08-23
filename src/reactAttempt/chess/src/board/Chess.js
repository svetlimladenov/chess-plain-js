import React from "react";
import styles from "./styles.module.css";
import Controls from "../controls/Controls";
import Box from "../box/Box";

class Chess extends React.Component {
  constructor() {
    super();
    this.state = {
      isStarted: false,
      board: Array(64).fill(null),
      message: "Click start to start new game"
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
        <h2>{this.state.message}</h2>
      </div>
    );
  }

  renderBoard() {
    const { board } = this.state;
    let isWhite = true;
    let index = 0;

    const renderedBoard = [];
    for (let rowIdx = 0; rowIdx < 8; rowIdx += 1) {
      const rowBoxes = [];
      for (let colIdx = 0; colIdx < 8; colIdx += 1) {
        rowBoxes.push(
          <Box key={index} figure={board[index]} isWhite={isWhite} />
        );
        index += 1;
        isWhite = !isWhite;
      }
      isWhite = !isWhite;
      const row = <div className={styles.row}>{rowBoxes}</div>;
      renderedBoard.push(row);
    }
    return renderedBoard;
  }

  handleStart() {
    this.setState((state) => {
      const { board, isStarted } = state;
      if (isStarted) {
        return {
          message:
            "Game already started, click reset if you want to start new game"
        };
      }

      const startedBoard = board.map((box, idx) => {
        if (idx >= 8 && idx <= 15) {
          return "PAWN_BLACK";
        }
        return box;
      });

      return {
        isStarted: true,
        board: startedBoard,
        message: "Game Started"
      };
    });
  }

  handleReset() {
    this.setState({
      board: Array(8).fill(null),
      isStarted: false,
      message: "Click start to start new game"
    });
  }
}

export default Chess;
