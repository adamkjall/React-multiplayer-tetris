const WebSocketServer = require("ws").Server;

const server = new WebSocketServer({ port: 9000 });

const sessions = new Map();

class Session {
  constructor(id) {
    this.id = id;
    this.clients = new Set();
  }

  join(client) {
    if (client.session) {
      throw new Error("Client already in session");
    }
    this.clients.add(client);
    client.session = this;
  }

  leave(client) {
    if (client.session !== this) {
      throw new Error("Client not in session");
    }
    this.clients.delete(client);
    client.session = null;
  }
}

class Client {
  constructor(conn) {
    this.conn = conn;
    this.session = null;
  }
}

function createId(len = 6, chars = "abcdefghjkmnopqrstwxyz0123456789") {
  let id = "";
  while (len--) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id;
}

server.on("connection", conn => {
  console.log("Connection established");
  const client = new Client(conn); 

  conn.on("message", msg => {
    console.log("Message recieved", msg);

    if (msg === "create-session") {
      const id = createId();
      const session = new Session(id);
      session.join(client);
      sessions.set(session.id, session);
      console.log(sessions);
    }
  });

  conn.on("close", () => {
    console.log("Connection closed");
    const session = client.session;
    if (session) {
      session.leave(client);
      if (session.clients.size === 0) {
        sessions.delete(session.id)
      }
    }
  });
});
