import React, { Component } from "react";
import styles from "./styles.module.css";

class Controls extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <button onClick={this.props.handleStart} className={styles.startBtn}>
          Start
        </button>
        <button onClick={this.props.handleReset} className={styles.resetBtn}>
          Reset
        </button>
      </div>
    );
  }
}

export default Controls;
