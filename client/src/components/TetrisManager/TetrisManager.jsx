import React from "react";

import Tetris from "../Tetris/Tetris";

import ConnectionManager from "../../utils/ConnectionManager";
import Events from "../../utils/Events";

import { StyledTetrisManager } from "./TetrisManager.styles";

class TetrisManager extends React.Component {
  constructor() {
    super();
    this.state = {
      players: new Map()
    };
  }

  componentDidMount() {
    this.createPlayer();
    const connectionManager = new ConnectionManager(this);
    connectionManager.connect("ws://192.168.1.4:9000");
  }

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
    }
    this.setState(prev => prev.players.set(id, player))
  }

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
            />
          )
        )}
      </StyledTetrisManager>
    );
  }
}

export default TetrisManager;
