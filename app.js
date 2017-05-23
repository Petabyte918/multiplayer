// External Dependencies
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import randomToken from 'random-token';

// Internal Dependencies
import Client from './classes/server/Client';
import Level from './classes/server/Level';

// Game Managers
import DatabaseManager from './classes/server/DatabaseManager';
import GameSettings from  './classes/GameSettings';

// Game Objects
import FireBall from './classes/shared/FireBall';

// Constants & Enumerations
import MessageTypes from './classes/MessageTypes';
import PlayerActions from './classes/PlayerActions';
import SpriteTypes from './classes/SpriteTypes';

// Shared Dependencies

// Application Globals
const world = {
  levels: {},
  clients: {}
};

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
  socket.on('close', clientClose.bind(client));
  // socket.on('error', clientError);

  socket.on('keyPressed', (info) => {
    log(info);
  });

  sendPackage(socket, MessageTypes.Who);
};

const broadcastPackage = function broadcastPackage(type = null, attributes = {}) {
  // TODO: only affect clients that are in range and can see (but for now everybody)
  Object.keys(world.clients).forEach(clientKey => {
    const c = world.clients[clientKey];
    if(c) sendPackage(c.socket, type, attributes);
  })
}

const sendPackage = function sendPackage(socket, type = null, attributes = {}) {
  if (socket === null) throw new Error('Socket must be specified.'); // TODO: instanceof what?
  if (type === null) throw new Error('Package type must be specified.');

  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify(Object.assign({ type }, attributes)));
};

