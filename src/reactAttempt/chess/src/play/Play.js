import React from "react";
import styles from "./styles.module.css";

class Play extends React.Component {
  render() {
    return (
      <div onClick={this.props.handlePlayClick} className={styles.play}></div>
    );
  }
}

export default Play;
