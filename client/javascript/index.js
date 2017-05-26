// Game Objects
// import FireBall from '../../classes/shared/FireBall';
import PlayerCharacter from '../../classes/shared/PlayerCharacter';
import Sprite from '../../classes/shared/Sprite';

// Constants & Enumerations
import MessageTypes from '../../classes/MessageTypes';
import TileTypes from '../../classes/TileTypes';
import { SpriteTypes, SpriteClassMap } from '../../classes/SpriteTypes';
import PlayerActions from '../../classes/PlayerActions';

// Game Managers
import { GameSettings } from '../../classes/GameSettings';

// Helpers
import { angle2d } from '../../classes/Helpers/gx2D';
import { throttle } from '../../classes/Helpers/throttling';

// tile canvas
const tileCanvas = document.querySelector('#tileCanvas');
const tileContext = tileCanvas.getContext('2d');
// sprite canvas
const spriteCanvas = document.querySelector('#spriteCanvas');
const spriteContext = spriteCanvas.getContext('2d');
// UI canvas / div ---- // TODO???
// Cursor canvas
const cursorCanvas = document.querySelector('#cursorCanvas');
const cursorContext = cursorCanvas.getContext('2d');

// Modes
const MODE_PLAY = 'PLAY';
const MODE_EDIT = 'EDIT';

// Application globals
const client = {
  token: undefined,
};
const TILE_SCALE = GameSettings.TILE_SCALE;
const gameMode = MODE_PLAY;

const TileColorMap = new Map();
TileColorMap.set(TileTypes.DIRT, '#5b2607');
TileColorMap.set(TileTypes.GRASS, 'green');
TileColorMap.set(TileTypes.ROCK, 'grey');
TileColorMap.set(TileTypes.WATER, 'blue');
TileColorMap.set(TileTypes.PIT, 'black');
TileColorMap.set(TileTypes.BRIDGE, '#7c4b2e');

const SpriteTextureMap = new Map();
SpriteTextureMap.set(SpriteTypes.CHEST, './images/ChestClosed.png');
SpriteTextureMap.set(SpriteTypes.FIREBALL, './images/FireballStatic.png');
SpriteTextureMap.set(SpriteTypes.PLAYER, './images/PlayerOverhead.png');

const ImageLoader = new Map();

let playerCharacter = null;

// level tiles / objects for map the player is currently on.
let tileMap = [];
let sprites = []; // SPRITE

let mousePosition = {};

