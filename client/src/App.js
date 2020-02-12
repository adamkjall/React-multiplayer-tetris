import React from "react";

import TetrisManager from "./components/TetrisManager/TetrisManager";
import Stars from "./components/Stars/Stars";

import "./App.css";

const App = () => {

  return (
    <div className="App">
      <Stars />
      <TetrisManager />
    </div>
  );
};

export default App;
