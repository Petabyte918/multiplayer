// External Dependencies
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import randomToken from 'random-token';

// Internal Dependencies
import Client from './classes/server/Client';
import Level from './classes/server/Level';

import DatabaseManager from './classes/server/DatabaseManager';

// Shared Dependencies

// Application Globals
const world = {
  levels: [],
  clients: {}
};

// Constants & Enumerations
import MessageTypes from './classes/MessageTypes';

// Helpers & Abstractions
const log = console.log; // TODO: log things to a file for production.

const authenticate = function authenticate(authString) { // TODO: add function name and explain why!
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
  while (world.clients.clientToken) {
    clientToken = randomToken(16);
  }
  const client = new Client({
    token: clientToken,
    socket,
    playerCharacter: null
  });
  world.clients[clientToken] = client;

  // Define socket behaviors
  socket.on('message', clientMessage.bind(client));
  // socket.on('close', clientClose);
  // socket.on('error', clientError);

  socket.on('keyPressed', (info) => {
    log(info);
  });

  sendPackage(socket, MessageTypes.Who);
};

const sendPackage = function sendPackage(socket, type = null, attributes = {}) {
  if (socket === null) throw new Error('Socket must be specified.'); // TODO: instanceof what?
  if (type === null) throw new Error('Package type must be specified.');

  if(type === MessageTypes.MoveTo) console.log("Moving... " + JSON.stringify(attributes));
  socket.send(JSON.stringify(Object.assign({ type }, attributes)));
};

const clientMessage = function clientMessage(incoming = '{}') {
  // 'this' === the client that generated this message

  const message = JSON.parse(incoming);

  switch (message.type) {
    case MessageTypes.Who:
      if (authenticate(message.who)) {
        this.playerCharacter = DatabaseManager.getPlayer('James');
        sendPackage(
          this.socket,
          MessageTypes.Authentication,
          { success: true, token: this.token, playerCharacter: JSON.stringify(this.playerCharacter) }
        );
      } else {
        sendPackage(
          this.socket,
          MessageTypes.Authentication,
          { success: false, errorMessage: 'Authentication failed.' }
        );
      }
      break;
    case MessageTypes.Port: // eslint-disable-line
      // incoming -> message: { levelId }
      if( world.levels[message.levelId]) {
        const level = world.levels[message.levelId];
      } else {
        const level = new Level(message.levelId);
        world.levels[message.levelId] = level;
      }
      const pc = this.playerCharacter;
      pc.tx = level.start.tx;
      pc.ty = level.start.ty;

      // TODO: Will need to check whether player is "allowed" to port here.
      //  For example, are they currently near a portal to this area?
      sendPackage(
        this.socket,
        MessageTypes.Port,
        { success: true, level, playerCharacter: pc }
      );
      break;
    case MessageTypes.KeyPressed:
      handleKeyPressed(this, message);
      break;
    case MessageTypes.KeyReleased:
      handleKeyReleased(this, message);
      break;
    case MessageTypes.Cast:
      castSpell(this, message);
      break;
    default:
      log('Unhandled socket communcation.');
      break;
  }
};

const handleKeyPressed = function handleKeyPressed(client, message) {
  const action = message.action;
  const pc = client.playerCharacter;
  const newDirection = { x: 0, y: 0 };
  switch (action) {
    case 'LEFT':
      newDirection.x -=1;
      //pc.setPosition({ x: pc.position.x - 1, y: pc.position.y });
      break;
    case 'RIGHT':
      newDirection.x +=1;
      //pc.setPosition({ x: pc.position.x + 1, y: pc.position.y });
      break;
    case 'UP':
      newDirection.y -=1;
      //pc.setPosition({ x: pc.position.x, y: pc.position.y - 1 });
      break;
    case 'DOWN':
      newDirection.y +=1;
      //pc.setPosition({ x: pc.position.x, y: pc.position.y + 1 });
      break;
    default:
      break;
  }
  // newDirection.x *= pc.walkSpeed / deltaTime;
  newDirection.x *= 2.5; 
  // newDirection.y *= pc.walkSpeed / deltatime;
  newDirection.y *= 2.5;
  pc.setPosition({
    x: pc.position.x + newDirection.x,
    y: pc.position.y + newDirection.y
  });
  console.log(pc.position);
  sendPackage(
    client.socket,
    MessageTypes.MoveTo,
    {
      x: pc.position.x,
      y: pc.position.y
    }
  );
  console.log(`Handled a ${action} keypress... sort of`);
};
const handleKeyReleased = function handleKeyReleased(client, message) {
  const action = message.action;
};

const castSpell = function castSpell(client, message) {
  if(client.player.canCast(message.spellId)) {
    // TODO: Eventually something like this -> client.player.cast(DatabaseManager.getSpell(spellId));
    const fb = new FireBall();
  } else {

  }
}

// Serving the game service.
const gameServer = new WebSocket.Server({
  perMessageDeflate: false,
  port: 8080,
});
gameServer.on('connection', initiateClient);
