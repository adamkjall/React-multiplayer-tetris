import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../utils/tetrominos";
import { STAGE_WIDTH, checkCollision } from "../utils/gameHelpers";

const initialState = tetromino => ({
  pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
  tetromino,
  collided: false
});

export const usePlayer = () => {
  const tetromino = TETROMINOS[0].shape;
  const [nextTetromino, setNextTetromino] = useState(tetromino);
  const [player, setPlayer] = useState(initialState(tetromino));

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
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided
    }));
  };

  const resetPlayer = useCallback(() => {
    // if we start have to start tetromino we generate a random tetromino
    // otherwise we take the nextTetromino
    const newTetromino = nextTetromino.length < 2 ? randomTetromino().shape : nextTetromino; 
    setPlayer(initialState(newTetromino));
    setNextTetromino(randomTetromino().shape)
  }, [nextTetromino]);

  return [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino];
};
