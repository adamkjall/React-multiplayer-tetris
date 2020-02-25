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
import NextTetrimino from "../NextTetrimino/NextTetrimino";

// Styled components
import { StyledTetrisWrapper, StyledTetris } from "./Tetris.styles";

const Tetris = ({
  isLocalPlayer,
  events,
  gameState,
  highscores,
  handleHighscore,
  nPlayers
}) => {
  const startSpeed = 700;
  const [gameSpeed, setGameSpeed] = useState(startSpeed);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [speedDrop, setSpeedDrop] = useState(false);
  const [
    player,
    updatePlayerPos,
    resetPlayer,
    playerRotate,
    nextTetromino
  ] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  useEffect(() => {
    if (!isLocalPlayer) {
      const stage = gameState.stage;
      if (stage) setStage(stage);
    }
  }, [gameState.stage, isLocalPlayer, setStage]);

  useEffect(() => {
    if (!isLocalPlayer) {
      if (gameState.gameOver !== undefined) setGameOver(gameState.gameOver);
      if (gameState.score !== undefined) setScore(gameState.score);
      if (gameState.rows !== undefined) setRows(gameState.rows);
      if (gameState.level !== undefined) setLevel(gameState.level);
    }
  }, [
    gameState.gameOver,
    gameState.score,
    gameState.rows,
    gameState.level,
    isLocalPlayer,
    setScore,
    setRows
  ]);

  useEffect(() => {
    // for every player that joins the session
    // broadcast our local state to all clients
    if (isLocalPlayer && nPlayers > 1) {
      const state = serializeGameState();
      events.emit("state", state);
    }
  }, [nPlayers, events, isLocalPlayer]);

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

  useInterval(() => {
    drop();
  }, dropTime);

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setGameSpeed(isLocalPlayer ? startSpeed : null);
    setDropTime(startSpeed);
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
    if (rows >= level * 5) {
      setLevel(prev => prev + 1);
      // also increase speed
      setGameSpeed(startSpeed / (level + 1) + 180);
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
        // check if player is eligable to submit to highscore
        if (
          highscores.length < 5 ||
          highscores.slice(0, 5).find(highscore => score > highscore.score)
        ) {
          setShowModal(true); // show highscore submit modal
        }
      }
    }
  };

  const keyUp = e => {
    e.preventDefault();
    if (!gameOver && isLocalPlayer)
      if (e.keyCode === 32) {
        setSpeedDrop(false);
        setDropTime(gameSpeed);
      }
  };

  const movePlayerHorizontal = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyDown = e => {
    if (gameOver || showModal) return;

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
    if (newHighscoreArr.length > 5) newHighscoreArr.pop();

    handleHighscore(newHighscoreArr);
  };

  function serializeGameState() {
    return { stage, gameOver, score, rows, level };
  }

  // console.log("re-render");
  // console.log("state: ", serialize())
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={keyDown}
      onKeyUp={keyUp}
      nPlayers={nPlayers}
    >
      <StyledTetris>
        <aside className="next-tetrimino">
          {isLocalPlayer ? (
            <>
              <NextTetrimino tetrimino={nextTetromino} />
              <Highscore highscoreArray={highscores} gameOver={gameOver} />
            </>
          ) : null}
        </aside>
        <Stage
          className="stage"
          stage={stage}
          gameOver={gameOver}
          isLocalPlayer={isLocalPlayer}
        />
        {showModal ? <HighscoreModal submitName={onSubmitHighscore} /> : null}
        <aside className="information">
          <>
            {gameOver ? <Display gameOver={gameOver} text="Game Over" /> : null}
            <Display text={"Score"} value={score} />
            <Display text={"Rows"} value={rows} />
            <Display text={"Level"} value={level} />
            {isLocalPlayer ? (
              <StartButton clickHandle={!showModal ? startGame : null} />
            ) : null}
          </>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
