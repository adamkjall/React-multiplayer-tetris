import { useState, useCallback } from "react";

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
  const initialState = {
    pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  }

  const [player, setPlayer] = useState(initialState);

  const rotate = (tetromino, dir) => {
    // Make the rows to become cols (transpose)
    const rotatedTetro = tetromino.map((row, i) => row.map(col => col[i]))
  }

  const playerRotate = (stage, dir) => {
    
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      ...initialState,
      tetromino: randomTetromino().shape
    });
  }, [initialState])

  return [player, updatePlayerPos, resetPlayer];
};
