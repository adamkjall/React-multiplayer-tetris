import socketIOClient from "socket.io-client";
class ConnectionManager {
  constructor(tetrisManager) {
    this.conn = null;
    this.peers = new Map();
    this.tetrisManager = tetrisManager;
  }

  connect(address) {
    this.conn = socketIOClient(address);
    this.conn.on("connect", () => {
      console.log("Connection established");

      this.initSession();
      this.watchEvents();
    });

    this.conn.on("message", data => {
      this.recieve(data);
    });
  }

  initSession() {
    const sessionId = window.location.hash.split("#")[1];
    if (sessionId) {
      this.send({
        type: "join-session",
        id: sessionId
      });
    } else {
      this.send({
        type: "create-session"
      });
    }
  }

  watchEvents() {
    const localPlayer = this.tetrisManager.state.players.get("localPlayer");
    const events = localPlayer.events;
    ["player", "stage", "level", "rows", "score", "gameOver"].forEach(prop => {
      events.listen(prop, value => {
        this.send({
          type: "state-update",
          state: [prop, value]
        });
      });
    });
    events.listen("highscore", highscore => {
      this.send({
        type: "update-highscore",
        list: highscore
      });
    });
    events.listen("state", state => {
      this.send({
        type: "state-broadcast",
        state
      });
    });
  }

  updateManager(peers) {
    const me = peers.you;
    const clients = peers.clients.filter(client => me !== client);
    clients.forEach(client => {
      if (!this.peers.has(client)) {
        this.tetrisManager.createPlayer(client);
        this.peers.set(client, client);
      }
    });

    this.peers.forEach(client => {
      if (clients.findIndex(id => id === client) === -1) {
        console.log("Remove ", client);
        this.tetrisManager.removePlayer(client);
      }
    });

    const sorted = peers.clients.map(client => this.peers.get(client.id))
    this.tetrisManager.sortPlayers(sorted);
  }

  updatePeer(id, [prop, value]) {
    if (!this.peers.has(id)) {
      console.error("Client does not exist ", id);
      return;
    }
    this.tetrisManager.updateTetrisState(id, { prop, value });
  }

  send(data) {
    const msg = JSON.stringify(data);
    // console.log(`Sending message: ${msg}`);
    this.conn.send(msg);
  }

  recieve(msg) {
    const data = JSON.parse(msg);
    // console.log("Recieved message: ", data);
    if (data.type === "session-created") {
      window.location.hash = data.id;
    } else if (data.type === "session-broadcast") {
      this.updateManager(data.peers);
    } else if (data.type === "state-update") {
      this.updatePeer(data.clientId, data.state);
    } else if (data.type === "state-broadcast") {
      // update entire state
      Object.entries(data.state).forEach(entry => {
        this.updatePeer(data.clientId, entry);
      });
    } else if (data.type === "highscore-list") {
      this.tetrisManager.setHighscore(data.list);
    }
  }
}

export default ConnectionManager;
