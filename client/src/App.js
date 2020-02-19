import React from "react";

import TetrisManager from "./components/TetrisManager/TetrisManager";
import Stars from "./components/Stars/Stars";


const App = () => {
  return (
    <React.Fragment>
      <Stars />
      <TetrisManager />
    </React.Fragment>
  );
};

export default App;