// Start socket
function startSocketClient() {
  // TODO: Does this cause conflicts if called more than once?
  let sock = null;
  try {
    sock = client.socket || new WebSocket(`ws://${location.hostname}:${location.port}/`);
    client.socket = sock;
  } catch(ex) {
    console.log("Error: ", ex);
    console.log("If you're testing on the server, did you remember to use localhost?")
  }

  sock.onmessage = function onmessage(event) {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case MessageTypes.Who:
        // sendPackage(MessageTypes.Who, { who: 'James:df8c8023ae' });
        break;
      case MessageTypes.Authentication:
        if (message.success === true) {
          LoginSucceeded(message);
        } else {
          LoginFailed(message.error);
        }
        break;
      case MessageTypes.Port:
        console.log('PORTED');
        if (message.success === true) {
          message.level = JSON.parse(message.level);
          // console.log(message);
          tileMap = message.level.tileMap;
          const massagedSpriteData = message.level.sprites.map(s => classifySprite(s.spawn, s.spawnClass));
          sprites.push(...massagedSpriteData); // SPRITE
          massagedSpriteData.forEach(s => {
            sprites[s.instanceId] = s;
          });
          
          playerCharacter = sprites.find(s => s.instanceId === message.playerCharacter.instanceId); // SPRITE
          playerCharacter.setPosition(message.playerCharacter.position);

          // TODO: Can we determine if this is a first load?
          drawCanvas();
        } else {
          console.log("Message was not successful!!!!", message);
        }
        break;
      case MessageTypes.MoveTo:
        // DEBUG: console.log("Attempted to move: ", message);
        playerCharacter.setPosition(message);
        drawSprites();
        break;
      case MessageTypes.Spawn:
        // console.log('Spawn info: ', message);
        if(!message.spawnClass) {
          console.error("No spawn class provided.");
          return;
        }
        if(message.spawnClass === SpriteTypes.PLAYER) {
          console.log("Player spawned: ", message.spawn.instanceId);
        }
        const spawnClass = SpriteClassMap.get(message.spawnClass);
        if(message.spawn.instanceId === playerCharacter.instanceId) return;
        const newSpawn = Object.assign(new Sprite(), message.spawn, { type: message.spawnClass });
        sprites.push(newSpawn);
        sprites[newSpawn.instanceId] = newSpawn;
        break;
      case MessageTypes.Despawn:
        // console.log('Despawn Message: ', message); // message.spawnId
        sprites.splice(sprites.findIndex(s => s.instanceId === message.spawnId), 1);
        sprites[message.spawnId] = undefined;
        if(message.spawnId === playerCharacter.instanceId) {
          // TODO: respawn
        }
        delete sprites[message.spawnId];
        break;
      case MessageTypes.FrameQueue:
        // TODO: finish below
        //    ... console.log("FrameQueue received: ", message.queue);
        message.queue.forEach((item) => {
          if(item.type === MessageTypes.UpdateSprite) {
            const spriteUpdateInfo = JSON.parse(item.sprite);
            // if(spriteUpdateInfo.instanceId === playerCharacter.instanceId) return;
            //console.log(spriteUpdateInfo.position);
            const spriteToUpdate = sprites[spriteUpdateInfo.instanceId];
            if(spriteToUpdate) {
              Object.assign(spriteToUpdate, spriteUpdateInfo);
              //console.log(spriteToUpdate);
            } else {
              console.log("couldn't find sprite.", spriteUpdateInfo);
            }
          }
        });
        drawSprites();
        // TODO: Draw sprite changes all in one go - DO NOT draw them in each iteration above.
        break;
      case MessageTypes.DEBUG:
        console.log('Debug package received. Message: ' + message.message);
        break;
      default:
        console.log('Message type not recognized: ', message);
        break;
    }
  };

  sock.onclose = function onclose(something) {
    console.log('Socket Closed -> ', something);
    // TODO: Set a timer to attempt to reconnect.
  };
  sock.onerror = function onerror(something) {
    console.log('Some Error -> ', something);
    // TODO: Determine conditions for reconnect and then use them to create reconnect logic.
  };
}

const sendLogin = (username, password) => {
  sendPackage(MessageTypes.Who, { who: username + ':' + password });
}

const classifySprite = function classifySprite(sprite, spriteClassTag) {
  if(!spriteClassTag) return sprite;
  const spriteClass = SpriteClassMap.get(spriteClassTag);
  if(sprite instanceof spriteClass) return;
  const classifiedSprite = Object.assign(new spriteClass(), sprite);
  return classifiedSprite;
}

// Pipeline message handlers
function LoginSucceeded(message = {}) {

  console.log("message: ", message);

  if (!message.instanceId) return;
  client.instanceId = message.instanceId; // Save to global for later use.
  toast('Welcome', 'Connected to server.');

  hideUI('UI_Login');

  //client.instanceId = JSON.parse(message.playerCharacter).instanceId;
  
  // TODO: Show loading message.
  startGame();
}

function LoginFailed(error = 'not defined') {
  /* eslint-disable no-alert */
  toast('YOU FAILED!!!');
  toast("PS. Who doesn't hate alerts?");
  toast('Oh and the error was: ', error);
}

