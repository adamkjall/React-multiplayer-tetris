import React, { useState, useEffect } from "react";

import { createStage, checkCollision } from "../../utils/gameHelpers";

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

const Tetris = ({ isLocalPlayer, events, gameState, highscores, handleHighscore }) => {
  const startSpeed = 700;
  const [gameSpeed, setGameSpeed] = useState(startSpeed);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [speedDrop, setSpeedDrop] = useState(false);
  const [
    player,
    setPlayer,
    updatePlayerPos,
    resetPlayer,
    playerRotate
  ] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  useEffect(() => {
    if (!isLocalPlayer) {
      const player = gameState.player;
      if (player) {
        setPlayer(player);
      }
    }
  }, [gameState.player]);

  useEffect(() => {
    if (!isLocalPlayer) {
      const stage = gameState.stage;
      if (stage) {
        setStage(stage);
      }
    }
  }, [gameState.stage]);

  useEffect(() => {
    if (!isLocalPlayer) {
      const gameOver = gameState.gameOver;
      if (gameOver !== undefined) {
        setGameOver(gameOver);
      }
    }
  }, [gameState.gameOver]);

  
  useEffect(() => {
    if (!isLocalPlayer) {
      const level = gameState.level;
      if (level !== undefined) {
        setLevel(level);
      }
    }
  }, [gameState.level]);

  useEffect(() => {
    events.emit("score", score);
  }, [events, score]);

  useEffect(() => {
    events.emit("rows", rows);
  }, [events, rows]);

  useEffect(() => {
    events.emit("level", level);
  }, [events, level]);

  useEffect(() => {
    events.emit("gameOver", gameOver);
  }, [events, gameOver]);

  useEffect(() => {
    events.emit("player", player);
  }, [events, player]);

  useEffect(() => {
    events.emit("stage", stage);
  }, [events, stage]);

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setGameSpeed(isLocalPlayer ? startSpeed : null)
    setDropTime(gameSpeed);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
  };

  const dropPlayer = () => {
    setSpeedDrop(true);
    setDropTime(startSpeed * 0.08);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 5) {
      setLevel(prev => prev + 1);
      // also increase speed
      setGameSpeed(startSpeed / (level + 1) + 150);
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

        if (
          highscores.length < 5 ||
          highscores.slice(0, 5).find(highscore => score > highscore.score)
        ) {
          setShowModal(true);
        }
      }
    }
  };

  const keyUp = e => {
    if (gameOver) return;
    e.preventDefault();
    if (isLocalPlayer && !gameOver) {
      if (e.keyCode === 32) {
        setSpeedDrop(false);
        setDropTime(gameSpeed);
      }
    }
  };

  const movePlayerHorizontal = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const move = e => {
    if (gameOver) return;

    e.preventDefault();
    if (isLocalPlayer && !gameOver) {
      if (e.keyCode === 37) {
        movePlayerHorizontal(-1);
      } else if (e.keyCode === 39) {
        movePlayerHorizontal(1);
      } else if (e.keyCode === 32 && !speedDrop) {
        dropPlayer();
      } else if (e.keyCode === 38) {
        playerRotate(stage, 1);
      } else if (e.keyCode === 40) {
        playerRotate(stage, -1);
      }
    }
  };

  const onSubmitHighscore = name => {
    setShowModal(false);
    const highscoreItem = { name, score };
    const newHighscoreArr = [...highscores, highscoreItem];
    newHighscoreArr.sort((a, b) => b.score - a.score);
    if(newHighscoreArr.length > 5) newHighscoreArr.pop();
    
    handleHighscore(newHighscoreArr)
  };

  useInterval(() => {
    drop();
  }, dropTime);
  // console.log("re-render");
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={move}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage
          stage={stage}
          gameOver={gameOver}
          isLocalPlayer={isLocalPlayer}
        />
        {showModal ? <HighscoreModal submitName={onSubmitHighscore} /> : null}
        <aside>
          <React.Fragment>
            {gameOver ? <Display gameOver={gameOver} text="Game Over" /> : null}
            <Display text={"Score: " + score} />
            <Display text={"Rows: " + rows} />
            <Display text={"Level: " + level} />

            {isLocalPlayer ? (
              <React.Fragment>
                <StartButton clickHandle={!showModal ? startGame : null} />
                <Highscore highscoreArray={highscores} gameOver={gameOver} />
              </React.Fragment>
            ) : null}
          </React.Fragment>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
