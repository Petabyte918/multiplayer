
// Environment
const PORT = process.env.PORT || 5555;

// External Dependencies
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
// import randomToken from 'random-token';
import mongoose from 'mongoose';

import World from './classes/GameEngine';

// Helpers
import { guid } from './classes/Helpers/guid';
import { hashPassword } from './classes/Helpers/passhashing';
import { sendPackage, broadcastPackage } from './classes/Helpers/messaging';

// Internal Dependencies
import Client from './classes/server/Client';
import Level from './classes/shared/Level';

// Game Managers
import DatabaseManager from './classes/server/DatabaseManager';
import { GameSettings } from  './classes/GameSettings';

import fs from 'fs';

// const serverConfig = JSON.parse(fs.readFileSync('./config.json'));

// Game Objects
import FireBall from './classes/shared/FireBall';
import PlayerCharacter from './classes/shared/PlayerCharacter';

// Constants & Enumerations
import MessageTypes from './classes/MessageTypes';
import PlayerActions from './classes/PlayerActions';
import { SpriteTypes } from './classes/SpriteTypes';
import { CollisionStatus } from './classes/shared/Collider';

// Database related
mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
import User from './models/User';
import Character from './models/Character';

// Application Globals
// const World = {
//   levels: {},
//   clients: {}
// };

// Helpers & Abstractions
const log = console.log; // TODO: log things to a file for production.

const authenticate = async function authenticate(client, authString) { // TODO: add function name and explain why!
  // TODO: Faking user authentication. Need the real thing.
  const [username, password] = authString.split(':');

  if (username && password) {
    try {
      const user = await User.findOne({ user: username }).populate('character'); // , 'user pass');
      // console.log("User: ", user);
      const hashedPass = hashPassword(password, user.pass.salt);
      if(hashedPass.hash === user.pass.hash) {
        // TODO: retrieve character info???
        client.user = user;
        return true;
      }
      //  else if(username.toLowerCase() === 'james') {
      //   console.log("Password incorrect.");
      //   await User.findOneAndUpdate({ user: username }, { $set: { pass: hashedPass }});
      //   console.log("Changed password. Check DB.");
      // }
    } catch(exception) {
      // This is probably a promise error.
      console.error("Exception occurred: ", exception);
    }
  }

  return false;
};

// Serving front end items (web pages, client scripts, images, etc.)
const app = express();
app.use(express.static('client'));
const server = http.createServer(app).listen(PORT, () => log('App started.'));

// Socket Event Handlers
const initiateClient = (socket) => {
  // Add socket to client list.
  let instanceId = guid();
  while (World.clients[instanceId]) {
    instanceId = guid();
  }
  const client = new Client({
    instanceId,
    socket,
    playerCharacter: null,
    model: null,
  });
  //World.clients[clientToken] = client;
  World.addClient(client);

  // Define socket behaviors
  socket.on('message', clientMessage.bind(client));
  socket.on('close', clientClose.bind(client));

  socket.on('keyPressed', (info) => { log(info); });

  sendPackage(socket, MessageTypes.Who);
};

// const broadcastPackage = function broadcastPackage(type = null, attributes = {}) {
//   // TODO: only affect clients that are in range and can see (but for now everybody)
//   Object.keys(World.clients).forEach(clientKey => {
//     // console.log("broadcasting port package to: " + clientKey, World.clients[clientKey]);
//     const c = World.clients[clientKey];
//     if(c) sendPackage(c.socket, type, attributes);
//   })
// }

// const sendPackage = function sendPackage(socket, type = null, attributes = {}) {
//   if (socket === null) throw new Error('Socket must be specified.'); // TODO: instanceof what?
//   if (type === null) throw new Error('Package type must be specified.');

//   if (socket.readyState !== WebSocket.OPEN) return;

//   socket.send(JSON.stringify(Object.assign({ type }, attributes)));
// };

