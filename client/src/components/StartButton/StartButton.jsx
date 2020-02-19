import React from "react";

import { StyledStartButton } from "./StartButton.styles";

const StartButton = ({ clickHandle }) => (
  <StyledStartButton onClick={clickHandle}>Start Game</StyledStartButton>
);

export default React.memo(StartButton);