function toast(title = 'Toast', message) {
  // TODO: Develop/borrow toaster alert

  const t = document.querySelector('#toast__template');

  const tToast = t.content.querySelector('.toast');
  const toastDiv = document.importNode(tToast, true);

  const tClose = toastDiv.querySelector('.toast__close');
  const tTitle = toastDiv.querySelector('.toast__title');
  const tMessage = toastDiv.querySelector('.toast__message');

  tTitle.textContent = title;
  tMessage.textContent = message;
  tClose.addEventListener('click', (e) => {
    // Start CSS animation. Takes 2.5 seconds.
    toastDiv.classList.add('closing');
    // Remove after completely faded out. (2.5 seconds)
    setTimeout(() => { toastDiv.parentElement.removeChild(toastDiv); }, 2500);
    e.stopPropagation();
  });

  document.querySelector('#toasts').appendChild(toastDiv);
}

// Set up canvas: (Note: may need to use this later to reinit when screen size changes.)
function initCanvas() {
  handleResize();
  if (tileMap.length > 0) drawCanvas(); // TODO: Put this in a timed loop?
}

function handleResize() {
  spriteCanvas.width = cursorCanvas.width = tileCanvas.width = document.body.offsetWidth;
  spriteCanvas.height = cursorCanvas.height = tileCanvas.height = document.body.offsetHeight;
  drawCanvas();
}

// Draw canvas
function drawCanvas() {
  tileContext.fillStyle = 'cyan';
  // clear bg
  tileContext.fillRect(0, 0, tileCanvas.width, tileCanvas.height);

  // draw background tiles
  drawBackground();

  // draw sprites
  drawSprites();

  // TODO: draw HUD
}

const drawBackground = function drawBackground() {
  // TODO: Rewrite using array functions for looping.
  for (let r = 0; r < tileMap.length; r += 1) {
    const row = tileMap[r];
    for (let c = 0; c < row.length; c += 1) {
      const cell = row[c];
      tileContext.fillStyle = TileColorMap.get(cell);
      tileContext.fillRect(c * TILE_SCALE, r * TILE_SCALE, TILE_SCALE, TILE_SCALE);
    }
  }
};

const drawSprites = function drawSprites() {
  // TODO: Check differences. Only erase previous sprites if they moved and redraw???

  // but for now, lets just clear sprites and redraw
  spriteContext.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);

  sprites.forEach((sprite) => {  // SPRITE

    // if (sprite instanceof FireBall) {
    //   drawSprite(sprite.position.x, sprite.position.y, SpriteTextureMap.get(SpriteTypes.FIREBALL), sprite.angle);
    // } else 
    if (sprite instanceof PlayerCharacter) {
      drawSprite(sprite.position.x, sprite.position.y, SpriteTextureMap.get(SpriteTypes.PLAYER), sprite.angle || 0);
      //drawCircle(sprite.tx, sprite.ty, (TILE_SCALE / 2) - 2, color);
    } else {
      // console.log("Other type of sprite: ", sprite.type, sprite.position, typeof sprite, sprite);
      const imageSource = sprite.image || SpriteTextureMap.get(sprite.type);
      if(imageSource === undefined) console.log("undefined darnit.", sprite);
      drawSprite(sprite.position.x, sprite.position.y, imageSource, sprite.angle || 0);
    }
  });
};

// Canvas helper functions
const drawCircle = function drawCircle(x, y, radius = TILE_SCALE, fill = '#FFFFFF', strokeColor = '#000000') {
  const centerX = (x * TILE_SCALE) + (TILE_SCALE / 2);
  const centerY = (y * TILE_SCALE) + (TILE_SCALE / 2);

  tileContext.beginPath();
  tileContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  tileContext.fillStyle = fill;
  tileContext.fill();
  tileContext.lineWidth = 1;
  tileContext.strokeStyle = strokeColor;
  tileContext.stroke();
};