const clientMessage = async function clientMessage(incoming = '{}') {
  // 'this' === the client that generated this message
  // const client = this; ????
  const message = JSON.parse(incoming);

  switch (message.type) {
    case MessageTypes.PING:
      sendPackage(this.socket, MessageTypes.PONG, {});
      break;
    case MessageTypes.Who:
      if (await authenticate(this, message.who)) {
        // log("Getting player.");
        this.playerCharacter = DatabaseManager.getPlayer(this.user.character.name);
        sendPackage(
          this.socket,
          MessageTypes.Authentication,
          { success: true, instanceId: this.instanceId, playerCharacter: JSON.stringify(this.playerCharacter) }
        );
      } else {
        sendPackage(
          this.socket,
          MessageTypes.Authentication,
          { success: false, errorMessage: 'Authentication failed.' }
        );
      }
      break;
    case MessageTypes.Port: 
      // incoming -> message: { levelId }
      let level = null;
      if( World.levels[message.levelId]) {
        level = World.levels[message.levelId];
      } else {
        level = World.getLevel(message.levelId); // new Level(message.levelId);
        World.levels[message.levelId] = level;
      }
      const pc = this.playerCharacter;
      //pc.tx = level.start.tx;
      pc.position.x = level.start.tx * GameSettings.TILE_SCALE;
      //pc.ty = level.start.ty;
      pc.position.y = level.start.ty * GameSettings.TILE_SCALE;
      pc.levelId = level.id;
      // TODO: Update this WHOOOOOLE file with pc.getLevel() instead of levelId
      pc.getLevel = () => { return level; };
      level.sprites.push(pc);

      // TODO: Will need to check whether player is "allowed" to port here.
      //  For example, are they currently near a portal to this area?
      // console.log("sending port package to: " + this.instanceId, this);
      sendPackage(
        this.socket,
        MessageTypes.Port,
        { success: true, level, playerCharacter: pc }
      );
      // console.log("sent port package");
      // console.log("broadcasting port package");
      broadcastPackage(
        MessageTypes.Spawn,
        { spawnClass: SpriteTypes.PLAYER, spawn: pc }
      );
      // console.log("broadcast port package");
      break;
    case MessageTypes.KeyPressed:
      handleKeyPressed(this, message);
      break;
    case MessageTypes.KeyReleased:
      handleKeyReleased(this, message);
      break;
    case MessageTypes.MouseDown:
    case MessageTypes.MouseUp:
    case MessageTypes.MouseMove:
      handleMouseEvent(this, message);
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
  // Then remove the client from the World. 
  // TODO: When above TODO is finished, this should be a callback.
  {
    if(this.playerCharacter) {
      const level = World.getLevel(this.playerCharacter.levelId);
      if(level) {
        const levelIndex = level.sprites.indexOf(this.playerCharacter);
        level.sprites.splice(levelIndex, 1);
        level.sprites[this.playerCharacter.instanceId] = undefined;
        World.clients[this.instanceId] = undefined; // TODO: use GameEngine.removeClient();
        broadcastPackage(MessageTypes.Despawn, { spawnId: this.playerCharacter.instanceId });
      }
    }
  }
}

const handleMouseEvent = function handleMouseEvent(client, message) {
  if(message.type === MessageTypes.MouseDown) {
    // console.log("Mouse down", message);
    client.setMouseDown(message);
  } else if (message.type === MessageTypes.MouseUp) {
    // console.log("Mouse up");
    client.setMouseUp();
  } else {
    // console.log("Mouse move: " + Date.now());
    client.setMousePosition(message.aim);
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
    case PlayerActions.SHOOT_PROJECTILE:
      // log("Got shoot request: ", message);
      handlePlayerFireRequest(client, message);
      break;
    default:
      log('Unexpected player action type: ' + action, message);
      break;
  }
};
const handleKeyReleased = function handleKeyReleased(client, message) {
  const action = message.action;
  // log("Released: " + action);
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
  //console.log("Firing from: ", client.playerCharacter.position);
  const fireball = new FireBall(
    {
      start: pc.position,
      aim: pc.hasMoveTarget ? pc.moveTarget : message.aim,
      speed: GameSettings.TILE_SCALE * 12, // TODO: up to 12 when things seem good.
      // owner: pc,
      collider: {
        ignoresIds: [ pc.instanceId ]
      }
    }
  );
  pc.collider.ignoresIds.push(fireball.instanceId);
  let sprites = World.levels[pc.levelId].sprites;
  sprites.push(fireball);
  broadcastPackage(MessageTypes.Spawn, { spawnClass: SpriteTypes.FIREBALL, spawn: fireball });

  fireball.delete = () => {
    sprites = sprites.splice(sprites.indexOf(fireball), 1);
    broadcastPackage(MessageTypes.Despawn, { spawnId: fireball.instanceId });
  };

  // log("Number of sprites in level: " + World.levels[pc.levelId].sprites.length);
  // log("Level sprites: ", World.levels[pc.levelId].sprites);
}

const castSpell = function castSpell(client, message) {
  if(client.playerCharacter.canCast(message.spellId)) {
    // TODO: Eventually something like this -> client.player.cast(DatabaseManager.getSpell(spellId));
    //const fb = new FireBall();
  }
}

// Serving the game service.
const gameServer = new WebSocket.Server({
  server,
  perMessageDeflate: false,
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

  const levelsArray = Object.keys(World.levels).map(key => World.levels[key]);

  // Update all gameobjects
  levelsArray.forEach(level => {
    level.sprites.forEach(sprite => {
      if (sprite.update) {
        const preSprite = JSON.stringify(sprite, (k,v) => k === 'owner' ? undefined : v);
        sprite.update(delta);
        const postSprite = JSON.stringify(sprite, (k,v) => k === 'owner' ? undefined : v);
        // if(sprite instanceof PlayerCharacter && sprite.moving) {
        //   console.log("PRE: ", preSprite, "POST: ", postSprite);
        // }
        // If updates exist and prop changes are made, add updates to a package
        if (postSprite !== preSprite) {
          level.frameQueue.push({
            type: MessageTypes.UpdateSprite,
            sprite: postSprite
          });
        }
      }

      level.sprites.forEach(function(otherSprite) {
        if(otherSprite === sprite) return;
        switch(sprite.checkCollision(otherSprite)) {
          case CollisionStatus.ENTER:
            sprite.onCollisionEnter && sprite.onCollisionEnter(otherSprite.collider);
            break;
          case CollisionStatus.COLLIDING:
            sprite.onCollision && sprite.onCollision(otherSprite.collider);
            break;
          case CollisionStatus.EXIT:
            sprite.onCollisionExit && sprite.onCollisionExit(otherSprite.collider);
            break;
        }
      })

    });
  });

  Object.keys(World.clients)
    .map(id => World.clients[id])
    .forEach((client) => {
      if(!client || !client.playerCharacter || !client.socket) return;
      
      const level = World.levels[client.playerCharacter.levelId];
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
