import React from "react";

import Cell from "../Cell/Cell";

import {
  StyledNextTetrimino,
  StyledTitle,
  StyledWrapper
} from "./NextTetrimino.styles";

const NextTetrimino = ({ tetrimino }) => (
  <StyledWrapper>
    <StyledTitle>Next</StyledTitle>
    <StyledNextTetrimino width={tetrimino[0].length} height={tetrimino.length}>
      <div className="tetromino">
        {tetrimino.map(row =>
          row.map((cell, x) => <Cell key={x} type={cell} />)
        )}
      </div>
    </StyledNextTetrimino>
  </StyledWrapper>
);

export default NextTetrimino;