const drawSprite = function drawSprite(x, y, imageSource, angle = null) {
  // const imgElement = document.querySelector('#image-loader');

  let imgElement = ImageLoader.get(imageSource);
  let rotAngle = 0;
  if (angle) {
    rotAngle = angle;
  }
  if (!imgElement) {
    imgElement = new Image();
    imgElement.src = imageSource;
    const onImageLoad = () => {
      spriteContext.translate(x , y);
      spriteContext.rotate(rotAngle);
      spriteContext.drawImage(imgElement, -16, -16);
      spriteContext.rotate(-rotAngle);
      spriteContext.translate(-x, -y);

      ImageLoader.set(imageSource, imgElement);
      imgElement.removeEventListener('load', onImageLoad);
    };
    // TODO: handle errors where images are not found.
    imgElement.addEventListener('load', onImageLoad);
  } else {
    spriteContext.translate(x, y);
    spriteContext.rotate(rotAngle);
    spriteContext.drawImage(imgElement, -16, -16);
    spriteContext.rotate(-rotAngle);
    spriteContext.translate(-x, -y);
  }
};

function keyPressed(keyName, message = {}) {
  // If the keyName starts with Unmapped...
  if (keyName.toUpperCase().indexOf('UNMAPPED') === 0) {
    const code = parseInt(keyName.split(':')[1], 10);
    console.log(`Unmapped key pressed: ${code}`);
  } else {
    sendPackage(MessageTypes.KeyPressed, { action: keyName, message: message });
  }
}
function keyReleased(keyName) {
  if (keyName.indexOf('UNMAPPED') === 0) {
    const code = parseInt(keyName.split(':')[1], 10);
    console.log(`Unmapped key released: ${code}`);
  } else {
    sendPackage(MessageTypes.KeyReleased, { action: keyName });
  }
}


const keyMap = [
  { code: 65, action: PlayerActions.LEFT }, // a
  { code: 65, action: PlayerActions.LEFT },
  { code: 37, action: PlayerActions.LEFT }, // left arrow
  { code: 87, action: PlayerActions.UP }, // w
  { code: 38, action: PlayerActions.UP }, // up arrow
  { code: 68, action: PlayerActions.RIGHT }, // d
  { code: 39, action: PlayerActions.RIGHT }, // right arrow
  { code: 83, action: PlayerActions.DOWN }, // s
  { code: 40, action: PlayerActions.DOWN }, // down arrow
  { code: 16, action: PlayerActions.SHIFT },
  { code: 32, action: PlayerActions.SHOOT_PROJECTILE }, // space bar
];

// Low Level Event Handlers
function keyDown(e) {
  const keyInfo = keyMap.find(k => k.code === e.keyCode);
  if (keyInfo) {
    let message = {};
    switch(keyInfo.action) {
      case PlayerActions.SHOOT_PROJECTILE:
        // console.log("trying to shoot fireball");
        shootFireball(mousePosition);
        break;
      default:
        keyPressed(keyInfo.action, message);
        break;
    }
  } else {
    keyPressed(`${PlayerActions.UNMAPPED}:${e.keyCode}`);
  }
}
function keyUp(e) {
  const keyInfo = keyMap.find(k => k.code === e.keyCode);
  if (keyInfo) {
    keyReleased(keyInfo.action);
  } else {
    keyReleased(`${PlayerActions.UNMAPPED}:${e.keyCode}`);
  }
}
let lastMovePackage = +Date.now();
const moveInterval = 250;
function mouseMove(e) {

  const angle = angle2d(playerCharacter.position.x, playerCharacter.position.y, e.clientX, e.clientY);
  // Local only
  if(!playerCharacter.isWalking) {
    playerCharacter.angle = angle + Math.PI / 2;
  }

  mousePosition = { x: e.clientX, y: e.clientY };

  if(+Date.now() > lastMovePackage + moveInterval) {
    // console.log("sending move package");
    sendPackage(MessageTypes.MouseMove, { aim: mousePosition });
    lastMovePackage = +Date.now();
  }


  // cursorCanvas.focusedTileCoords = {
  //   tx: Math.floor(e.clientX / TILE_SCALE),
  //   ty: Math.floor(e.clientY / TILE_SCALE)
  // };

  

  // clearCursors();
  // drawCursors();
}
function mouseClick(e) {
  // sendPackage(MessageTypes.MouseClick, { 
  //   button: e.button,
  //   x: e.clientX,
  //   y: e.clientY
  // });
}
function mouseDown(e) {
  if(e.button === 2) {
    console.log("DOWN: " + e.button);
    e.preventDefault();
    return;
  } else {
    sendPackage(MessageTypes.MouseDown, { 
      button: e.button,
      x: e.clientX,
      y: e.clientY
    });
  }
}
function mouseUp(e) {
  if(e.button === 2) {
    console.log("UP: " + e.button);
    e.preventDefault();
    return;
  } else {
    sendPackage(MessageTypes.MouseUp, { 
      button: e.button,
      x: e.clientX,
      y: e.clientY
    });
  }
}

