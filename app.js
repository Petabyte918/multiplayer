// External Dependencies
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const randomToken = require('random-token');

// Internal Dependencies
const Client = require('./classes/Client');
const Level = require('./classes/Level');

// Application Globals
const clients = {};

// Constants & Enumerations
const MSG_TYPE_WHO = 'WHO';
const MSG_TYPE_AUTHENTICATION = 'AUTHENTICATION';
const MSG_TYPE_PORT = 'PORT';

// Helpers & Abstractions
const log = console.log;

const authenticate = function (authString) { // TODO: add function name and explain why!
  // TODO: Faking user authentication. Need the real thing.
  const [user, passHash] = authString.split(':');

  if (user && passHash && user.toLowerCase() === 'james') {
    return true;
  }

  return false;
};

// Serving front end items (web pages, client scripts, images, etc.)
const app = express();
app.use(express.static('client'));
http.createServer(app).listen(5555, () => log('App started.'));

// Socket Event Handlers
const initiateClient = (socket) => {
  // Add socket to client list.
  let clientToken = randomToken(16);
  while (clients.clientToken) {
    clientToken = randomToken(16);
  }
  const client = new Client(clientToken, socket);
  clients[clientToken] = client;

  // Define socket behaviors
  socket.on('message', clientMessage.bind(client));
  // socket.on('close', clientClose);
  // socket.on('error', clientError);

  socket.send(JSON.stringify({ type: MSG_TYPE_WHO }));
};

const clientMessage = function (incoming = '{}') {
  const message = JSON.parse(incoming);

  switch (message.type) {
    case MSG_TYPE_WHO:
      if (authenticate(message.who)) {
        this.socket.send(
          JSON.stringify({
            type: MSG_TYPE_AUTHENTICATION,
            success: true,
            token: this.token,
          }),
        );
      } else {
        this.socket.send(
          JSON.stringify({
            type: MSG_TYPE_AUTHENTICATION,
            success: false,
            errorMessage: 'Authentication failed.',
          }),
        );
      }
      break;
    case MSG_TYPE_PORT: // eslint-disable-line
      console.log('PORTED');
      // message: { levelId }
      const level = new Level(message.levelId);
      // TODO: Will need to check whether player is "allowed" to port here.
      //  For example, are they currently near a portal to this area?
      this.socket.send(
        JSON.stringify({
          type: MSG_TYPE_PORT,
          success: true,
          tileMap: level.tileMap,
          sprites: level.sprites,
        }),
      );
      break;
    default:
      log('Unhandled socket communcation.');
      break;
  }
};

// Serving the game service.
const gameServer = new WebSocket.Server({
  perMessageDeflate: false,
  port: 8080,
});
gameServer.on('connection', initiateClient);
