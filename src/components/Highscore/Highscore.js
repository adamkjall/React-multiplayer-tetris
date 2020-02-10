import React from "react";

import { StyledHighscore, PlayerScore } from "./Highscore.styles";

const highscoreArr = [
  {
    name: "Adam",
    score: 900
  },
  {
    name: "Åsa",
    score: 999
  },
  {
    name: "Åsa",
    score: 999
  },
  {
    name: "Åsa",
    score: 999
  },
  {
    name: "Åsa",
    score: 999
  },
  {
    name: "Åsa",
    score: 999
  }
];

const Highscore = () => {
  return (
    <StyledHighscore>
      <div className="title">Highscore:</div>
      {highscoreArr.slice(0,5).map(highscore => (
        <PlayerScore>
          <span className="name">{highscore.name}</span>
          <span className="score">{highscore.score}</span>
        </PlayerScore>
      ))}
    </StyledHighscore>
  );
};

export default Highscore;
