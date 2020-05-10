# React Multiplayer Tetris 
Online multiplayer Tetris game made with React, Node.js, Express.js, Socket.IO and Firebase. 

link: https://react-multiplayer-tetris.herokuapp.com/


# How to play
Follow this link https://react-multiplayer-tetris.herokuapp.com/ and wait a minute while heroku starts up its server.
When the game starts you get a unique url that identifies your game session,
(e.g. "https://react-multiplayer-tetris.herokuapp.com/#hxt1wm"),
if you share your url or open it up in a new window several tetris games should be in the same session. Happy playing!

# Installation instructions
Server: Start the server by running "npm start"
Client: The client is preset to connect to a server running on heroku.
        If you want to connect to your local server go into the TetrisManager.jsx
        and uncomment line 25 and comment line 26. Alternative change the argument
        of the connect method to the address which your server is running on.

# TODO
* add a startscreen where you can choose single or multiplayer
* in multiplayer mode give every participant a ready button and
  give the host a start button to start the game for everyone
* in multiplayer add a chat
