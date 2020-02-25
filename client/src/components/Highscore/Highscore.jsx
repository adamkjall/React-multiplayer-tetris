import React from "react";

import { StyledHighscore, PlayerScore } from "./Highscore.styles";

const Highscore = ({ highscoreArray }) => {
  return (
    <StyledHighscore>
      <h4 className="title">Highscore</h4>
      {highscoreArray
        ? highscoreArray.sort((a, b) => b.score - a.score).map((highscore, i) => (
            <PlayerScore key={i}>
              <span className="name">{highscore.name}</span>
              <span className="score">{highscore.score}</span>
            </PlayerScore>
          ))
        : null}
    </StyledHighscore>
  );
};

export default React.memo(Highscore);
