import React, { Component, Fragment } from "react";

class Controls extends Component {
  render() {
    return (
      <Fragment>
        <button onClick={this.props.handleStart}>Start</button>
        <button onClick={this.props.handleReset}>Reset</button>
      </Fragment>
    );
  }
}

export default Controls;
