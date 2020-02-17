import React from "react";

import Tetris from "../Tetris/Tetris";

import ConnectionManager from "../../utils/ConnectionManager";
import Events from "../../utils/Events";

import { StyledTetrisManager } from "./TetrisManager.styles";

class TetrisManager extends React.Component {
  constructor() {
    super();
    this.state = {
      players: new Map(),
      highscores: []
    };
  }

  componentDidMount() {
    this.createPlayer();
    this.connectionManager = new ConnectionManager(this);
    this.connectionManager.connect("ws://192.168.157.107:8080");
  }

  setHighscore = newHighscore => this.setState({ highscores: newHighscore });

  onSubmitHighscore = newHighscoreArr => {
    this.connectionManager.send({
      type: "update-highscore",
      list: newHighscoreArr
    });
  };

  sendDataToServer = data => {
    if (this.connectionManager) {
      this.connectionManager.send(data);
    }
  };

  createPlayer = (playerId = "localPlayer") => {
    const events = new Events();
    const isLocalPlayer = this.state.players.size === 0 ? true : false;
    const gameState = {};

    this.setState(prev =>
      prev.players.set(playerId, { events, isLocalPlayer, gameState })
    );
  };

  removePlayer = id => {
    this.setState(prev => prev.players.delete(id));
  };

  updateTetrisState = (id, newState) => {
    const player = this.state.players.get(id);
    player.gameState = {
      ...player.gameState,
      [newState.prop]: newState.value
    };
    this.setState(prev => prev.players.set(id, player));
  };

  render() {
    return (
      <StyledTetrisManager>
        {[...this.state.players.entries()].map(
          ([playerId, { events, isLocalPlayer, gameState }]) => (
            <Tetris
              key={playerId}
              events={events}
              isLocalPlayer={isLocalPlayer}
              gameState={gameState}
              highscores={this.state.highscores}
              handleHighscore={this.onSubmitHighscore}
            />
          )
        )}
      </StyledTetrisManager>
    );
  }
}

export default TetrisManager;
