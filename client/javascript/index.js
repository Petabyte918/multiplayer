
/* ////////// TODOs /////////
 1. Resize canvas if screen resizes.
 */ // ////// TODOs //////////


// canvas
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Message Types
const MSG_TYPE_WHO = 'WHO';
const MSG_TYPE_AUTHENTICATION = 'AUTHENTICATION';
const MSG_TYPE_PORT = 'PORT';

// Application globals
const client = {
  token: undefined,
};
const TILE_SCALE = 32;

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
};
const ColorMap = new Map();
ColorMap.set(TileType.DIRT, '#562508');
ColorMap.set(TileType.GRASS, 'green');
ColorMap.set(TileType.ROCK, 'grey');
ColorMap.set(TileType.WATER, 'blue');
ColorMap.set(TileType.PIT, 'black');
ColorMap.set(TileType.BRIDGE, '#7c4b2e');
ColorMap.set(SpriteType.CHEST, '#d8c741');

const ImageMap = new Map();
ImageMap.set(SpriteType.CHEST, './images/ChestClosed.png');

// level map
let levelMap = [];

/* eslint-disable no-undef */
const playerCharacter = new PlayerCharacter();
/* eslint-enable no-undef */

const sprites = [];
sprites.push(playerCharacter);

// Start socket
function startSocketClient() {
  // TODO: This may cause conflicts if called more than once.
  const sock = client.socket || new WebSocket('ws://localhost:8080/');
  client.socket = sock;

  sock.onmessage = function (event) {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case MSG_TYPE_WHO:
        sock.send(JSON.stringify({ type: MSG_TYPE_WHO, who: 'James:df8c8023ae' }));
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
          levelMap = message.tileMap;
          sprites.push(...message.sprites);
          // TODO: Can we determine if this is a first load?
          drawCanvas();
        }
        break;
      default:
        console.log('Message type not recognized: ', event.data);
        break;
    }
  };

  sock.onclose = function (something) {
    console.log('Something -> ', something);
  };
  sock.onerror = function (something) {
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
  alert('YOU FAILED!!!');
  alert("PS. Who doesn't hate alerts?");
  alert('Oh and the error was: ', error);
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
    toastDiv.classList.add('closing');
    setTimeout(() => {
      toastDiv.parentElement.removeChild(toastDiv);
    }, 2500);
  });

  document.querySelector('#toasts').appendChild(toastDiv);
}


// Set up canvas: (Note: may need to use this later to reinit when screen size changes.)
function initCanvas() {
  canvas.width = screen.availWidth;
  canvas.height = screen.availHeight;

  if (levelMap.length > 0) drawCanvas(); // TODO: Put this in a timed loop?
}

// Draw canvas
function drawCanvas() {
  ctx.fillStyle = 'black';
  // clear bg
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // drawbackground tiles
  for (let r = 0; r < levelMap.length; r++) {
    const row = levelMap[r];
    for (let c = 0; c < row.length; c++) {
      const cell = row[c];
      ctx.fillStyle = ColorMap.get(cell);
      ctx.fillRect(c * TILE_SCALE, r * TILE_SCALE, TILE_SCALE, TILE_SCALE);
    }
  }

  // draw sprites
  for (const sprite of sprites) {
    const color = sprite.color || ColorMap.get(sprite.type) || '#FFFFFF';
    /* eslint-disable no-undef */
    if (sprite instanceof PlayerCharacter) {
    /* eslint-enable no-undef */
      drawCircle(sprite.x, sprite.y, (TILE_SCALE / 2) - 2, color);
    } else {
      drawSprite(sprite.x, sprite.y, ImageMap.get(sprite.type));
    }
  }

  // TODO: draw HUD
}

// Canvas helper functions
const drawCircle = function drawCircle(x, y, radius = TILE_SCALE, fill = '#FFFFFF', strokeColor = '#000000') {
  const centerX = (x * TILE_SCALE) + (TILE_SCALE / 2);
  const centerY = (y * TILE_SCALE) + (TILE_SCALE / 2);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
};

const drawSprite = function drawSprite(x, y, imageSource) {
  const imgElement = document.querySelector('#image-loader');
  if (imgElement.src !== imageSource) {
    console.log(imgElement.src, imageSource);
    imgElement.src = imageSource;
    const onImageLoad = () => {
      console.log('Loaded image', imgElement instanceof HTMLImageElement);
      ctx.drawImage(imgElement, x * TILE_SCALE, y * TILE_SCALE);
      imgElement.removeEventListener('load', onImageLoad);
    };
    imgElement.addEventListener('load', onImageLoad);
  } else {
    ctx.drawImage(imgElement, x * TILE_SCALE, y * TILE_SCALE);
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
    default:
      // Just in case we want to set up other keys,
      // our console will tell us the key code we need to use.
      console.log(e.keyCode);
      break;
  }
}
function mouseMove(e) {
}
function docClick(e) {
  console.log('clicking!!!!');
  // target
  // const target = e.target;
}

// Event Handler Abstractions
const tryMovePlayer = function tryMovePlayer(dir) {
  // TODO: ensure we are allowed to move in the direction we want to before attempting to move.
  const newPosition = {
    x: playerCharacter.x,
    y: playerCharacter.y,
  };
  switch (dir) {
    case 'LEFT':
      newPosition.x = playerCharacter.x - 1;
      break;
    case 'RIGHT':
      newPosition.x = playerCharacter.x + 1;
      break;
    case 'UP':
      newPosition.y = playerCharacter.y - 1;
      break;
    case 'DOWN':
      newPosition.y = playerCharacter.y + 1;
      break;
    default:
      console.log('Invalid Direction');
      break;
  }
  if (isWalkable(newPosition)) {
    playerCharacter.x = newPosition.x;
    playerCharacter.y = newPosition.y;
  } else {
    // TODO: play "can't walk" sound.
  }

  drawCanvas();
};
const isWalkable = function isWalkable(tile) {
  // tile should have at minimum: { x , y }
  if (tile.y < 0 || tile.x < 0) return false;
  const tileTypeAtPosition = levelMap[tile.y][tile.x];
  if ([TileType.DIRT, TileType.GRASS, TileType.BRIDGE].includes(tileTypeAtPosition)) {
    if (!sprites.filter(s => s.x === tile.x && s.y === tile.y).length > 0) {
      return true;
    }
  }
  return false;
};

function initEventHandlers() {
  document.addEventListener('keydown', keyDown);
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('click', docClick); // TODO: handle different clicks for different targets.
}


// Initiate game
function startGame() {
  initCanvas();
  initEventHandlers();
  console.log('Sending a socket event');
  client.socket.send(JSON.stringify({
    type: MSG_TYPE_PORT,
    levelId: 123,
  }));
}

startSocketClient(); // TODO: Need to monitor and reconnect
