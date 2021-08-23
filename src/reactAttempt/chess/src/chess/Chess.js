import React from "react";
import styles from "./styles.module.css";
import Controls from "../controls/Controls";
import Box from "../box/Box";
import figuresData from "../figure/figuresData";

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
    this.handleFigureClick = this.handleFigureClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
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
      const boxes = [];
      for (let colIdx = 0; colIdx < 8; colIdx += 1) {
        boxes.push(
          <Box
            key={index}
            boxItem={board[index]}
            isWhite={isWhite}
            handleFigureClick={this.handleFigureClick.bind(this, index)}
            handlePlayClick={this.handlePlayClick.bind(this, index)}
          />
        );
        index += 1;
        isWhite = !isWhite;
      }
      isWhite = !isWhite;
      renderedBoard.push(
        <div key={rowIdx} className={styles.row}>
          {boxes}
        </div>
      );
    }
    return renderedBoard;
  }

  handleFigureClick(index) {
    this.setState((state) => {
      const figure = state.board[index];
      const updatedBoard = state.board.map((box, idx) => {
        if (figure === figuresData.PAWN_BLACK.name && index + 8 === idx) {
          return "PLAY";
        }

        return box;
      });

      return {
        board: updatedBoard
      };
    });
  }

  handlePlayClick(index) {
    console.log(index);
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

      const updatedBoard = board.map((box, idx) => {
        if (idx >= 8 && idx <= 15) {
          return figuresData.PAWN_BLACK.name;
        }

        if (idx === 0 || idx === 7) {
          return figuresData.ROOK_BLACK.name;
        }

        return box;
      });

      return {
        isStarted: true,
        board: updatedBoard,
        message: "Game Started"
      };
    });
  }

  handleReset() {
    this.setState({
      board: Array(64).fill(null),
      isStarted: false,
      message: "Click start to start new game"
    });
  }
}

export default Chess;
