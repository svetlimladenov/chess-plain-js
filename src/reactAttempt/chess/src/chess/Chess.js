import React from "react";
import styles from "./styles.module.css";
import Controls from "../controls/Controls";
import Box from "../box/Box";
import figuresData from "../figure/figuresData";
import { generateStartBoard, generateEmptyBoard } from "./chess-services";

class Chess extends React.Component {
  constructor() {
    super();
    this.state = {
      isStarted: false,
      board: generateEmptyBoard(),
      availablePlayPositions: [],
      clickedFigure: null,
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
    const { board, availablePlayPositions } = this.state;
    let isWhite = true;
    let index = 0;

    const renderedBoard = [];
    for (let rowIdx = 0; rowIdx < 8; rowIdx += 1) {
      const boxes = [];
      for (let colIdx = 0; colIdx < 8; colIdx += 1) {
        let currentPlay = getCurrentPlay(availablePlayPositions, index);

        boxes.push(
          <Box
            key={index}
            figure={board[index]}
            play={currentPlay}
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
      const availablePlayPositions = state.board.reduce((acc, curr, idx) => {
        if (figure === figuresData.PAWN_BLACK.name && index + 8 === idx) {
          acc.push(idx);
        }

        return acc;
      }, []);

      return {
        clickedFigure: {
          name: figure,
          index: index
        },
        availablePlayPositions: availablePlayPositions
      };
    });
  }

  handlePlayClick(index) {
    this.setState((state) => {
      const updatedBoard = state.board.map((box, idx) => {
        if (idx === state.clickedFigure.index) {
          return null;
        }
        if (idx === index) {
          return state.clickedFigure.name;
        }

        return box;
      });

      return {
        board: updatedBoard,
        availablePlayPositions: []
      };
    });
  }

  handleStart() {
    this.setState((state) => {
      if (state.isStarted) {
        return {
          message:
            "Game already started, click reset if you want to start new game"
        };
      }

      return {
        isStarted: true,
        board: generateStartBoard(),
        message: "Game Started"
      };
    });
  }

  handleReset() {
    this.setState({
      board: generateEmptyBoard(),
      isStarted: false,
      message: "Click start to start new game"
    });
  }
}

function getCurrentPlay(availablePlayPositions, position) {
  const currentPlayIndex = availablePlayPositions.indexOf(position);
  let currentPlay = null;
  if (currentPlayIndex >= 0) {
    currentPlay = availablePlayPositions[currentPlayIndex];
  }
  return currentPlay;
}

export default Chess;
