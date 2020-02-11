import React, { useEffect } from "react";

import TetrisManager from "./components/TetrisManager/TetrisManager";
import Stars from "./components/Stars/Stars";

import ConnectionManager from "./utils/ConnectionManager";

import "./App.css";

const App = () => {

  useEffect(() => {
    const connectionManager = new ConnectionManager();
    connectionManager.connect("ws://localhost:9000");
  }, [])

  return (
    <div className="App">
      <Stars />
      <TetrisManager />
    </div>
  );
};

export default App;
