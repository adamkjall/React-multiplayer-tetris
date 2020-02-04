import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const initialState = {
    pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  };

  const [player, setPlayer] = useState(initialState);

  const rotate = (tetromino, dir) => {
    // Make the rows to become cols (transpose)
    const transposedTetro = tetromino.map((_, index) =>
      tetromino.map(col => col[index])
    );
    // Reverse each row to get a rotaded matrix
    let rotadedTetro;
    if (dir > 0) rotadedTetro = transposedTetro.map(row => row.reverse());
    else rotadedTetro = transposedTetro.reverse();

    return rotadedTetro;
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x += x, y: prev.pos.y += y },
      collided
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      ...initialState,
      tetromino: randomTetromino().shape
    });
  }, [initialState]);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
