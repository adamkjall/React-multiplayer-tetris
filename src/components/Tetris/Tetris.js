import React, { useState, useEffect } from "react";

import { createStage, checkCollision } from "../../gameHelpers";

// Custom hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useInterval } from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";

// Components
import Stage from "../Stage/Stage";
import Display from "../Display/Display";
import StartButton from "../StartButton/StartButton";
import Highscore from "../Highscore/Highscore";
import HighscoreModal from "../HighscoreModal/HighscoreModal";

// Styled components
import { StyledTetrisWrapper, StyledTetris } from "./Tetris.styles";

const Tetris = () => {
  const startSpeed = 600;
  const [gameSpeed, setGameSpeed] = useState(startSpeed);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [highscoreArr, setHighscoreArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [speedDrop, setSpeedDrop] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(gameSpeed);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };
  
  const dropPlayer = () => {
    
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 5) {
      setLevel(prev => prev + 1);
      // also increase speed
      setGameSpeed(startSpeed / (level + 1) + 100);
      setDropTime(gameSpeed);
    }
    
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      updatePlayerPos({ x: 0, y: 0, collided: true });

      // Game over
      if (player.pos.y < 1) {
        console.log("Game over");
        setGameOver(true);
        setDropTime(null); 
        
        if(highscoreArr.length < 5 || highscoreArr.slice(0, 5).find(highscore => score > highscore.score)) {
          setShowModal(true);
        }
      }
    }
  };

  const keyUp = e => {
    e.preventDefault();
    if (!gameOver) {
      if (e.keyCode === 32) {
        setSpeedDrop(false);
        setDropTime(gameSpeed)
      }
    }
  };

  const movePlayerHorizontal = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };
  
  const move = e => {
    e.preventDefault();
    if (!gameOver) {
      if (e.keyCode === 37) {
        movePlayerHorizontal(-1);
      } else if (e.keyCode === 39) {
        movePlayerHorizontal(1);
      } else if (e.keyCode === 32 && !speedDrop) {
        setSpeedDrop(true);
        setDropTime(startSpeed * 0.08)
      } else if (e.keyCode === 38) {
        playerRotate(stage, 1);
      } else if (e.keyCode === 40) {
        playerRotate(stage, -1);
      }
    }
  };
  
  useInterval(() => {
    drop();
  }, dropTime);

  useEffect(() => {
    setHighscoreArr(JSON.parse(localStorage.getItem("highscore")) || []);
  }, [])

  const onSubmitHighscore = name => {
    setShowModal(false);
    const highscoreItem = {name, score};
    const newHighscoreArr = [...highscoreArr, highscoreItem];
    newHighscoreArr.sort((a, b) => b.score - a.score);
    newHighscoreArr.pop();
    setHighscoreArr(newHighscoreArr);

    localStorage.setItem("highscore", JSON.stringify(newHighscoreArr));
  }

  // console.log("re-render");
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={move}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <aside>
          <Highscore highscoreArray={highscoreArr} gameOver={gameOver} />
        </aside>
        <Stage stage={stage} gameOver={gameOver} />
        {showModal ? <HighscoreModal submitName={onSubmitHighscore} /> : null}
        <aside>
          {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <React.Fragment>
              <Display text={"Score: " + score} />
              <Display text={"Rows: " + rows} />
              <Display text={"Level: " + level} />
            </React.Fragment>
          )}
          <StartButton clickHandle={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
