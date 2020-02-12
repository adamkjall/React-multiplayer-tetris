import React from "react";

import { StyledHighscore, PlayerScore } from "./Highscore.styles";

const Highscore = ({ highscoreArray }) => {
  return (
    <StyledHighscore>
      <div className="title">Highscore</div>
      {highscoreArray.map((highscore, i) => (
        <PlayerScore key={i}>
          <span className="name">{highscore.name}</span>
          <span className="score">{highscore.score}</span>
        </PlayerScore>
      ))}
    </StyledHighscore>
  );
};

export default Highscore;
