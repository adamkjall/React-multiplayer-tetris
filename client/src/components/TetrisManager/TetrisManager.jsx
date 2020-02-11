import React, { useState, useEffect } from "react";

import Tetris from "../Tetris/Tetris";

const TetrisManager = props => {
  const [players, setPlayers] = useState([]);

  const createPlayer = (player = "Adam") => {
    setPlayers(prev => [...prev, player]);
  };

  const removePlayer = (playerIndex = players.length - 1) => {
    setPlayers(prev => prev.splice(playerIndex, 1));
  };

  useEffect(() => {
    createPlayer();
    createPlayer();
  }, []);

  return (
    <React.Fragment>
      {console.log("hello", players)}
      {players.map((player, i )=> (
        <Tetris key={i} isLocalTetris={i === 0 ? true : false} />
      ))}
    </React.Fragment>
  );
};

export default TetrisManager;
