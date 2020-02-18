import React from "react";

import Cell from "../Cell/Cell";

import { StyledStage } from "./Stage.styles";

const Stage = ({ stage, gameOver, isLocalPlayer }) => (
  <StyledStage width={stage[0].length} height={stage.length} gameOver={gameOver} whiteBorder={isLocalPlayer}>
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);

export default React.memo(Stage);
