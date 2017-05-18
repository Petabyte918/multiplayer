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


// Message Types
const MSG_TYPE_WHO = 'WHO';
const MSG_TYPE_AUTHENTICATION = 'AUTHENTICATION';
const MSG_TYPE_PORT = 'PORT';

// Modes
const MODE_PLAY = 'PLAY';
const MODE_EDIT = 'EDIT';

// Application globals
const client = {
  token: undefined,
};
const TILE_SCALE = 32;
const gameMode = MODE_PLAY;

// Tile Types
const TileType = {
  DIRT: 'Dirt',
  GRASS: 'Grass',
  ROCK: 'Rock',
  WATER: 'Water',
  PIT: 'Pit',
  BRIDGE: 'Bridge',
};
const SpriteType = {
  CHEST: 'Chest',
  FIREBALL: 'Fireball'
};
const ColorMap = new Map();
ColorMap.set(TileType.DIRT, '#562508');
ColorMap.set(TileType.GRASS, 'green');
ColorMap.set(TileType.ROCK, 'grey');
ColorMap.set(TileType.WATER, 'blue');
ColorMap.set(TileType.PIT, 'black');
ColorMap.set(TileType.BRIDGE, '#7c4b2e');
ColorMap.set(SpriteType.CHEST, '#d8c741');

const SpriteMap = new Map();
SpriteMap.set(SpriteType.CHEST, './images/ChestClosed.png');
SpriteMap.set(SpriteType.FIREBALL, './images/FireballStatic.png');

const ImageMap = new Map();

// level map
let levelMap = [];

/* eslint-disable no-undef */
let playerCharacter = null;
/* eslint-enable no-undef */

const sprites = [];

// Start socket
function startSocketClient() {
  // TODO: This may cause conflicts if called more than once.
  const sock = client.socket || new WebSocket('ws://localhost:8080/');
  client.socket = sock;

  sock.onmessage = function onmessage(event) {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case MSG_TYPE_WHO:
        sendPackage(MSG_TYPE_WHO, { who: 'James:df8c8023ae' });
        break;
      case MSG_TYPE_AUTHENTICATION:
        if (message.success === true) {
          LoginSucceeded(message.token);
        } else {
          LoginFailed(message.error);
        }
        break;
      case MSG_TYPE_PORT:
        console.log('PORTED');
        if (message.success === true) {
          levelMap = message.level.tileMap;
          sprites.push(...message.level.sprites);
          if (!playerCharacter) {
            /* eslint-disable no-undef */
            playerCharacter = new PlayerCharacter(
              'James',
              message.level.start.tx,
              message.level.start.ty
            );
            /* eslint-enable no-undef */
          } else {
            playerCharacter.setPosition(message.level.start);
          }
          sprites.push(playerCharacter);
          // TODO: Can we determine if this is a first load?
          drawCanvas();
        }
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
function LoginSucceeded(token = undefined) {
  if (!token) return;
  client.token = token; // Save to global for later use.
  toast('Welcome', 'Connected to server.');
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
  if (levelMap.length > 0) drawCanvas(); // TODO: Put this in a timed loop?
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
  for (let r = 0; r < levelMap.length; r += 1) {
    const row = levelMap[r];
    for (let c = 0; c < row.length; c += 1) {
      const cell = row[c];
      tileContext.fillStyle = ColorMap.get(cell);
      tileContext.fillRect(c * TILE_SCALE, r * TILE_SCALE, TILE_SCALE, TILE_SCALE);
    }
  }
};

const drawSprites = function drawSprites() {
  // TODO: Check differences. Only erase previous sprites if they moved and redraw???

  // but for now, lets just clear sprites and redraw
  spriteContext.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);

  sprites.forEach((sprite) => {
    const color = sprite.color || ColorMap.get(sprite.type) || '#FFFFFF';

    /* eslint-disable no-undef */
    if (sprite instanceof FireBall) {
      drawSprite(sprite.x, sprite.y, SpriteMap.get(SpriteType.FIREBALL));
    } else if (sprite instanceof PlayerCharacter) {
    /* eslint-enable no-undef */
      drawCircle(sprite.tx, sprite.ty, (TILE_SCALE / 2) - 2, color);
    } else {
      drawSprite(sprite.tx * TILE_SCALE, sprite.ty * TILE_SCALE, SpriteMap.get(sprite.type));
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

const drawSprite = function drawSprite(x, y, imageSource) {
  // const imgElement = document.querySelector('#image-loader');

  let imgElement = ImageMap.get(imageSource);

  if (!imgElement) {
    imgElement = new Image();
    imgElement.src = imageSource;
    const onImageLoad = () => {
      spriteContext.drawImage(imgElement, x, y);
      ImageMap.set(imageSource, imgElement);
      imgElement.removeEventListener('load', onImageLoad);
    };
    // TODO: handle errors where images are not found.
    imgElement.addEventListener('load', onImageLoad);
  } else {
    spriteContext.drawImage(imgElement, x, y);
  }
};

// Low Level Event Handlers
function keyDown(e) {
  // a = 65, w = 87, d = 68, s = 83
  // left = 37, up = 38, right = 39, down = 40
  switch (e.keyCode) {
    case 65:
    case 37:
      // move left
      tryMovePlayer('LEFT');
      break;
    case 87:
    case 38:
      // move up
      tryMovePlayer('UP');
      break;
    case 68:
    case 39:
      // move right
      tryMovePlayer('RIGHT');
      break;
    case 83:
    case 40:
      // move down
      tryMovePlayer('DOWN');
      break;
    case 16:
      // SHIFT
      break;
    default:
      // Just in case we want to set up other keys,
      // our console will tell us the key code we need to use.
      console.log(e.keyCode);
      break;
  }
}
function keyUp(e) {
  switch (e.keyCode) {
    case 16:
      // SHIFT
      break;
    default:
      break;
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
function docClick(e) {
  // target
  // const target = e.target; // TODO: determine why events are not bubbling/capturing
  // TODO: getTileAt();
  const fireball = new FireBall({ x: playerCharacter.tx * TILE_SCALE, y: playerCharacter.ty * TILE_SCALE }, { x: e.clientX, y: e.clientY }, 32 * 18);
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
    let cursorElement = ImageMap.get(cursorSource);
    if (!cursorElement) {
      cursorElement = new Image();
      cursorElement.src = cursorSource;
      const onImageLoad = () => {
        cursorContext.drawImage(cursorElement, cursor.tx * TILE_SCALE, cursor.ty * TILE_SCALE);
        ImageMap.set(cursorSource, cursorElement);
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

  const tileTypeAtPosition = levelMap[tile.ty][tile.tx];

  if ([TileType.DIRT, TileType.GRASS, TileType.BRIDGE].includes(tileTypeAtPosition)) {
    if (!sprites.filter(s => s.tx === tile.tx && s.ty === tile.ty).length > 0) {
      return true;
    }
  }
  return false;
};

function initEventHandlers() {
  document.addEventListener('keydown', keyDown);
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('click', docClick); // TODO: handle different clicks for different targets.
  window.onresize = handleResize;
}

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
  sendPackage(MSG_TYPE_PORT, { level: 123 });
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
