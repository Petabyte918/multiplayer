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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Client(info) {
  this.socket = info.socket;
  this.token = info.token;
  this.authenticated = info.authenticated || false;
  this.ipAddress = this.socket.upgradeReq.headers['x-forwarded-for'] || this.socket.upgradeReq.connection.remoteAddress;
  this.playerCharacter = info.playerCharacter || null;
}

module.exports = Client;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlayerCharacter = __webpack_require__(9);

var _PlayerCharacter2 = _interopRequireDefault(_PlayerCharacter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatabaseManager = function () {
  function DatabaseManager() {
    _classCallCheck(this, DatabaseManager);
  }

  _createClass(DatabaseManager, [{
    key: 'getPlayer',
    value: function getPlayer(playerName) {
      // Todo: get player information from a database and Object.assign it.
      return new _PlayerCharacter2.default('James');
    }
  }]);

  return DatabaseManager;
}();

var DbManager = new DatabaseManager();

exports.default = DbManager;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(11);

function Level(levelId) {
  // Initialize defaults
  this.start = { tx: -1, ty: -1 };
  this.tileMap = [];
  this.sprites = [];

  // Load data
  if (levelId) {
    this.id = levelId;
    this.loadFromJSONFile('./levels/level_' + levelId + '.json');
  } else {
    throw new Error("Didn't provide level ID");
  }
}

Level.prototype.loadFromJSONFile = function loadFromJSONFile(filename) {
  var levelData = JSON.parse(fs.readFileSync(filename, 'utf-8'));
  this.start = levelData.start;
  this.tileMap = levelData.tileMap;
  this.sprites = levelData.sprites;
};

module.exports = Level;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("random-token");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // External Dependencies


// Internal Dependencies


var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _http = __webpack_require__(5);

var _http2 = _interopRequireDefault(_http);

var _ws = __webpack_require__(7);

var _ws2 = _interopRequireDefault(_ws);

var _randomToken = __webpack_require__(6);

var _randomToken2 = _interopRequireDefault(_randomToken);

var _Client = __webpack_require__(0);

var _Client2 = _interopRequireDefault(_Client);

var _Level = __webpack_require__(2);

var _Level2 = _interopRequireDefault(_Level);

var _DatabaseManager = __webpack_require__(1);

var _DatabaseManager2 = _interopRequireDefault(_DatabaseManager);

var _MessageTypes = __webpack_require__(18);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Shared Dependencies

// Application Globals
var world = {
  levels: [],
  clients: {}
};

// Constants & Enumerations


// Helpers & Abstractions
var log = console.log; // TODO: log things to a file for production.

var authenticate = function authenticate(authString) {
  // TODO: add function name and explain why!
  // TODO: Faking user authentication. Need the real thing.
  var _authString$split = authString.split(':'),
      _authString$split2 = _slicedToArray(_authString$split, 2),
      user = _authString$split2[0],
      passHash = _authString$split2[1];

  if (user && passHash && user.toLowerCase() === 'james') {
    return true;
  }

  return false;
};

// Serving front end items (web pages, client scripts, images, etc.)
var app = (0, _express2.default)();
app.use(_express2.default.static('client'));
_http2.default.createServer(app).listen(5555, function () {
  return log('App started.');
});

// Socket Event Handlers
var initiateClient = function initiateClient(socket) {
  // Add socket to client list.
  var clientToken = (0, _randomToken2.default)(16);
  while (world.clients.clientToken) {
    clientToken = (0, _randomToken2.default)(16);
  }
  var client = new _Client2.default({
    token: clientToken,
    socket: socket,
    playerCharacter: null
  });
  world.clients[clientToken] = client;

  // Define socket behaviors
  socket.on('message', clientMessage.bind(client));
  // socket.on('close', clientClose);
  // socket.on('error', clientError);

  socket.on('keyPressed', function (info) {
    log(info);
  });

  sendPackage(socket, _MessageTypes2.default.Who);
};

var sendPackage = function sendPackage(socket) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (socket === null) throw new Error('Socket must be specified.'); // TODO: instanceof what?
  if (type === null) throw new Error('Package type must be specified.');

  if (type === _MessageTypes2.default.MoveTo) console.log("Moving... " + JSON.stringify(attributes));
  socket.send(JSON.stringify(Object.assign({ type: type }, attributes)));
};

var clientMessage = function clientMessage() {
  var incoming = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '{}';

  // 'this' === the client that generated this message

  var message = JSON.parse(incoming);

  switch (message.type) {
    case _MessageTypes2.default.Who:
      if (authenticate(message.who)) {
        this.playerCharacter = _DatabaseManager2.default.getPlayer('James');
        sendPackage(this.socket, _MessageTypes2.default.Authentication, { success: true, token: this.token, playerCharacter: JSON.stringify(this.playerCharacter) });
      } else {
        sendPackage(this.socket, _MessageTypes2.default.Authentication, { success: false, errorMessage: 'Authentication failed.' });
      }
      break;
    case _MessageTypes2.default.Port:
      // eslint-disable-line
      // incoming -> message: { levelId }
      var level = new _Level2.default(message.levelId);
      var pc = this.playerCharacter;
      pc.tx = level.start.tx;
      pc.ty = level.start.ty;

      // TODO: Will need to check whether player is "allowed" to port here.
      //  For example, are they currently near a portal to this area?
      sendPackage(this.socket, _MessageTypes2.default.Port, { success: true, level: level, playerCharacter: pc });
      break;
    case _MessageTypes2.default.KeyPressed:
      handleKeyPressed(this, message);
      break;
    case _MessageTypes2.default.KeyReleased:
      handleKeyReleased(this, message);
      break;
    case _MessageTypes2.default.Cast:
      castSpell(this, message);
      break;
    default:
      log('Unhandled socket communcation.');
      break;
  }
};

var handleKeyPressed = function handleKeyPressed(client, message) {
  var action = message.action;
  var pc = client.playerCharacter;
  var newDirection = { x: 0, y: 0 };
  switch (action) {
    case 'LEFT':
      newDirection.x -= 1;
      //pc.setPosition({ x: pc.position.x - 1, y: pc.position.y });
      break;
    case 'RIGHT':
      newDirection.x += 1;
      //pc.setPosition({ x: pc.position.x + 1, y: pc.position.y });
      break;
    case 'UP':
      newDirection.y -= 1;
      //pc.setPosition({ x: pc.position.x, y: pc.position.y - 1 });
      break;
    case 'DOWN':
      newDirection.y += 1;
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
  sendPackage(client.socket, _MessageTypes2.default.MoveTo, {
    x: pc.position.x,
    y: pc.position.y
  });
  console.log('Handled a ' + action + ' keypress... sort of');
};
var handleKeyReleased = function handleKeyReleased(client, message) {
  var action = message.action;
};

var castSpell = function castSpell(client, message) {
  if (client.player.canCast(message.spellId)) {
    // TODO: Eventually something like this -> client.player.cast(DatabaseManager.getSpell(spellId));
    var fb = new FireBall();
  } else {}
};

// Serving the game service.
var gameServer = new _ws2.default.Server({
  perMessageDeflate: false,
  port: 8080
});
gameServer.on('connection', initiateClient);

/***/ }),
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
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 12 */,
/* 13 */,
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
//# sourceMappingURL=app.bundle.js.map