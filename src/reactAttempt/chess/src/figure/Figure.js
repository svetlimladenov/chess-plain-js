import React from "react";
import styles from "./styles.module.css";
import pawn from "./pawn-black.png";

class Figure extends React.Component {
  render() {
    return (
      <div className={styles["figure-wrapper"]}>
        <img src={pawn} alt="pawn" className={styles.figure} />
      </div>
    );
  }
}

//TODO: when adding other figures consider using a Higher Order Component to reuse similar logic
export default Figure;
