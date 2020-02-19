import React from "react";

import { StyledStartMenu } from "./StartMenu.styles";

const StartMenu = () => (
  <StyledStartMenu>
    <h1>React Tetris</h1>
    <h3>Choose tetris mode!</h3>
    <span>Singleplayer</span>
    <span>Multiplayer</span>
  </StyledStartMenu>
);

export default StartMenu;
