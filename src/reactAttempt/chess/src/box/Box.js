import React from "react";
import styles from "./styles.module.css";
import Figure from "../figure/Figure";

class Box extends React.Component {
  render() {
    const { isWhite, figure } = this.props;
    const boxColor = isWhite ? styles.white : styles.black;
    let figureElement = null;
    if (figure === "PAWN_BLACK") {
      figureElement = <Figure />;
    }
    return (
      <div className={[styles.box, boxColor].join(" ")}>{figureElement}</div>
    );
  }
}

export default Box;