function shootFireball(towardPosition) {
  sendPackage(MessageTypes.KeyPressed, { 
    action: PlayerActions.SHOOT_PROJECTILE, 
    start: playerCharacter.position, 
    aim: { x: towardPosition.x, y: towardPosition.y }
  });
}

function clearCursors() {
  cursorContext.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
}

function updateCursors() {
  clearCursors();
  drawCursors();
}

function drawCursors() {
  const cursors = [
    {
      type: 'SELECTED',
      source: './images/SelectionCursorSelected.png',
      tx: (cursorCanvas.selectedTileCoords && cursorCanvas.selectedTileCoords.tx) || 0,
      ty: (cursorCanvas.selectedTileCoords && cursorCanvas.selectedTileCoords.ty) || 0
    },
  ];
  if (gameMode === MODE_EDIT) {
    cursors.push({
      type: 'FOCUSED',
      source: './images/SelectionCursorFocused.png',
      tx: (cursorCanvas.focusedTileCoords && cursorCanvas.focusedTileCoords.tx) || 0,
      ty: (cursorCanvas.focusedTileCoords && cursorCanvas.focusedTileCoords.ty) || 0
    });
  }
  cursors.forEach((cursor) => {
    if (cursor.tx === null || cursor.ty === null) return;
    const cursorSource = cursor.source;
    let cursorElement = ImageLoader.get(cursorSource);
    if (!cursorElement) {
      cursorElement = new Image();
      cursorElement.src = cursorSource;
      const onImageLoad = () => {
        cursorContext.drawImage(cursorElement, cursor.tx * TILE_SCALE, cursor.ty * TILE_SCALE);
        ImageLoader.set(cursorSource, cursorElement);
        cursorElement.removeEventListener('load', onImageLoad);
      };
      // TODO: handle errors where images are not found.
      cursorElement.addEventListener('load', onImageLoad);
    } else {
      cursorContext.drawImage(cursorElement, cursor.tx * TILE_SCALE, cursor.ty * TILE_SCALE);
    }
  });
}

// Event Handler Abstractions
const tryMovePlayer = function tryMovePlayer(dir) {
  // TODO: ensure we are allowed to move in the direction we want to before attempting to move.
  const newPosition = {
    tx: playerCharacter.tx,
    ty: playerCharacter.ty,
  };
  switch (dir) {
    case 'LEFT':
      newPosition.tx = playerCharacter.tx - 1;
      break;
    case 'RIGHT':
      newPosition.tx = playerCharacter.tx + 1;
      break;
    case 'UP':
      newPosition.ty = playerCharacter.ty - 1;
      break;
    case 'DOWN':
      newPosition.ty = playerCharacter.ty + 1;
      break;
    default:
      console.log('Invalid Direction');
      break;
  }
  if (isWalkable(newPosition)) {
    playerCharacter.tx = newPosition.tx;
    playerCharacter.ty = newPosition.ty;
  } else {
    // TODO: play "can't walk" sound.
  }

  drawCanvas();
};
const isWalkable = function isWalkable(tile) {
  // tile should have at minimum: { x , y }
  if (tile.ty < 0 || tile.tx < 0) return false;

  const tileTypeAtPosition = tileMap[tile.ty][tile.tx];

  if ([TileTypes.DIRT, TileTypes.GRASS, TileTypes.BRIDGE].includes(tileTypeAtPosition)) {
    if (!sprites.filter(s => s.tx === tile.tx && s.ty === tile.ty).length > 0) { // SPRITE
      return true;
    }
  }
  return false;
};

