import React from "react";

import { StyledDisplay } from "./Display.styles";

const Display = ({ gameOver, text, value }) => (
  <StyledDisplay gameOver={gameOver}>
    <div className="text">
      {text}
    </div>
    <div className="value">
      {value}
    </div>
  </StyledDisplay>
);

export default React.memo(Display);
