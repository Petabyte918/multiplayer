import FireBall from '../../classes/client/FireBall';
import PlayerCharacter from '../../classes/shared/PlayerCharacter';

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

import MessageTypes from '../../classes/MessageTypes';
import GameSettings from '../../classes/GameSettings';


// Modes
const MODE_PLAY = 'PLAY';
const MODE_EDIT = 'EDIT';

// Application globals
const client = {
  token: undefined,
};
const TILE_SCALE = GameSettings.TILE_SCALE;
const gameMode = MODE_PLAY;

// Tile Types
const TileTypes = {
  DIRT: 0,
  GRASS: 1,
  ROCK: 2,
  WATER: 3,
  PIT: 4,
  BRIDGE: 5,
};
const SpriteTypes = {
  CHEST: 0,
  FIREBALL: 1,
  PLAYER: 2,
};
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
let sprites = [];

// Start socket
function startSocketClient() {
  // TODO: Does this cause conflicts if called more than once?
  const sock = client.socket || new WebSocket('ws://localhost:8080/');
  client.socket = sock;

  sock.onmessage = function onmessage(event) {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case MessageTypes.Who:
        sendPackage(MessageTypes.Who, { who: 'James:df8c8023ae' });
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
          console.log(message.level);
          tileMap = message.level.tileMap;
          sprites.push(...message.level.sprites);
          
          playerCharacter.setPosition(message.level.start);

          sprites.push(playerCharacter);
          // TODO: Can we determine if this is a first load?
          drawCanvas();
        }
        break;
      case MessageTypes.MoveTo:
        console.log("Attempted to move: ", message);
        playerCharacter.setPosition(message);
        drawSprites();
        break;
      default:
        console.log('Message type not recognized: ', event.data);
        break;
    }
  };

  sock.onclose = function onclose(something) {
    console.log('Something -> ', something);
  };
  sock.onerror = function onerror(something) {
    console.log('Some Error -> ', something);
  };
}

