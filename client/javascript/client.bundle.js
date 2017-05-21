/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Character2 = __webpack_require__(19);

var _Character3 = _interopRequireDefault(_Character2);

var _GameSettings = __webpack_require__(15);

var _GameSettings2 = _interopRequireDefault(_GameSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerCharacter = function (_Character) {
  _inherits(PlayerCharacter, _Character);

  function PlayerCharacter() {
    var characterName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'BoOoOoOob';
    var startX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var startY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    _classCallCheck(this, PlayerCharacter);

    var _this = _possibleConstructorReturn(this, (PlayerCharacter.__proto__ || Object.getPrototypeOf(PlayerCharacter)).call(this));

    _this.name = characterName;
    _this.level = 1;
    _this.strength = 1;
    _this.health = 50;

    _this.tx = startX;
    _this.ty = startY;

    _this.color = '#3aadd1'; // TODO: Do we want to keep this property?
    return _this;
  }

  _createClass(PlayerCharacter, [{
    key: 'setPosition',
    value: function setPosition(position) {
      _get(PlayerCharacter.prototype.__proto__ || Object.getPrototypeOf(PlayerCharacter.prototype), 'setPosition', this).call(this, position);
      this.tx = Math.round(this.position.x / _GameSettings2.default.TILE_SCALE);
      this.ty = Math.round(this.position.y / _GameSettings2.default.TILE_SCALE);
      if (this.tx < 0) this.tx = 0;
      if (this.ty < 0) this.ty = 0;
    }
  }]);

  return PlayerCharacter;
}(_Character3.default);

;

exports.default = PlayerCharacter;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _FireBall = __webpack_require__(13);

var _FireBall2 = _interopRequireDefault(_FireBall);

var _PlayerCharacter = __webpack_require__(9);

var _PlayerCharacter2 = _interopRequireDefault(_PlayerCharacter);

var _MessageTypes = __webpack_require__(18);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _GameSettings = __webpack_require__(15);

var _GameSettings2 = _interopRequireDefault(_GameSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// tile canvas
var tileCanvas = document.querySelector('#tileCanvas');
var tileContext = tileCanvas.getContext('2d');
// sprite canvas
var spriteCanvas = document.querySelector('#spriteCanvas');
var spriteContext = spriteCanvas.getContext('2d');
// UI canvas / div ---- // TODO???
// Cursor canvas
var cursorCanvas = document.querySelector('#cursorCanvas');
var cursorContext = cursorCanvas.getContext('2d');

// Modes
var MODE_PLAY = 'PLAY';
var MODE_EDIT = 'EDIT';

// Application globals
var client = {
  token: undefined
};
var TILE_SCALE = _GameSettings2.default.TILE_SCALE;
var gameMode = MODE_PLAY;

// Tile Types
var TileTypes = {
  DIRT: 0,
  GRASS: 1,
  ROCK: 2,
  WATER: 3,
  PIT: 4,
  BRIDGE: 5
};
var SpriteTypes = {
  CHEST: 0,
  FIREBALL: 1,
  PLAYER: 2
};
var TileColorMap = new Map();
TileColorMap.set(TileTypes.DIRT, '#5b2607');
TileColorMap.set(TileTypes.GRASS, 'green');
TileColorMap.set(TileTypes.ROCK, 'grey');
TileColorMap.set(TileTypes.WATER, 'blue');
TileColorMap.set(TileTypes.PIT, 'black');
TileColorMap.set(TileTypes.BRIDGE, '#7c4b2e');

var SpriteTextureMap = new Map();
SpriteTextureMap.set(SpriteTypes.CHEST, './images/ChestClosed.png');
SpriteTextureMap.set(SpriteTypes.FIREBALL, './images/FireballStatic.png');
SpriteTextureMap.set(SpriteTypes.PLAYER, './images/PlayerOverhead.png');

var ImageLoader = new Map();

var playerCharacter = null;

// level tiles / objects for map the player is currently on.
var tileMap = [];
var sprites = [];

// Start socket
function startSocketClient() {
  // TODO: Does this cause conflicts if called more than once?
  var sock = client.socket || new WebSocket('ws://localhost:8080/');
  client.socket = sock;

  sock.onmessage = function onmessage(event) {
    var message = JSON.parse(event.data);

    switch (message.type) {
      case _MessageTypes2.default.Who:
        sendPackage(_MessageTypes2.default.Who, { who: 'James:df8c8023ae' });
        break;
      case _MessageTypes2.default.Authentication:
        if (message.success === true) {
          LoginSucceeded(message);
        } else {
          LoginFailed(message.error);
        }
        break;
      case _MessageTypes2.default.Port:
        console.log('PORTED');
        if (message.success === true) {
          var _sprites;

          console.log(message.level);
          tileMap = message.level.tileMap;
          (_sprites = sprites).push.apply(_sprites, _toConsumableArray(message.level.sprites));

          playerCharacter.setPosition(message.level.start);

          sprites.push(playerCharacter);
          // TODO: Can we determine if this is a first load?
          drawCanvas();
        }
        break;
      case _MessageTypes2.default.MoveTo:
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
function LoginSucceeded() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!message.token) return;
  client.token = message.token; // Save to global for later use.
  toast('Welcome', 'Connected to server.');

  playerCharacter = Object.assign(new _PlayerCharacter2.default(), JSON.parse(message.playerCharacter));
  // TODO: Show loading message.
  startGame();
}

function LoginFailed() {
  var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'not defined';

  /* eslint-disable no-alert */
  toast('YOU FAILED!!!');
  toast("PS. Who doesn't hate alerts?");
  toast('Oh and the error was: ', error);
}

function toast() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Toast';
  var message = arguments[1];

  // TODO: Develop/borrow toaster alert

  var t = document.querySelector('#toast__template');

  var tToast = t.content.querySelector('.toast');
  var toastDiv = document.importNode(tToast, true);

  var tClose = toastDiv.querySelector('.toast__close');
  var tTitle = toastDiv.querySelector('.toast__title');
  var tMessage = toastDiv.querySelector('.toast__message');

  tTitle.textContent = title;
  tMessage.textContent = message;
  tClose.addEventListener('click', function (e) {
    // Start CSS animation. Takes 2.5 seconds.
    toastDiv.classList.add('closing');
    // Remove after completely faded out. (2.5 seconds)
    setTimeout(function () {
      toastDiv.parentElement.removeChild(toastDiv);
    }, 2500);
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

var drawBackground = function drawBackground() {
  // TODO: Rewrite using array functions for looping.
  for (var r = 0; r < tileMap.length; r += 1) {
    var row = tileMap[r];
    for (var c = 0; c < row.length; c += 1) {
      var cell = row[c];
      tileContext.fillStyle = TileColorMap.get(cell);
      tileContext.fillRect(c * TILE_SCALE, r * TILE_SCALE, TILE_SCALE, TILE_SCALE);
    }
  }
};

var drawSprites = function drawSprites() {
  // TODO: Check differences. Only erase previous sprites if they moved and redraw???

  // but for now, lets just clear sprites and redraw
  spriteContext.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);

  sprites.forEach(function (sprite) {
    var color = sprite.color || TileColorMap.get(sprite.type) || '#FFFFFF';

    if (sprite instanceof _FireBall2.default) {
      drawSprite(sprite.x, sprite.y, SpriteTextureMap.get(SpriteTypes.FIREBALL), sprite.angle);
    } else if (sprite instanceof _PlayerCharacter2.default) {
      drawSprite(sprite.position.x, sprite.position.y, SpriteTextureMap.get(SpriteTypes.PLAYER), sprite.angle || 0);
      //drawCircle(sprite.tx, sprite.ty, (TILE_SCALE / 2) - 2, color);
    } else {
      drawSprite(sprite.tx * TILE_SCALE, sprite.ty * TILE_SCALE, SpriteTextureMap.get(sprite.type));
    }
  });
};

// Canvas helper functions
var drawCircle = function drawCircle(x, y) {
  var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TILE_SCALE;
  var fill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#FFFFFF';
  var strokeColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#000000';

  var centerX = x * TILE_SCALE + TILE_SCALE / 2;
  var centerY = y * TILE_SCALE + TILE_SCALE / 2;

  tileContext.beginPath();
  tileContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  tileContext.fillStyle = fill;
  tileContext.fill();
  tileContext.lineWidth = 1;
  tileContext.strokeStyle = strokeColor;
  tileContext.stroke();
};

var drawSprite = function drawSprite(x, y, imageSource) {
  var angle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  // const imgElement = document.querySelector('#image-loader');

  var imgElement = ImageLoader.get(imageSource);
  var rotAngle = 0;
  if (angle) {
    rotAngle = angle; // (angle * Math.PI) / 180;
  }
  if (!imgElement) {
    imgElement = new Image();
    imgElement.src = imageSource;
    var onImageLoad = function onImageLoad() {
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
    var code = parseInt(keyName.split(':')[1], 10);
    console.log('Unmapped key pressed: ' + code);
  } else {
    client.socket.send(JSON.stringify({ type: _MessageTypes2.default.KeyPressed, action: keyName }));
  }
}
function keyReleased(keyName) {
  if (keyName.indexOf('UNMAPPED') === 0) {
    var code = parseInt(keyName.split(':')[1], 10);
    console.log('Unmapped key released: ' + code);
  } else {
    client.socket.send(JSON.stringify({ type: _MessageTypes2.default.KeyReleased, action: keyName }));
  }
}

var keyMap = [{ code: 65, action: 'LEFT ' }, // a
{ code: 65, action: 'LEFT' }, { code: 37, action: 'LEFT' }, // left arrow
{ code: 87, action: 'UP' }, // w
{ code: 38, action: 'UP' }, // up arrow
{ code: 68, action: 'RIGHT' }, // d
{ code: 39, action: 'RIGHT' }, // right arrow
{ code: 83, action: 'DOWN' }, // s
{ code: 40, action: 'DOWN' }, // down arrow
{ code: 16, action: 'SHIFT' }];

// Low Level Event Handlers
function keyDown(e) {
  var keyInfo = keyMap.find(function (k) {
    return k.code === e.keyCode;
  });
  if (keyInfo) {
    keyPressed(keyInfo.action);
  } else {
    keyPressed('UNMAPPED:' + e.keyCode);
  }
}
function keyUp(e) {
  var keyInfo = keyMap.find(function (k) {
    return k.code === e.keyCode;
  });
  if (keyInfo) {
    keyReleased(keyInfo.action);
  } else {
    keyReleased('UNMAPPED:' + e.keyCode);
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
  var fireball = new _FireBall2.default({ x: playerCharacter.tx * TILE_SCALE, y: playerCharacter.ty * TILE_SCALE }, // start
  { x: e.clientX, y: e.clientY }, // aim at
  32 * 18 // speed
  );
  fireball.delete = function deleteFireball() {
    var _this = this;

    sprites = sprites.filter(function (s) {
      return s !== _this;
    });
  };
  sprites.push(fireball);
  drawCanvas();
  cursorCanvas.selectedTileCoords = getCanvasCoords({ x: e.clientX, y: e.clientY });
  updateCursors();
}

function getCanvasCoords(info) {
  return {
    tx: Math.floor(info.x / TILE_SCALE) || 0,
    ty: Math.floor(info.y / TILE_SCALE) || 0
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
  var cursors = [{
    type: 'SELECTED',
    source: './images/SelectionCursorSelected.png',
    tx: cursorCanvas.selectedTileCoords && cursorCanvas.selectedTileCoords.tx || 0,
    ty: cursorCanvas.selectedTileCoords && cursorCanvas.selectedTileCoords.ty || 0
  }];
  if (gameMode === MODE_EDIT) {
    cursors.push({
      type: 'FOCUSED',
      source: './images/SelectionCursorFocused.png',
      tx: cursorCanvas.focusedTileCoords && cursorCanvas.focusedTileCoords.tx || 0,
      ty: cursorCanvas.focusedTileCoords && cursorCanvas.focusedTileCoords.ty || 0
    });
  }
  cursors.forEach(function (cursor) {
    if (cursor.tx === null || cursor.ty === null) return;
    var cursorSource = cursor.source;
    var cursorElement = ImageLoader.get(cursorSource);
    if (!cursorElement) {
      cursorElement = new Image();
      cursorElement.src = cursorSource;
      var onImageLoad = function onImageLoad() {
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
var tryMovePlayer = function tryMovePlayer(dir) {
  // TODO: ensure we are allowed to move in the direction we want to before attempting to move.
  var newPosition = {
    tx: playerCharacter.tx,
    ty: playerCharacter.ty
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
var isWalkable = function isWalkable(tile) {
  // tile should have at minimum: { x , y }
  if (tile.ty < 0 || tile.tx < 0) return false;

  var tileTypeAtPosition = tileMap[tile.ty][tile.tx];

  if ([TileTypes.DIRT, TileTypes.GRASS, TileTypes.BRIDGE].includes(tileTypeAtPosition)) {
    if (!sprites.filter(function (s) {
      return s.tx === tile.tx && s.ty === tile.ty;
    }).length > 0) {
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
  sprites.forEach(function (sprite) {
    if (sprite.update) {
      sprite.update(delta);
    }
  });
}

// Initiate game
function startGame() {
  initCanvas();
  initEventHandlers();
  sendPackage(_MessageTypes2.default.Port, { levelId: 1 });
  updateLoop();
}

var loopTime = performance.now();
function updateLoop() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : performance.now();

  var delta = (timestamp - loopTime) / 1000;
  loopTime = timestamp;
  updateSprites(delta);
  drawCanvas();
  window.requestAnimationFrame(updateLoop);
}

var sendPackage = function sendPackage() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (type === null) throw new Error('Package type must be specified.');

  client.socket.send(JSON.stringify(Object.assign({ type: type }, attributes)));
};

startSocketClient(); // TODO: Need to monitor and reconnect

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FireBall = function FireBall() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _this = this;

  var aim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;

  // https://gist.github.com/conorbuck/2606166
  this.angle = Math.atan2(aim.y - start.y, aim.x - start.x); // if you want degrees, do this too!!! * 180 / Math.PI;

  this.x = start.x - 16;
  this.y = start.y - 16;
  this.velocity = velocity;

  this.livesUntil = performance.now() + 1.5 * 1000; // 3 seconds.

  this.setPosition = function (position) {
    _this.x = position.x;
    _this.y = position.y;
  };

  this.update = function (delta) {
    if (performance.now() > _this.livesUntil) {
      _this.delete();
    }
    // SOH, CAH, TOA
    var deltaY = Math.sin(_this.angle) * _this.velocity * delta;
    var deltaX = Math.cos(_this.angle) * _this.velocity * delta;
    _this.x += deltaX;
    _this.y += deltaY;
  };
};

module.exports = FireBall;

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameSettings = {
  TILE_SCALE: 32
};

exports.default = GameSettings;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function GameObject() {
  _classCallCheck(this, GameObject);

  this.position = {
    x: 0,
    y: 0
  };
};

exports.default = GameObject;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(16);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sprite = function (_GameObject) {
  _inherits(Sprite, _GameObject);

  function Sprite() {
    _classCallCheck(this, Sprite);

    return _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).apply(this, arguments));
  }

  _createClass(Sprite, [{
    key: 'setPosition',
    value: function setPosition(position) {
      this.position.x = position.x;
      this.position.y = position.y;
      if (this.position.x < 0) this.position.x = 0;
      if (this.position.y < 0) this.position.y = 0;
    }
  }]);

  return Sprite;
}(_GameObject3.default);

exports.default = Sprite;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MessageTypes = {
  Who: 'WHO',
  Authentication: 'AUTHENTICATION',
  Port: 'PORT',
  KeyPressed: 'KEY_PRESSED',
  KeyReleased: 'KEY_RELEASED',
  MoveTo: 'MOVE_TO',
  Cast: 'CAST'
};
exports.default = MessageTypes;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite2 = __webpack_require__(17);

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Character = function (_Sprite) {
  _inherits(Character, _Sprite);

  function Character() {
    _classCallCheck(this, Character);

    return _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).apply(this, arguments));
  }

  _createClass(Character, [{
    key: 'canCast',
    value: function canCast(spellId) {
      // TODO: Check if the character has the spell in their spellbook and if it's not on cooldown.
      return true;
    }
  }]);

  return Character;
}(_Sprite3.default);

exports.default = Character;

/***/ })
/******/ ]);
//# sourceMappingURL=client.bundle.js.map