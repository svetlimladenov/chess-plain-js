import React from "react";
import styles from "./styles.module.css";
import Figure from "../figure/Figure";
import Play from "../play/Play";

class Box extends React.Component {
  render() {
    const { isWhite, boxItem, handleFigureClick, handlePlayClick } = this.props;
    const boxColor = isWhite ? styles.white : styles.black;
    let childElement = null;

    if (boxItem === "PLAY") {
      childElement = <Play handlePlayClick={handlePlayClick} />;
    } else if (boxItem) {
      childElement = (
        <Figure name={boxItem} handleFigureClick={handleFigureClick} />
      );
    }
    return (
      <div className={[styles.box, boxColor].join(" ")}>{childElement}</div>
    );
  }
}

export default Box;