// Pipeline message handlers
function LoginSucceeded(message = {}) {
  if (!message.token) return;
  client.token = message.token; // Save to global for later use.
  toast('Welcome', 'Connected to server.');

  playerCharacter = Object.assign(new PlayerCharacter(), JSON.parse(message.playerCharacter));
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

  sprites.forEach((sprite) => {
    const color = sprite.color || TileColorMap.get(sprite.type) || '#FFFFFF';

    if (sprite instanceof FireBall) {
      drawSprite(sprite.x, sprite.y, SpriteTextureMap.get(SpriteTypes.FIREBALL), sprite.angle);
    } else if (sprite instanceof PlayerCharacter) {
      drawSprite(sprite.position.x, sprite.position.y, SpriteTextureMap.get(SpriteTypes.PLAYER), sprite.angle || 0);
      //drawCircle(sprite.tx, sprite.ty, (TILE_SCALE / 2) - 2, color);
    } else {
      drawSprite(sprite.tx * TILE_SCALE, sprite.ty * TILE_SCALE, SpriteTextureMap.get(sprite.type));
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
    rotAngle = angle; // (angle * Math.PI) / 180;
  }
  if (!imgElement) {
    imgElement = new Image();
    imgElement.src = imageSource;
    const onImageLoad = () => {
      spriteContext.translate(x, y);
      spriteContext.rotate(rotAngle);
      spriteContext.drawImage(imgElement, 0, 0);
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
    spriteContext.drawImage(imgElement, 0, 0);
    spriteContext.rotate(-rotAngle);
    spriteContext.translate(-x, -y);
  }
};

function keyPressed(keyName) {
  if (keyName.indexOf('UNMAPPED') === 0) {
    const code = parseInt(keyName.split(':')[1], 10);
    console.log(`Unmapped key pressed: ${code}`);
  } else {
    client.socket.send(JSON.stringify({ type: MessageTypes.KeyPressed, action: keyName }));
  }
}
function keyReleased(keyName) {
  if (keyName.indexOf('UNMAPPED') === 0) {
    const code = parseInt(keyName.split(':')[1], 10);
    console.log(`Unmapped key released: ${code}`);
  } else {
    client.socket.send(JSON.stringify({ type: MessageTypes.KeyReleased, action: keyName }));
  }
}

const keyMap = [
  { code: 65, action: 'LEFT ' }, // a
  { code: 65, action: 'LEFT' },
  { code: 37, action: 'LEFT' }, // left arrow
  { code: 87, action: 'UP' }, // w
  { code: 38, action: 'UP' }, // up arrow
  { code: 68, action: 'RIGHT' }, // d
  { code: 39, action: 'RIGHT' }, // right arrow
  { code: 83, action: 'DOWN' }, // s
  { code: 40, action: 'DOWN' }, // down arrow
  { code: 16, action: 'SHIFT' },
];

// Low Level Event Handlers
function keyDown(e) {
  const keyInfo = keyMap.find(k => k.code === e.keyCode);
  if (keyInfo) {
    keyPressed(keyInfo.action);
  } else {
    keyPressed(`UNMAPPED:${e.keyCode}`);
  }
}
function keyUp(e) {
  const keyInfo = keyMap.find(k => k.code === e.keyCode);
  if (keyInfo) {
    keyReleased(keyInfo.action);
  } else {
    keyReleased(`UNMAPPED:${e.keyCode}`);
  }
}
function mouseMove(e) {
  cursorCanvas.focusedTileCoords = {
    tx: Math.floor(e.clientX / TILE_SCALE),
    ty: Math.floor(e.clientY / TILE_SCALE)
  };

  clearCursors();
  drawCursors();
}
function mouseClick(e) {
  // fireball is flavor like image and particle systems
  // fireball should inherit from projectile // projectile manages speed and angle and updates position
  // projectile should inherit from sprite // sprite is an object with a visual representation that shows up above the tiled map
  // sprite should inherit from gameobject // Gameobject is something that belongs to a map. It has a position, but does not necessarily have a representation.
  const fireball = new FireBall(
    { x: playerCharacter.tx * TILE_SCALE, y: playerCharacter.ty * TILE_SCALE }, // start
    { x: e.clientX, y: e.clientY }, // aim at
    32 * 18 // speed
  );
  fireball.delete = function deleteFireball() {
    sprites = sprites.filter(s => s !== this);
  };
  sprites.push(fireball);
  drawCanvas();
  cursorCanvas.selectedTileCoords = getCanvasCoords({ x: e.clientX, y: e.clientY });
  updateCursors();
}

function getCanvasCoords(info) {
  return {
    tx: Math.floor(info.x / TILE_SCALE) || 0,
    ty: Math.floor(info.y / TILE_SCALE) || 0,
  };
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
    if (!sprites.filter(s => s.tx === tile.tx && s.ty === tile.ty).length > 0) {
      return true;
    }
  }
  return false;
};

function initEventHandlers() {
  document.onkeydown = keyDown;
  document.onkeyup = keyUp;
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('click', mouseClick);
  window.onresize = handleResize;
}

// server side
function updateSprites(delta) {
  sprites.forEach((sprite) => {
    if (sprite.update) {
      sprite.update(delta);
    }
  });
}

// Initiate game
function startGame() {
  initCanvas();
  initEventHandlers();
  sendPackage(MessageTypes.Port, { levelId: 1 });
  updateLoop();
}

let loopTime = performance.now();
function updateLoop(timestamp = performance.now()) {
  const delta = (timestamp - loopTime) / 1000;
  loopTime = timestamp;
  updateSprites(delta);
  drawCanvas();
  window.requestAnimationFrame(updateLoop);
}

const sendPackage = function sendPackage(type = null, attributes = {}) {
  if (type === null) throw new Error('Package type must be specified.');

  client.socket.send(JSON.stringify(Object.assign({ type }, attributes)));
};

startSocketClient(); // TODO: Need to monitor and reconnect
