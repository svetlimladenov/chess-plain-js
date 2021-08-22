import React, { Fragment } from "react";
import "./App.css";
import Chess from "./board/Chess";
import Controls from "./controls/Controls";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Chess />
        <Controls />
      </Fragment>
    );
  }
}

export default App;
