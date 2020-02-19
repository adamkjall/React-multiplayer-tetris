import React from "react";

import { StyledDisplay } from "./Display.styles";

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default React.memo(Display);