const clientMessage = function clientMessage(incoming = '{}') {
  // 'this' === the client that generated this message

  const message = JSON.parse(incoming);

  switch (message.type) {
    case MessageTypes.Who:
      if (authenticate(message.who)) {
        log("Getting player.");
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
      let level = null;
      if( world.levels[message.levelId]) {
        level = world.levels[message.levelId];
      } else {
        level = new Level(message.levelId);
        world.levels[message.levelId] = level;
      }
      const pc = this.playerCharacter;
      pc.tx = level.start.tx;
      pc.position.x = level.start.tx * GameSettings.TILE_SCALE;
      pc.ty = level.start.ty;
      pc.position.y = level.start.ty * GameSettings.TILE_SCALE;
      pc.levelId = level.id;
      // TODO: Update this WHOOOOOLE file with pc.getLevel() instead of levelId
      pc.getLevel = () => { return level; };
      level.sprites.push(pc);

      // TODO: Will need to check whether player is "allowed" to port here.
      //  For example, are they currently near a portal to this area?
      sendPackage(
        this.socket,
        MessageTypes.Port,
        { success: true, level, playerCharacter: pc }
      );
      broadcastPackage(
        MessageTypes.Spawn,
        { spawnClass: SpriteTypes.PLAYER, spawn: pc }
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
      log('Unhandled socket communcation. Message type: ' + message.type, message);
      break;
  }
};
const clientClose = function clientClose() {
  // First stop any messages going to the client.
  this.socket = null;
  // TODO: Then save any relevant client data to the database
  //   Note: should save with a separate function so that we can also auto-save periodically.
  // Then remove the client from the world. 
  // TODO: When above TODO is finished, this should be a callback.
  {
    if(this.playerCharacter) {
      const level = this.playerCharacter.getLevel();
      if(level) {
        const levelIndex = level.sprites.indexOf(this.playerCharacter);
        level.sprites.splice(levelIndex, 1);
        level.sprites[this.playerCharacter.instanceId] = undefined;
        world.clients[this.token] = undefined;
        broadcastPackage(MessageTypes.Despawn, { spawnId: this.playerCharacter.instanceId });
      }
    }
  }
}

const handleKeyPressed = function handleKeyPressed(client, message) {
  const action = message.action;
  switch (action) {
    case PlayerActions.LEFT:
    case PlayerActions.RIGHT:
    case PlayerActions.UP:
    case PlayerActions.DOWN:
      handlePlayerMoveRequest(client, message);
      break;
    case PlayerActions.MOUSE_ACTION_1:
      handlePlayerFireRequest(client, message);
      break;
    default:
      log('Unexpected player action type: ' + action, message);
      break;
  }
};
const handleKeyReleased = function handleKeyReleased(client, message) {
  const action = message.action;
  log(action);
};

const handlePlayerMoveRequest = function handlePlayerMoveRequest(client, message) {
  const action = message.action;
  const pc = client.playerCharacter;
  const newDirection = { x: 0, y: 0 };
  switch (action) {
    case 'LEFT':
      newDirection.x -=1;
      break;
    case 'RIGHT':
      newDirection.x +=1;
      break;
    case 'UP':
      newDirection.y -=1;
      break;
    case 'DOWN':
      newDirection.y +=1;
      break;
    default:
      
      break;
  }
  // newDirection.x *= pc.walkSpeed / deltaTime;
  newDirection.x *= 5;
  // newDirection.y *= pc.walkSpeed / deltatime;
  newDirection.y *= 5;
  pc.setPosition({
    x: pc.position.x + newDirection.x,
    y: pc.position.y + newDirection.y
  });
  sendPackage(
    client.socket,
    MessageTypes.MoveTo,
    {
      x: pc.position.x,
      y: pc.position.y
    }
  );
  pc.getLevel().frameQueue.push({
    type: MessageTypes.UpdateSprite,
    sprite: JSON.stringify(pc)
  });
}

const handlePlayerFireRequest = function handlePlayerFireRequest(client, message) {
  const pc = client.playerCharacter;
  console.log("Firing from: ", client.playerCharacter.position);
  const fireball = new FireBall(
    {
      start: pc.position,
      aim: message.aim,
      speed: GameSettings.TILE_SCALE * 12, // TODO: up to 12 when things seem good.
      owner: pc
    }
  );
  let sprites = world.levels[pc.levelId].sprites;
  sprites.push(fireball);
  broadcastPackage(MessageTypes.Spawn, { spawnClass: SpriteTypes.FIREBALL, spawn: fireball });

  fireball.delete = () => {
    sprites = sprites.splice(sprites.indexOf(fireball), 1);
    broadcastPackage(MessageTypes.Despawn, { spawnId: fireball.instanceId });
  };

  // log("Number of sprites in level: " + world.levels[pc.levelId].sprites.length);
  // log("Level sprites: ", world.levels[pc.levelId].sprites);
}

const castSpell = function castSpell(client, message) {
  if(client.player.canCast(message.spellId)) {
    // TODO: Eventually something like this -> client.player.cast(DatabaseManager.getSpell(spellId));
    //const fb = new FireBall();
  }
}

// Serving the game service.
const gameServer = new WebSocket.Server({
  perMessageDeflate: false,
  port: 8080,
});
gameServer.on('connection', initiateClient);


// Managing timed game loop
let lastUpdate = Date.now();
setInterval(function() {
  // TODO?: Cater packages to each client based on view range, etc.?
    // One use case would be to remove stealth units from client side until they are visible again.

  const thisUpdate = Date.now();
  const delta = thisUpdate - lastUpdate;
  lastUpdate = thisUpdate;

  const levelsArray = Object.keys(world.levels).map(key => world.levels[key]);

  // Update all gameobjects
  levelsArray.forEach(level => {
    level.sprites.forEach(sprite => {
      if (sprite.update) {
        const preSprite = JSON.stringify(sprite, (k,v) => k === 'owner' ? undefined : v);
        sprite.update(delta);
        const postSprite = JSON.stringify(sprite, (k,v) => k === 'owner' ? undefined : v);
        // If updates exist and prop changes are made, add updates to a package
        if (postSprite !== preSprite) {
          level.frameQueue.push({ 
            type: MessageTypes.UpdateSprite,
            sprite: postSprite
          });
        }
      }
    });
  });

  Object.keys(world.clients)
    .map(id => world.clients[id])
    .forEach((client) => {
      if(!client || !client.playerCharacter || !client.socket) return;
      
      const level = world.levels[client.playerCharacter.levelId];
      if(!level) return;
      
      // send update package to all connected clients on a per-level basis.
      if(level.frameQueue.length > 0) {
        sendPackage(client.socket, MessageTypes.FrameQueue, { queue: level.frameQueue });
      }
    });

  levelsArray.forEach(level => {
    level.frameQueue.length = 0; // TODO: ensure data is actually gone! This feels weird, but is reportedly the "fastest" reliable way to clear an array in Javascript.
                                 //       (see http://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript);
  });

}, 1000 / 60);