function initEventHandlers() {
  document.onkeydown = keyDown;
  document.onkeyup = keyUp;
  document.addEventListener('mousemove', throttle(mouseMove, 50));
  document.addEventListener('click', mouseClick);
  window.onresize = handleResize;
  document.ondragstart = (e) => e.preventDefault();
  document.addEventListener('mousedown', mouseDown);
  document.addEventListener('mouseup', mouseUp)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  })
}

// server side
// function updateSprites(delta) {
//   sprites.forEach((sprite) => { // SPRITE
//     if (sprite.update) {
//       sprite.update(delta);
//     }
//   });
// }

// Initiate game
function startGame() {
  initCanvas();
  initEventHandlers();
  sendPackage(MessageTypes.Port, { levelId: 1 });
  updateLoop();
}

let loopTime = performance.now();
function updateLoop(timestamp = performance.now()) {
  if(client.socket.readyState !== WebSocket.OPEN) {
    toast("Websocket has closed.");
    // setTimeout(function() {
    //   console.log("restarting socket");
    //   delete client.playerCharacter;
    //   delete client.level;
    //   delete client.socket;
    //   for (let prop of sprites) {
    //     delete sprites[prop];
    //   }
    //   sprites.length = 0;
    //   document.querySelector('#toasts').innerHTML = null;
    //   startSocketClient();
    // }, 2500);
    return;
  }
  const delta = (timestamp - loopTime) / 1000;
  loopTime = timestamp;
  // updateSprites(delta);
  drawCanvas();

  // ensure next frame runs.
  window.requestAnimationFrame(updateLoop);
}

const sendPackage = function sendPackage(type = null, attributes = {}) {
  if (type === null) throw new Error('Package type must be specified.');

  client.socket.send(JSON.stringify(Object.assign({ type }, attributes)));
};

startSocketClient(); // TODO: Need to monitor and reconnect













// TODO: Move to separate module
/// UI Manager

const UIParent = document.getElementById('UI_Overlay');
UIParent.visibleChildren = [document.getElementById('UI_Login')];

function showUI(uiElementId) {
  // Get UI element
  const uiElement = document.getElementById(uiElementId);

  // if nothing is returned or if it's already visible we don't need to do anything
  if(!uiElement || UIParent.visibleChildren.includes(uiElement)) return;

  // otherwise remove the hidden class
  uiElement.classList.remove("hidden");
  UIParent.classList.remove("hidden");

  // ... and keep track.
  UIParent.visibleChildren.push(uiElement);
}

function hideUI(uiElement) {
  
  if(!uiElement) return;

  if(typeof uiElement === typeof "") {
    uiElement = document.querySelector(`#${uiElement}`);
  }

  uiElement.classList.add("hidden");

  const index = UIParent.visibleChildren.indexOf(uiElement);
  if(index !== -1) {
    UIParent.visibleChildren.splice(index, 1);
  }

  if(UIParent.visibleChildren.length === 0) UIParent.classList.add("hidden");

}

// UI Implementation

const loginButton = document.getElementById('UI_Login__Button');

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("Login button clicked.");
  const username = document.getElementById('UI_Username__Input').value;
  const password = document.getElementById('UI_Password__Input').value;
  sendLogin(username, password);
})