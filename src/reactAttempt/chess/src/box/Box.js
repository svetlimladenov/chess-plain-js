import React from "react";
import styles from "./styles.module.css";
import Pawn from "../pawn/Pawn";

class Box extends React.Component {
  render() {
    const { isWhite, figure } = this.props;
    const boxColor = isWhite ? styles.white : styles.black;
    let figureElement = null;
    if (figure === "PAWN_BLACK") {
      figureElement = <Pawn />;
    }
    return (
      <div className={[styles.box, boxColor].join(" ")}>{figureElement}</div>
    );
  }
}

export default Box;
