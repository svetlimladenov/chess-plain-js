import React from "react";
import styles from "./styles.module.css";
import figuresData from "./figuresData";

class Figure extends React.Component {
  render() {
    const { name, handleFigureClick } = this.props;
    const figure = figuresData[name];
    return (
      <div onClick={handleFigureClick} className={styles["figure-wrapper"]}>
        <img src={figure.image} alt={figure.name} className={styles.figure} />
      </div>
    );
  }
}

//TODO: when adding other figures consider using a Higher Order Component to reuse similar logic
export default Figure;
