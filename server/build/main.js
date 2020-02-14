"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var ws_1 = __importDefault(require("ws"));
var session_1 = __importDefault(require("./session"));
var client_1 = __importDefault(require("./client"));
var sessions = new Map();
var app = express_1.default();
// init http server
var server = http_1.default.createServer(app);
var port = 9001;
// init websocket server instance
var wss = new ws_1.default.Server({ server: server });
wss.on("connection", function (ws) {
    ws.on("message", function (message) {
        var data = JSON.parse(message);
        if (data.type === "create-session") {
            var session = createSession();
        }
    });
});
// const WebSocketServer = require("ws").Server;
// const Session = require("./session");
// const Client = require("./client");
// const server = new WebSocketServer({ port: 9000 });
// const sessions = new Map();
function createId(len, chars) {
    if (len === void 0) { len = 6; }
    if (chars === void 0) { chars = "abcdefghjkmnopqrstwxyz0123456789"; }
    var id = "";
    while (len--) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}
function createClient(conn, id) {
    if (id === void 0) { id = createId(); }
    return new client_1.default(conn, id);
}
function createSession(id) {
    if (id === void 0) { id = createId(); }
    if (sessions.has(id)) {
        throw new Error("Session " + id + " already exists");
    }
    var session = new session_1.default(id);
    console.log("Createing session ", session);
    sessions.set(id, session);
    return session;
}
function getSession(id) {
    return sessions.get(id);
}
function broadCastSession(session) {
    if (!session)
        return;
    var clients = __spreadArrays(session.clients);
    clients.forEach(function (client) {
        client.send({
            type: "session-broadcast",
            peers: {
                you: client.id,
                clients: clients.map(function (client) { return client.id; })
            }
        });
    });
}
// server.on("connection", conn => {
//   console.log("Connection established");
//   const client = createClient(conn);
//   conn.on("message", msg => {
//     const data = JSON.parse(msg);
//     if (data.type === "create-session") {
//       const session = createSession();
//       session.join(client);
//       client.send({
//         type: "session-created",
//         id: session.id
//       });
//     } else if (data.type === "join-session") {
//       const session = getSession(data.id) || createSession(data.id);
//       session.join(client);
//       broadCastSession(session);
//     } else if (data.type === "state-update") {
//       client.broadcast(data);
//     }
//   });
//   conn.on("close", () => {
//     console.log("Connection closed");
//     const session = client.session;
//     if (session) {
//       session.leave(client);
//       if (session.clients.size === 0) {
//         sessions.delete(session.id);
//       }
//     }
//     broadCastSession(session);
//   });
// });
//# sourceMappingURL=main.js.map