import React from "react";
import styles from "./styles.module.css";
import Figure from "../figure/Figure";
import PlayBox from "../play/Play";

class Box extends React.Component {
  render() {
    const { isWhite, figure, play, handleFigureClick, handlePlayClick } =
      this.props;
    const boxColor = isWhite ? styles.white : styles.black;
    let childElement = null;

    if (play) {
      childElement = <PlayBox handlePlayClick={handlePlayClick} />;
    } else if (figure) {
      childElement = (
        <Figure name={figure} handleFigureClick={handleFigureClick} />
      );
    }
    return (
      <div className={[styles.box, boxColor].join(" ")}>{childElement}</div>
    );
  }
}

export default Box;
