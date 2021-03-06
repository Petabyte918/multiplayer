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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MediaManager = __webpack_require__(8);

var _MediaManager2 = _interopRequireDefault(_MediaManager);

var _GameObject2 = __webpack_require__(15);

var _GameObject3 = _interopRequireDefault(_GameObject2);

var _Collider = __webpack_require__(12);

var _Collider2 = _interopRequireDefault(_Collider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { SpriteTextureMap } from '../SpriteTypes';

var Sprite = function (_GameObject) {
  _inherits(Sprite, _GameObject);

  function Sprite() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Sprite);

    // ensure we don't get undefined errors and then pass params to the Collider constructor
    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, params));

    params.collider = params.collider || {};
    // TODO: shall we take this one level deeper and put it on GameObject?
    //        Since base game object technically doesn't move, it should only have collider if it is a wall, trigger or switch.
    _this.collider = new _Collider2.default(params.collider, params.owner || _this);

    _this.moving = params.moving || false;
    _this.aim = params.aim || { x: -1, y: -1, placeholder: true };

    _this.texture = './images/SpritePlaceholder.png';

    if (!_this.angle) _this.angle = params.angle || 0;
    // TODO: Add sprite frame dimensions
    // TODO: Add framerate.
    // TODO: ANIMATE!!! Yay!
    return _this;
  }

  _createClass(Sprite, [{
    key: 'setTexture',
    value: function setTexture(imageSource) {
      this.texture = imageSource;
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision(target) {
      if (this.collider) return this.collider.getCollisionStatus(target);
      return _Collider.CollisionStatus.NONE;
    }
  }, {
    key: 'setPosition',
    value: function setPosition() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };

      this.position.x = position.x;
      this.position.y = position.y;
    }
  }, {
    key: 'onCollisionEnter',
    value: function onCollisionEnter(otherCollider) {
      // console.log("OTHER Collider is: ", otherCollider.ownerGO);

      // console.log("Collision detected between: ", this.instanceId, otherCollider.ownerGO.instanceId);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var output = Object.assign({}, this);
      if (output.collider) {
        output.collider = Object.assign({}, output.collider);
        output.collider.ownerGO = undefined;
      }
      return output;
    }
  }, {
    key: 'update',
    value: function update(delta) {
      // console.log("updating sprite");
      _get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), 'update', this).call(this, delta);
      // if(this.moving) {
      //   console.log("Updating");
      //   if(this.aim.placeholder) return;
      //   // SOH, CAH, TOA
      //   const deltaY = Math.sin(this.angle) * this.speed * delta / 1000;
      //   const deltaX = Math.cos(this.angle) * this.speed * delta / 1000;
      //   this.setPosition({
      //     x: this.position.x + deltaX,
      //     y: this.position.y + deltaY
      //   });
      // }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      if (!this.texture) return;
      var imgElement = _MediaManager2.default.loadImage(this.texture);

      var rotAngle = 0;
      if (this.angle) {
        rotAngle = this.angle;
      }
      context.translate(this.position.x, this.position.y);
      context.rotate(rotAngle);
      context.drawImage(imgElement, -16, -16);
      context.rotate(-rotAngle);
      context.translate(-this.position.x, -this.position.y);

      if (this.children) {
        this.children.forEach(function (child) {
          if (child.draw) {
            child.draw(context);
          }
        });
      }
    }
  }]);

  return Sprite;
}(_GameObject3.default);

exports.default = Sprite;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// GameSettings is a shared settings file that will share info to both the server and the client.
var GameSettings = exports.GameSettings = {
  TILE_SCALE: 32
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpriteTextureMap = exports.ClientSpriteClassMap = exports.SpriteTypes = undefined;
exports.GetSpriteTypeName = GetSpriteTypeName;

var _PlayerCharacter = __webpack_require__(10);

var _PlayerCharacter2 = _interopRequireDefault(_PlayerCharacter);

var _BlueBeam = __webpack_require__(14);

var _BlueBeam2 = _interopRequireDefault(_BlueBeam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpriteTypes = exports.SpriteTypes = {
  PLAYER: 'SpriteTypes.PLAYER',
  CHEST: 'SpriteTypes.CHEST',
  FIREBALL: 'SpriteTypes.FIREBALL',
  BLUEBEAM: 'SpriteTypes.BLUEBEAM',
  EXPLOSION: 'SpriteTypes.EXPLOSION',
  BLOODSTAIN: 'SpriteTypes.BLOODSTAIN'
};

var ClientSpriteClassMap = exports.ClientSpriteClassMap = new Map();
ClientSpriteClassMap.set(SpriteTypes.PLAYER, _PlayerCharacter2.default);
ClientSpriteClassMap.set(SpriteTypes.BLUEBEAM, _BlueBeam2.default);

var SpriteTextureMap = exports.SpriteTextureMap = new Map();
SpriteTextureMap.set(SpriteTypes.CHEST, './images/ChestClosed.png');
SpriteTextureMap.set(SpriteTypes.FIREBALL, './images/FireballStatic.png');
SpriteTextureMap.set(SpriteTypes.FIREBALL, './images/BlueBeam.png');
SpriteTextureMap.set(SpriteTypes.PLAYER, './images/PlayerOverhead.png');

function GetSpriteTypeName(obj) {
  var iterator = ClientSpriteClassMap.entries();
  var mapCursor = {};

  do {

    mapCursor = iterator.next();
    if (mapCursor.done) break;

    if (obj instanceof mapCursor.value[1]) {
      return mapCursor.value[0];
    }
  } while (!mapCursor.done);

  console.warn("didn't find it.");
  return undefined;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageTypes = exports.broadcastPackage = exports.sendPackage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// Game elements
// import Client from './server/Client';


var _messaging = __webpack_require__(11);

Object.defineProperty(exports, 'sendPackage', {
  enumerable: true,
  get: function get() {
    return _messaging.sendPackage;
  }
});
Object.defineProperty(exports, 'broadcastPackage', {
  enumerable: true,
  get: function get() {
    return _messaging.broadcastPackage;
  }
});
Object.defineProperty(exports, 'MessageTypes', {
  enumerable: true,
  get: function get() {
    return _messaging.MessageTypes;
  }
});

var _GameSettings = __webpack_require__(1);

var _SpriteClassMap = __webpack_require__(17);

var _guid = __webpack_require__(7);

var _LevelManager = __webpack_require__(40);

var _LevelManager2 = _interopRequireDefault(_LevelManager);

var _CharacterManager = __webpack_require__(39);

var _CharacterManager2 = _interopRequireDefault(_CharacterManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Database elements???

var clients = {};
// const levels = {};

var GameEngine = function () {
  _createClass(GameEngine, [{
    key: 'levels',


    // read only so that we cannot reassign from outside.
    get: function get() {
      return _LevelManager2.default.levels;
    }
  }, {
    key: 'clients',
    get: function get() {
      return clients;
    }
  }, {
    key: 'CharacterManager',
    get: function get() {
      return _CharacterManager2.default;
    }
  }]);

  function GameEngine() {
    _classCallCheck(this, GameEngine);

    this.getLevel = _LevelManager2.default.getLevel.bind(_LevelManager2.default);
    this.getLevelBySprite = _LevelManager2.default.getLevelBySprite.bind(_LevelManager2.default);
  }

  // So at this point, it's pretty clear that sprites are bound to their map. 


  _createClass(GameEngine, [{
    key: 'spawnSprite',
    value: function spawnSprite(levelId, spriteTypeName, attributes) {
      // console.log("Spawning sprite");
      var classType = _SpriteClassMap.SpriteClassMap.get(spriteTypeName);
      var spawn = new classType(attributes);
      _LevelManager2.default.addSprite(levelId, spawn);
      return spawn;
    }
  }, {
    key: 'despawnSprite',
    value: function despawnSprite(sprite) {
      _LevelManager2.default.removeSprite(this.getLevelBySprite(sprite).id, sprite);
    }
  }, {
    key: 'despawnSpriteByLevel',
    value: function despawnSpriteByLevel(levelId, sprite) {
      _LevelManager2.default.removeSprite(levelId, sprite);
    }

    // Clients

  }, {
    key: 'addClient',
    value: function addClient(client) {

      if (!client.instanceId) client.instanceId = (0, _guid.guid)();
      clients[client.instanceId] = client;
    }
  }, {
    key: 'addClientWithAttributes',
    value: function addClientWithAttributes(attributes) {
      // TODO: Is there a use for this?
      throw new Error("Not implemented");
    }
  }, {
    key: 'removeClient',
    value: function removeClient(client) {
      delete clients[client.instanceId];
    }
  }, {
    key: 'getClientByInstanceId',
    value: function getClientByInstanceId(instanceId) {
      return clients[instanceId];
    }
  }, {
    key: 'getClientByPlayerCharacter',
    value: function getClientByPlayerCharacter(character) {
      return clients.find(function (c) {
        return c.playerCharacter === character;
      });
    }
  }, {
    key: 'getPlayerByInstanceId',
    value: function getPlayerByInstanceId(instanceId) {
      // Can pass either the client's instance Id or the character's instanceId
      return clients.find(function (c) {
        return c.instanceId === instanceId || c.playerCharacter && c.playerCharacter.instanceId === instanceId;
      });
    }
  }, {
    key: 'getRandomSpawnPoint',
    value: function getRandomSpawnPoint(levelId) {
      var level = _LevelManager2.default.getLevel(levelId);
      // console.log("Getting random point for level: ", level);
      // console.log("Level width & scale settings: ", level.width, GameSettings.TILE_SCALE);
      var position = {
        x: Math.random() * (_GameSettings.GameSettings.TILE_SCALE * level.width - _GameSettings.GameSettings.TILE_SCALE) + _GameSettings.GameSettings.TILE_SCALE,
        y: Math.random() * (_GameSettings.GameSettings.TILE_SCALE * level.height - _GameSettings.GameSettings.TILE_SCALE) + _GameSettings.GameSettings.TILE_SCALE
      };
      return position;
    }
  }]);

  return GameEngine;
}();

// Ensures singleton (I think)


var World = new GameEngine();

exports.default = World;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ColliderTypes = {
  NONE: 'NONE',
  RADIUS: 'RADIUS',
  RECTANGLE: 'RECTANGLE'
};

exports.default = ColliderTypes;

/***/ }),
/* 5 */
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
  MouseDown: 'MOUSE_DOWN',
  MouseUp: 'MOUSE_UP',
  MouseClick: 'MOUSE_CLICK',
  MouseMove: 'MOUSE_MOVE',
  MoveTo: 'MOVE_TO',
  Cast: 'CAST',
  Spawn: 'SPAWN',
  Despawn: 'DESPAWN',
  DEBUG: 'DEBUG',
  UpdateSprite: 'UPDATE_SPRITE',
  FrameQueue: 'FRAME_QUEUE',
  TakeDamage: 'TAKE_DAMAGE',
  PlayerDeath: 'PLAYER_DEATH',
  PlayerRespawn: 'PLAYER_RESPAWN',
  PING: 'PING',
  PONG: 'PONG'
};
exports.default = MessageTypes;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.angle2d = angle2d;
exports.distance2d = distance2d;
exports.addDistance2d = addDistance2d;
exports.getYFromXAndRadians = getYFromXAndRadians;
function angle2d(ax, ay, bx, by) {
  return Math.atan2(by - ay, bx - ax);
}

function distance2d(startPosition, endPosition) {
  var aSquared = (startPosition.x - endPosition.x) ** 2;
  var bSquared = (startPosition.y - endPosition.y) ** 2;
  return Math.sqrt(aSquared + bSquared);
}

function addDistance2d(startPosition, angle, distance) {
  var deltaY = Math.sin(angle) * distance;
  var deltaX = Math.cos(angle) * distance;
  return {
    x: startPosition.x + deltaX,
    y: startPosition.y + deltaY
  };
}

function getYFromXAndRadians(x, angle) {
  return x / Math.tan(angle);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guid = guid;
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpriteImage = __webpack_require__(51);

var _SpriteImage2 = _interopRequireDefault(_SpriteImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageLoader = new Map();

var MediaManager = function () {
  function MediaManager() {
    _classCallCheck(this, MediaManager);
  }

  _createClass(MediaManager, [{
    key: 'loadImage',
    value: function loadImage(imageSource) {

      var imgElement = ImageLoader.get(imageSource);
      if (!imgElement) {

        imgElement = new Image();
        imgElement.src = imageSource;

        imgElement.addEventListener('load', function (e) {
          console.log("Image loaded.");
        });
        ImageLoader.set(imageSource, imgElement);
      }

      return imgElement;
    }
  }]);

  return MediaManager;
}();

exports.default = new MediaManager();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite2 = __webpack_require__(0);

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _ColliderTypes = __webpack_require__(4);

var _ColliderTypes2 = _interopRequireDefault(_ColliderTypes);

var _ProgressBar = __webpack_require__(19);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Character = function (_Sprite) {
  _inherits(Character, _Sprite);

  function Character() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Character);

    if (!params.collider) params.collider = { type: _ColliderTypes2.default.RADIUS };
    params.abilities = params.abilities || ['FIREBALL'];
    return _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).call(this, params));
  }

  _createClass(Character, [{
    key: 'canCast',
    value: function canCast(spellId) {
      // TODO: Check if the character has the spell in their spellbook and if it's not on cooldown.
      return true;
    }
  }, {
    key: 'isVisibleTo',
    value: function isVisibleTo(bounds) {
      var right = this.position.x + (this.width || 32);
      var bottom = this.position.y + (this.width || 32);

      var isGood = this.position.x < bounds.right && this.position.y < bounds.bottom && right > bounds.left && bottom > bounds.top;
      return isGood;
    }
  }, {
    key: 'drawHealthBar',
    value: function drawHealthBar(context) {
      if (this.isActive() && !this.isDead) {
        if (!this.healthBar) {
          console.log("creating a healthbar");
          this.healthBar = new _ProgressBar2.default({
            x: 0,
            y: 0,
            width: 32, // TODO: Use game settings
            height: 5,
            current: this.stats.hp,
            max: this.stats.maxHp,
            // bgColor: 
            // fgColor:
            parentGO: this
          });
          this.healthBar.setBounds(this.position.x - 16, this.position.y - 16);
          this.healthBar.draw(context);
        } else {
          // console.log("Setting healthbar bounds to: ", this.position, this.instanceId);
          this.healthBar.setBounds(this.position.x - 16, this.position.y - 16);
          this.healthBar.draw(context);
        }
      }
    }
  }, {
    key: 'tookDamage',
    value: function tookDamage() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var damageSource = arguments[1];

      // TODO: modifiers.
      this.health -= amount;
      var overkill = 0;
      if (this.health < 0) {
        overkill = -this.health;
        // console.log("Overkill!!!! -> " + overkill  + " HP");
        this.health = 0;
      }
      console.log("taking damage!");
    }
  }]);

  return Character;
}(_Sprite3.default);

exports.default = Character;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Character2 = __webpack_require__(9);

var _Character3 = _interopRequireDefault(_Character2);

var _GameSettings = __webpack_require__(1);

var _ColliderTypes = __webpack_require__(4);

var _ColliderTypes2 = _interopRequireDefault(_ColliderTypes);

var _gx2D = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import FireballAbility from './abilities/FireballAbility';

//import World, { MessageTypes, sendPackage, broadcastPackage  } from '../GameEngine';

var PlayerCharacter = function (_Character) {
  _inherits(PlayerCharacter, _Character);

  function PlayerCharacter() {
    var characterName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Frank';

    _classCallCheck(this, PlayerCharacter);

    var _this = _possibleConstructorReturn(this, (PlayerCharacter.__proto__ || Object.getPrototypeOf(PlayerCharacter)).call(this, {
      collider: {
        type: _ColliderTypes2.default.RADIUS,
        tags: ['PLAYER'],
        radius: 5
      }
    }));

    _this.id = -1;

    _this.name = characterName;
    _this.stats = {
      level: 1,
      strength: 1,
      hp: 50,
      maxHp: 50,
      maxVelocity: 8 * _GameSettings.GameSettings.TILE_SCALE,
      acceleration: 16 * _GameSettings.GameSettings.TILE_SCALE
    };
    _this.levelId = 1;
    _this.strength = 1;
    // this.health = 50; <- this is now tracked using getters and setters.
    _this.maxHealth = 50;
    _this.velocity = 0;

    _this.moveTarget = {};

    _this.setTexture('./images/PlayerOverhead.png');

    _this.abilities = ['FIREBALL', 'BLUEBEAM'];

    console.log("Abilities: ", _this.abilities);

    return _this;
  }

  _createClass(PlayerCharacter, [{
    key: 'setPosition',
    value: function setPosition(position) {
      _get(PlayerCharacter.prototype.__proto__ || Object.getPrototypeOf(PlayerCharacter.prototype), 'setPosition', this).call(this, position);
      this.tx = Math.round(this.position.x / _GameSettings.GameSettings.TILE_SCALE);
      this.ty = Math.round(this.position.y / _GameSettings.GameSettings.TILE_SCALE);
      if (this.tx < 0) this.tx = 0;
      if (this.ty < 0) this.ty = 0;
    }
  }, {
    key: 'setMoveTarget',
    value: function setMoveTarget(x, y) {
      this.moveTarget = { x: x, y: y };
    }
  }, {
    key: 'clearMoveTarget',
    value: function clearMoveTarget() {
      this.moveTarget = undefined;
      this.moveAngle = undefined;
    }
  }, {
    key: 'update',
    value: function update(delta) {
      if (this.hasMoveTarget) {
        this.isWalking = true;

        // TODO: make 8 = some STOPPING_DISTANCE constant ... GameSettings?
        if ((0, _gx2D.distance2d)(this.position, this.moveTarget) < 8) {
          this.clearMoveTarget();
          return;
        }

        this.moveAngle = (0, _gx2D.angle2d)(this.position.x, this.position.y, this.moveTarget.x, this.moveTarget.y);
        this.angle = this.moveAngle + Math.PI / 2;

        if (this.velocity < this.stats.maxVelocity) {
          // console.log('accelerating from: ' + this.velocity, "DELTA: " + delta, "ANGLE: " + this.angle);
          this.velocity += this.stats.acceleration * delta / 1000;
          if (this.velocity > this.stats.maxVelocity) this.velocity = this.stats.maxVelocity;
          // console.log('New velocity: ' + this.velocity + '/' + this.stats.maxVelocity);
        }

        var deltaY = Math.sin(this.moveAngle) * this.velocity * (delta / 1000);
        var deltaX = Math.cos(this.moveAngle) * this.velocity * (delta / 1000);

        var newPosition = {
          x: this.position.x + deltaX,
          y: this.position.y + deltaY
        };
        //console.log(this.position, newPosition);
        this.setPosition(newPosition);
      } else {
        this.isWalking = false;
        if (this.hasMoveTarget) this.clearMoveTarget();
        this.velocity = 0;
      }
      // console.log("updated player. calling super.");
      _get(PlayerCharacter.prototype.__proto__ || Object.getPrototypeOf(PlayerCharacter.prototype), 'update', this).call(this, delta);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var _this2 = this;

      var out = Object.assign({}, this);
      if (out.children) {
        out.children = out.children.map(function (c) {
          var newChild = Object.assign({}, c);
          c.parentGO = undefined;
          c.parentId = _this2.instanceId;
          return newChild;
        });
      }
      if (out.collider && out.collider.ownerGO) {
        out.collider = Object.assign({}, out.collider);
        out.collider.ownerGO = undefined;
      }
      return out;
    }
  }, {
    key: 'health',
    get: function get() {
      return this.stats.hp;
    },
    set: function set(value) {
      this.stats.hp = value;
    }
  }, {
    key: 'hasMoveTarget',
    get: function get() {
      return this.moveTarget && this.moveTarget.x && this.moveTarget.y;
    }
  }]);

  return PlayerCharacter;
}(_Character3.default);

exports.default = PlayerCharacter;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.broadcastPackage = exports.sendPackage = exports.MessageTypes = undefined;

var _ws = __webpack_require__(24);

var _ws2 = _interopRequireDefault(_ws);

var _MessageTypes = __webpack_require__(5);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.MessageTypes = _MessageTypes2.default;
var sendPackage = exports.sendPackage = function sendPackage(socket) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (socket === null) throw new Error('Socket must be specified.'); // TODO: instanceof what?
  if (type === null) throw new Error('Package type must be specified.');

  if (socket.readyState !== _ws2.default.OPEN) return;

  socket.send(JSON.stringify(Object.assign({ type: type }, attributes)));
};

var broadcastPackage = exports.broadcastPackage = function broadcastPackage() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var clientIdList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  clientIdList = clientIdList || Object.keys(_GameEngine2.default.clients);
  // TODO: only affect clients that are in range and can see (but for now everybody)
  clientIdList.forEach(function (clientKey) {
    // console.log("broadcasting package to: " + clientKey, type, attributes);
    var c = _GameEngine2.default.clients[clientKey];
    if (c) sendPackage(c.socket, type, attributes);
  });
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollisionStatus = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _guid = __webpack_require__(7);

var _ColliderTypes = __webpack_require__(4);

var _ColliderTypes2 = _interopRequireDefault(_ColliderTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collider = function () {
  function Collider() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var ownerGO = arguments[1];

    _classCallCheck(this, Collider);

    //console.log("constructing collider for owner: " + ownerGO.instanceId, ownerGO);
    //console.log("Tags: ", params.tags);
    this.ownerGO = ownerGO;

    this.type = params.type || _ColliderTypes2.default.NONE;
    this.radius = params.radius || 16;
    this.rect = params.rect || { left: 0, top: 0, right: 32, bottom: 32 };
    // Tags that this object has.
    this.tags = params.tags || ['ALL'];
    // Tags that this object reacts to.
    this.collidesWith = params.collidesWith || ['ALL'];

    this.ignoresIds = params.ignoresIds || [];

    //TODO: temporary, remove
    this.instanceId = (0, _guid.guid)();

    this.currentCollisions = [];
  }

  _createClass(Collider, [{
    key: 'getCollisionStatus',
    value: function getCollisionStatus(otherCollider) {
      // If I have the sprite and not the collider, try to get the collider
      if (!(otherCollider instanceof Collider)) otherCollider = otherCollider.collider;
      if (!(otherCollider instanceof Collider)) return CollisionStatus.NONE;
      // If the other collider's game object is not active.
      if (!otherCollider.ownerGO.isActive()) return CollisionStatus.NONE;

      // If I'm colliding with myself return CollisionStatus.NONE;
      if (otherCollider === this) return CollisionStatus.NONE;
      // Excludes should be provided via ignoresIds
      if (this.ignoresIds.includes(otherCollider.ownerGO.instanceId)) return CollisionStatus.NONE;
      // If no collision tracking return CollisionStatus.NONE
      if (this.type === _ColliderTypes2.default.NONE || otherCollider.type === _ColliderTypes2.default.NONE) return CollisionStatus.NONE;

      // Check types
      var collidedTags = this.collidesWith.filter(function (tag) {
        if (otherCollider.tags.includes(tag)) {
          return true;
        }
        return false;
      });
      // No collisions on expected tag types.
      if (collidedTags.length === 0) return CollisionStatus.NONE;

      if (this.type === _ColliderTypes2.default.RADIUS && otherCollider.type === _ColliderTypes2.default.RADIUS) {
        // two radius colliders
        var thisCenter = this.getColliderPoint(PointEnum.CENTER);
        var otherCenter = otherCollider.getColliderPoint(PointEnum.CENTER);
        var distance = this.getDistanceBetween(thisCenter, otherCenter);
        var isOverlapping = false;
        if (distance < this.radius + otherCollider.radius) {
          // console.log("Collision at distance: " + distance, thisCenter, otherCenter);
          isOverlapping = true;
        }
        if (isOverlapping && !this.currentCollisions.includes(otherCollider.instanceId)) {
          // console.log("collision enter");
          // console.log("Collided with tags: ", collidedTags);
          this.currentCollisions.push(otherCollider.instanceId);
          return CollisionStatus.ENTER;
        } else if (isOverlapping) {
          return CollisionStatus.COLLIDING;
        }
        if (!isOverlapping && this.currentCollisions.includes(otherCollider.instanceId)) {
          // console.log("collision leave\n\n\n");
          this.currentCollisions.splice(this.currentCollisions.indexOf(otherCollider.instanceId), 1);
          return CollisionStatus.EXIT;
        }
        return CollisionStatus.NONE;
      } else if (this.type === _ColliderTypes2.default.RECTANGLE && otherCollider.type === _ColliderTypes2.default.RECTANGLE) {
        // two square colliders

      } else if (this.type === _ColliderTypes2.default.RADIUS) {
        // one of each: this is radius, other is rectangle
      } else if (this.type === _ColliderTypes2.default.RECTANGLE) {
        // one of each: this is rectangle, other is radius
      } else {
        console.error("Unknown collider type: " + this.type + " - " + otherCollider.type);
      }
      return false;
    }
  }, {
    key: 'getAbsoluteRect',
    value: function getAbsoluteRect() {
      return {
        left: this.rect.left + this.ownerGO.position.x,
        right: this.rect.right + this.ownerGO.position.x,
        top: this.rect.top + this.ownerGO.position.y,
        bottom: this.rect.bottom + this.ownerGO.position.y
      };
    }
  }, {
    key: 'getColliderPoint',
    value: function getColliderPoint(pointType) {
      var absRect = this.getAbsoluteRect();
      switch (pointType) {
        case PointEnum.CENTER:
          return {
            x: absRect.left + (absRect.right - absRect.left) / 2,
            y: absRect.top + (absRect.bottom - absRect.top) / 2
          };
        case PointEnum.TOPLEFT:
          return { x: absRect.left, y: absRect.top };
        case PointEnum.TOPRIGHT:
          return { x: absRect.right, y: absRect.top };
        case PointEnum.BOTTOMLEFT:
          return { x: absRect.left, y: absRect.bottom };
        case PointEnum.BOTTOMRIGHT:
          return { x: absRect.right, y: absRect.bottom };
        default:
          return undefined;
      }
    }

    // TODO: this probably belongs in some central place ("engine?") so the app can access it to.

  }, {
    key: 'getDistanceBetween',
    value: function getDistanceBetween(pointA, pointB) {
      var aSquared = Math.pow(pointA.x - pointB.x, 2);
      var bSquared = Math.pow(pointA.y - pointB.y, 2);
      return Math.sqrt(aSquared + bSquared);
    }
  }]);

  return Collider;
}();

var PointEnum = {
  CENTER: 'CENTER',
  TOPLEFT: 'TOPLEFT',
  TOPRIGHT: 'TOPRIGHT',
  BOTTOMLEFT: 'BOTTOMLEFT',
  BOTTOMRIGHT: 'BOTTOMRIGHT'
};

var CollisionStatus = exports.CollisionStatus = {
  ENTER: 'ENTER',
  COLLIDING: 'COLLIDING',
  EXIT: 'EXIT',
  NONE: 'NONE'
};

exports.default = Collider;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PlayerActions = {
  UNMAPPED: 'UNMAPPED',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN',
  SHIFT: 'SHIFT',
  MOUSE_ACTION_1: 'MOUSE_ACTION_1',
  MOUSE_ACTION_2: 'MOUSE_ACTION_2',
  SHOOT_PROJECTILE: 'SHOOT_PROJECTILE'
};
exports.default = PlayerActions;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameSettings = __webpack_require__(1);

var _Sprite2 = __webpack_require__(0);

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _ColliderTypes = __webpack_require__(4);

var _ColliderTypes2 = _interopRequireDefault(_ColliderTypes);

var _SpriteTypes = __webpack_require__(2);

var _gx2D = __webpack_require__(6);

var _MediaManager = __webpack_require__(8);

var _MediaManager2 = _interopRequireDefault(_MediaManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import World from '../GameEngine';

var BlueBeam = function (_Sprite) {
  _inherits(BlueBeam, _Sprite);

  function BlueBeam() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BlueBeam);

    if (!params.collider) {
      params.collider = {
        type: _ColliderTypes2.default.RADIUS,
        tags: ['PROJECTILE', 'MAGIC'],
        collidesWith: ['PLAYER']
      };
    }

    if (!params.collider.type) params.collider.type = _ColliderTypes2.default.RADIUS;
    if (!params.collider.tags) params.collider.tags = ['PROJECTILE', 'MAGIC'];
    if (!params.collider.collidesWith) params.collider.collidesWith = ['PLAYER'];

    var _this = _possibleConstructorReturn(this, (BlueBeam.__proto__ || Object.getPrototypeOf(BlueBeam)).call(this, params));

    var start = params.start || { x: 0, y: 0 };
    var aim = params.aim || { x: -1, y: -1, placeholder: true };
    var speed = params.speed || _GameSettings.GameSettings.TILE_SCALE * 25;

    var life = params.life || 1.5; // Seconds to live

    _this.setTexture('./images/BlueBeam.png');

    //console.log("Starting fireball at: ", start);
    _this.setPosition(start);
    _this.aim = aim;
    // https://gist.github.com/conorbuck/2606166
    _this.angle = Math.atan2(aim.y - start.y, aim.x - start.x); // radians
    //console.log("Speed is: ", speed);
    _this.speed = speed;

    _this.playerPosition = params.playerPosition || { x: 0, y: 0 };

    _this.stats = {
      damage: 10,
      tickRate: .5
    };

    // TODO: Don't hit this fireball's owner!!!! this.owner = owner;

    _this.livesUntil = Date.now() + life * 1000; // 3 seconds.

    _this.lastTick = +Date.now();
    return _this;
  }

  _createClass(BlueBeam, [{
    key: 'update',
    value: function update(delta) {

      if (Date.now() > this.livesUntil) {
        this.delete();
        return;
      }

      if (this.aim.placeholder) return;

      var beamPosition = (0, _gx2D.addDistance2d)(this.playerPosition, this.angle, .5 * _GameSettings.GameSettings.TILE_SCALE);
      this.setPosition(beamPosition);

      if (+Date.now() - this.lastTick >= this.stats.tickRate) {
        // TODO: do tick damage to anything that the hit box overlaps.
        // Time to do other collision types.
      }
    }

    /**
     * @override
     */

  }, {
    key: 'draw',
    value: function draw(context) {
      var imgElement = _MediaManager2.default.loadImage(this.texture);

      var rotAngle = 0;
      if (this.angle) {
        rotAngle = this.angle;
      }
      context.translate(this.position.x, this.position.y);
      context.rotate(rotAngle);
      context.drawImage(imgElement, 0, -16);
      context.drawImage(imgElement, 32, -16);
      context.drawImage(imgElement, 64, -16);
      context.rotate(-rotAngle);
      context.translate(-this.position.x, -this.position.y);

      if (this.children) {
        this.children.forEach(function (child) {
          if (child.draw) {
            child.draw(context);
          }
        });
      }
    }
  }, {
    key: 'delete',
    value: function _delete() {
      throw new Error("Must override FireBall.delete() method on instances.");
    }
  }, {
    key: 'onCollisionEnter',
    value: function onCollisionEnter(otherCollider) {
      _get(BlueBeam.prototype.__proto__ || Object.getPrototypeOf(BlueBeam.prototype), 'onCollisionEnter', this) && _get(BlueBeam.prototype.__proto__ || Object.getPrototypeOf(BlueBeam.prototype), 'onCollisionEnter', this).call(this, otherCollider);

      // if(otherCollider.tags.includes('PLAYER')) {
      //   const otherPlayer = otherCollider.ownerGO;
      //   World.CharacterManager.applyDamage(otherPlayer, { damage: this.stats.damage, source: this.ownerGO  });
      //   World.spawnSprite(otherPlayer.levelId, SpriteTypes.EXPLOSION, { start: this.position });
      // } else {
      //   World.spawnSprite(World.getLevelBySprite(this).id, SpriteTypes.EXPLOSION, { start: this.position });
      // }

      // World.despawnSpriteByLevel(World.getLevelBySprite(this).id, this);
    }
  }]);

  return BlueBeam;
}(_Sprite3.default);

exports.default = BlueBeam;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _guid = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
  function GameObject() {
    _classCallCheck(this, GameObject);

    // (paramObject = {}) {
    this.position = { x: 0, y: 0 };
    this._relativePosition = { x: 0, y: 0 };
    this.instanceId = (0, _guid.guid)();
    this.active = true;
    this.levelId = undefined;
    this.children = [];
  }

  // Relative to current level map


  _createClass(GameObject, [{
    key: "setPosition",
    value: function setPosition() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };

      // TODO: Integrate legal level position checks.
      this.position.x = position.x;
      this.position.y = position.y;
    }

    // Relative to parent object

  }, {
    key: "setRelativePosition",
    value: function setRelativePosition() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };

      this._relativePosition = position;
      if (!this.parentGO) throw new Error("This GameObject does not have a parent GameObject.");else console.log(position, this.parentGO);
      var parentX = this.parentGO && this.parentGO.position ? this.parentGO.position.x : 0;
      var parentY = this.parentGO && this.parentGO.position ? this.parentGO.position.y : 0;
      this.setPosition({
        x: parentX + position.x,
        y: parentY + position.y
      });
      console.log("set progressbar position?", this.position);
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.active = false;
    }
  }, {
    key: "activate",
    value: function activate() {
      this.active = true;
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this.active;
    }
  }, {
    key: "update",
    value: function update(delta) {
      if (this.isActive()) {
        if (this.children) {
          this.children.forEach(function (child) {
            if (child.update) {
              child.update(delta);
            }
          });
        }
      }
    }
  }]);

  return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpriteClassMap = undefined;
exports.GetSpriteTypeName = GetSpriteTypeName;

var _PlayerCharacter = __webpack_require__(10);

var _PlayerCharacter2 = _interopRequireDefault(_PlayerCharacter);

var _FireBall = __webpack_require__(44);

var _FireBall2 = _interopRequireDefault(_FireBall);

var _Explosion = __webpack_require__(43);

var _Explosion2 = _interopRequireDefault(_Explosion);

var _Bloodstain = __webpack_require__(41);

var _Bloodstain2 = _interopRequireDefault(_Bloodstain);

var _Chest = __webpack_require__(42);

var _Chest2 = _interopRequireDefault(_Chest);

var _SpriteTypes = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpriteClassMap = exports.SpriteClassMap = new Map();
SpriteClassMap.set(_SpriteTypes.SpriteTypes.PLAYER, _PlayerCharacter2.default);
SpriteClassMap.set(_SpriteTypes.SpriteTypes.FIREBALL, _FireBall2.default);
SpriteClassMap.set(_SpriteTypes.SpriteTypes.EXPLOSION, _Explosion2.default);
SpriteClassMap.set(_SpriteTypes.SpriteTypes.BLOODSTAIN, _Bloodstain2.default);
SpriteClassMap.set(_SpriteTypes.SpriteTypes.CHEST, _Chest2.default);

function GetSpriteTypeName(obj) {
  var iterator = SpriteClassMap.entries();
  var mapCursor = {};

  do {

    mapCursor = iterator.next();
    if (mapCursor.done) break;

    if (obj instanceof mapCursor.value[1]) {
      return mapCursor.value[0];
    }
  } while (!mapCursor.done);

  return undefined;
}

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite2 = __webpack_require__(0);

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBar = function (_Sprite) {
  _inherits(ProgressBar, _Sprite);

  function ProgressBar() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this)); // x, y, width, height, current, max, fgColor, bgColor, parentSprite) {


    _this.stats = { current: params.current, max: params.max };
    _this.bgColor = params.bgColor || "#FFFFFF";
    _this.fgColor = params.fgColor || "#FF0000";
    _this.parentGO = params.parentGO || { position: { x: 0, y: 0 } };
    _this.setBounds(params.x || -1, params.y || -1, params.width || -1, params.height || -1);
    _this.setRelativePosition({ x: params.x || 0, y: params.y || 0 });
    return _this;
  }

  _createClass(ProgressBar, [{
    key: "setBounds",
    value: function setBounds(x, y, width, height) {
      this.bounds = this.bounds || {};
      this.bounds.x = x || this.bounds.x;
      this.bounds.y = y || this.bounds.y;
      this.bounds.width = width || this.bounds.width, this.bounds.height = height || this.bounds.height, this.bounds.left = this.bounds.x;
      this.bounds.right = x && width ? x + width : this.bounds.x + this.bounds.width;
      this.bounds.top = this.bounds.y;
      this.bounds.bottom = y && height ? y + height : this.bounds.y + this.bounds.height;

      this.setPosition(this.bounds);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      // Draw background
      var x = this.position.x;
      var y = this.position.y;
      var width = this.bounds.width;
      var height = this.bounds.height;
      ctx.fillStyle = this.bgColor;
      ctx.fillRect(x, y, width, height);

      // Draw foreground
      width = this.bounds.width * (this.stats.current / this.stats.max);
      ctx.fillStyle = this.fgColor;
      ctx.fillRect(x, y, width, height);
    }
  }, {
    key: "update",
    value: function update(delta) {
      console.log("updating progressbar for: ", this.parentId);
    }
  }]);

  return ProgressBar;
}(_Sprite3.default);

exports.default = ProgressBar;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FireballAbility = __webpack_require__(47);

var _FireballAbility2 = _interopRequireDefault(_FireballAbility);

var _BlueBeamAbility = __webpack_require__(46);

var _BlueBeamAbility2 = _interopRequireDefault(_BlueBeamAbility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Move abilities to server side???

var Abilities = {
  'FIREBALL': _FireballAbility2.default,
  'BLUEBEAM': _BlueBeamAbility2.default
}; // TODO: Move abilities to server side???
exports.default = Abilities;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Character = __webpack_require__(9);

var _Character2 = _interopRequireDefault(_Character);

var _messaging = __webpack_require__(11);

var _MessageTypes = __webpack_require__(5);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _SpriteTypes = __webpack_require__(2);

var _Abilities = __webpack_require__(20);

var _Abilities2 = _interopRequireDefault(_Abilities);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterController = function () {
  function CharacterController(character) {
    _classCallCheck(this, CharacterController);

    this.character = character;
    this.isPlayer = true; // TODO: Figure out whether I should use this at all. Also how should I set it and should it be false by default.
    this.populateControllerAbilities.bind(this)();
  }

  _createClass(CharacterController, [{
    key: 'applyDamage',
    value: function applyDamage(character, damageInfo) {
      character.tookDamage(damageInfo.damage, damageInfo.source);
    }
  }, {
    key: 'useAbility',
    value: function useAbility(abilityName, params) {
      // console.log("ability being used.", abilityName, this.abilities[abilityName]);
      if (this.canUseAbility(abilityName)) {
        // console.log("ability used");
        this.abilities[abilityName].use(this.character, params);
      }
    }
  }, {
    key: 'canUseAbility',
    value: function canUseAbility(abilityName) {
      // TODO: Check cooldown, etc.
      return this.abilities[abilityName] && true;
    }
  }, {
    key: 'populateControllerAbilities',
    value: function populateControllerAbilities() {
      // this.abilities = this.character.abilities.map(abilityName => new Abilities[abilityName]());
      this.abilities = this.character.abilities.reduce(function (keyValAbilities, abilityName) {
        keyValAbilities[abilityName] = new _Abilities2.default[abilityName](); //a, b, c
        return keyValAbilities;
      }, {});
    }
  }]);

  return CharacterController;
}();

exports.default = CharacterController;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite = __webpack_require__(0);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _GameSettings = __webpack_require__(1);

var _MessageTypes = __webpack_require__(5);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _SpriteClassMap = __webpack_require__(17);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function () {
  function Level(levelId) {
    _classCallCheck(this, Level);

    // Initialize defaults
    this.start = { tx: -1, ty: -1 };
    this.tileMap = [];
    this.sprites = [];

    this.frameQueue = [];

    // Load data (this may overwrite defaults)
    if (levelId) {
      this.id = levelId;
    } else {
      throw new Error("Didn't provide level ID");
    }
  }

  _createClass(Level, [{
    key: 'populate',
    value: function populate(levelData) {
      this.start = levelData.start;
      this.tileMap = levelData.tileMap;
      this.sprites = levelData.sprites.map(function (s) {
        var sprite = Object.assign(new _Sprite2.default(), s);
        sprite.setPosition({
          x: s.tx * _GameSettings.GameSettings.TILE_SCALE,
          y: s.ty * _GameSettings.GameSettings.TILE_SCALE
        });
        return sprite;
      });
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var obj = Object.assign({}, this);
      obj.sprites = obj.sprites.map(function (s) {
        var obj = { spawnClass: (0, _SpriteClassMap.GetSpriteTypeName)(s), spawn: s };
        return obj;
      });
      // console.log("Level JSONified: ", obj);
      return JSON.stringify(obj);
    }
  }, {
    key: 'addSprite',
    value: function addSprite(sprite) {
      // TODO: something more robust.
      this.sprites.push(sprite);
      (0, _GameEngine.broadcastPackage)(_MessageTypes2.default.Spawn, { spawnClass: (0, _SpriteClassMap.GetSpriteTypeName)(sprite), spawn: sprite });
    }
  }, {
    key: 'removeSprite',
    value: function removeSprite(sprite) {
      this.sprites.splice(this.sprites.indexOf(sprite), 1);
      (0, _GameEngine.broadcastPackage)(_MessageTypes2.default.Despawn, { spawnId: sprite.instanceId });
    }
  }]);

  return Level;
}();

// Level.prototype.loadFromJSONFile = function loadFromJSONFile(filename) {
//   const levelData = JSON.parse(fs.readFileSync(filename, 'utf-8'));
// };


exports.default = Level;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CastTypes = __webpack_require__(38);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for abilities
 * @constructor
 * @abstract
 */
var Ability = function () {
  /**
   * Ability class is the base class for all abilities.
   * @param {Object} params - Parameters for creating this ability class.
   * @param {string} params.name - Name of ability.
   * @param {string} params.playerInstanceId - Instance ID of the player who this ability is assigned to.
   */
  function Ability() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Ability);

    this.name = 'Generic ability';
    // No cooldown instant cast by default
    this.abilityType = _CastTypes.CastTypes.INSTANT;
    this.cooldown = 0;
    this.cooldownStart = null;
    // this.cooldownGroup = ......... should this be programmed here or described in database.
  }

  /**
   * @abstract
   * @param {Object} params - Details for casting whatever spell is being cast. Likely no more than the character that did the casting.
   */


  _createClass(Ability, [{
    key: 'use',
    value: function use(params) {
      throw new Error("Must override.");
    }

    /**
     * @virtual
     */

  }, {
    key: 'triggerCooldown',
    value: function triggerCooldown() {
      this.cooldownStart = +Date.now();
    }

    /**
     * @virtual
     */

  }, {
    key: 'isOnCooldown',
    value: function isOnCooldown() {
      return +Date.now() < this.cooldownStart + this.cooldown;
    }
  }]);

  return Ability;
}();

exports.default = Ability;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashString = hashString;
exports.sha512 = sha512;
exports.hashPassword = hashPassword;

var _crypto = __webpack_require__(49);

var _crypto2 = _interopRequireDefault(_crypto);

var _guid = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hashString() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var hash = 0,
      i,
      chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function sha512(password, salt) {
  var hash = _crypto2.default.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    hash: value
  };
}

function hashPassword(password) {
  var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _guid.guid)();

  return sha512(password, salt);
}

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gx2D = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(info) {
    _classCallCheck(this, Client);

    this.socket = info.socket;
    this.token = info.token;
    this.authenticated = info.authenticated || false;
    this.ipAddress = this.socket.upgradeReq.headers['x-forwarded-for'] || this.socket.upgradeReq.connection.remoteAddress;
    this.playerCharacter = info.playerCharacter || null;
  }

  _createClass(Client, [{
    key: 'setMouseDown',
    value: function setMouseDown(params) {
      // console.log("setting playercharacter to moving.");
      // this.playerCharacter.moving = true;
      this.playerCharacter.setMoveTarget(params.x, params.y);
    }
  }, {
    key: 'setMouseUp',
    value: function setMouseUp() {
      this.playerCharacter.moving = false;
    }
  }, {
    key: 'setMousePosition',
    value: function setMousePosition(aim) {
      // console.error("setting position");
      var pc = this.playerCharacter;
      if (pc && !pc.hasMoveTarget) {
        pc.aim = aim;
        pc.angle = (0, _gx2D.angle2d)(pc.position.x, pc.position.y, aim.x, aim.y) + Math.PI / 2;
        // console.log('angle: ', pc.angle);
      }
    }
  }]);

  return Client;
}();

exports.default = Client;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlayerCharacter = __webpack_require__(10);

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
      var pc = new _PlayerCharacter2.default(playerName);
      pc.id = Math.floor(Math.random() * 10000000000 + 1);
      return pc;
    }
  }]);

  return DatabaseManager;
}();

var DbManager = new DatabaseManager();

exports.default = DbManager;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(16);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var characterSchema = (0, _mongoose.Schema)({
  name: { type: String, required: true },
  stats: {
    HP: Number, maxHP: Number,
    level: Number,
    strength: Number
  }
});

var Character = _mongoose2.default.model('Character', characterSchema);

exports.default = Character;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(16);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var userSchema = (0, _mongoose.Schema)({
  user: { type: String, required: true },
  pass: {
    hash: { type: String, required: true },
    salt: { type: String, required: true }
  },
  character: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Character'
  }
});

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _express = __webpack_require__(35);

var _express2 = _interopRequireDefault(_express);

var _http = __webpack_require__(36);

var _http2 = _interopRequireDefault(_http);

var _ws = __webpack_require__(24);

var _ws2 = _interopRequireDefault(_ws);

var _mongoose = __webpack_require__(16);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

var _guid = __webpack_require__(7);

var _passhashing = __webpack_require__(26);

var _messaging = __webpack_require__(11);

var _gx2D = __webpack_require__(6);

var _Client = __webpack_require__(31);

var _Client2 = _interopRequireDefault(_Client);

var _Level = __webpack_require__(22);

var _Level2 = _interopRequireDefault(_Level);

var _CharacterController = __webpack_require__(21);

var _CharacterController2 = _interopRequireDefault(_CharacterController);

var _DatabaseManager = __webpack_require__(32);

var _DatabaseManager2 = _interopRequireDefault(_DatabaseManager);

var _GameSettings = __webpack_require__(1);

var _fs = __webpack_require__(23);

var _fs2 = _interopRequireDefault(_fs);

var _Abilities = __webpack_require__(20);

var _Abilities2 = _interopRequireDefault(_Abilities);

var _MessageTypes = __webpack_require__(5);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _PlayerActions = __webpack_require__(13);

var _PlayerActions2 = _interopRequireDefault(_PlayerActions);

var _SpriteTypes = __webpack_require__(2);

var _Collider = __webpack_require__(12);

var _User = __webpack_require__(34);

var _User2 = _interopRequireDefault(_User);

var _Character = __webpack_require__(33);

var _Character2 = _interopRequireDefault(_Character);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Environment
var PORT = process.env.PORT || 5555;

// External Dependencies

// import randomToken from 'random-token';


// Helpers


// Internal Dependencies


// Game Managers


// const serverConfig = JSON.parse(fs.readFileSync('./config.json'));

// Game Objects
// import FireBall from './classes/shared/FireBall';
// import PlayerCharacter from './classes/shared/PlayerCharacter';
// import FireballAbility from './classes/shared/abilities/FireballAbility'


// Constants & Enumerations


// Database related
_mongoose2.default.connect(process.env.MONGODB_CONNECTIONSTRING);


// Application Globals
// const World = {
//   levels: {},
//   clients: {}
// };

// Helpers & Abstractions
var log = console.log; // TODO: log things to a file for production.

var authenticate = async function authenticate(client, authString) {
  // TODO: add function name and explain why!
  // TODO: Faking user authentication. Need the real thing.
  var _authString$split = authString.split(':'),
      _authString$split2 = _slicedToArray(_authString$split, 2),
      username = _authString$split2[0],
      password = _authString$split2[1];

  if (username && password) {
    try {
      var user = await _User2.default.findOne({ user: username }).populate('character'); // , 'user pass');
      // console.log("User: ", user);
      var hashedPass = (0, _passhashing.hashPassword)(password, user.pass.salt);
      if (hashedPass.hash === user.pass.hash) {
        // TODO: retrieve character info???
        client.user = user;
        return true;
      }
      //  else if(username.toLowerCase() === 'james') {
      //   console.log("Password incorrect.");
      //   await User.findOneAndUpdate({ user: username }, { $set: { pass: hashedPass }});
      //   console.log("Changed password. Check DB.");
      // }
    } catch (exception) {
      // This is probably a promise error.
      console.error("Exception occurred: ", exception);
    }
  }

  return false;
};

// Serving front end items (web pages, client scripts, images, etc.)
var app = (0, _express2.default)();
app.use(_express2.default.static('client'));
var server = _http2.default.createServer(app).listen(PORT, function () {
  return log('App started.');
});

// Socket Event Handlers
var initiateClient = function initiateClient(socket) {
  // Add socket to client list.
  var instanceId = (0, _guid.guid)();
  while (_GameEngine2.default.clients[instanceId]) {
    instanceId = (0, _guid.guid)();
  }
  var client = new _Client2.default({
    instanceId: instanceId,
    socket: socket,
    playerCharacter: null,
    model: null
  });
  //World.clients[clientToken] = client;
  _GameEngine2.default.addClient(client);

  // Define socket behaviors
  socket.on('message', clientMessage.bind(client));
  socket.on('close', clientClose.bind(client));

  socket.on('keyPressed', function (info) {
    log(info);
  });

  (0, _messaging.sendPackage)(socket, _MessageTypes2.default.Who);
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

var clientMessage = async function clientMessage() {
  var incoming = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '{}';

  // 'this' === the client that generated this message
  // const client = this; ????
  var message = JSON.parse(incoming);

  switch (message.type) {
    case _MessageTypes2.default.PING:
      (0, _messaging.sendPackage)(this.socket, _MessageTypes2.default.PONG, {});
      break;
    case _MessageTypes2.default.Who:
      if (await authenticate(this, message.who)) {
        // log("Getting player.");
        this.playerCharacter = _DatabaseManager2.default.getPlayer(this.user.character.name);
        _GameEngine2.default.CharacterManager.addController(this.playerCharacter);
        (0, _messaging.sendPackage)(this.socket, _MessageTypes2.default.Authentication, { success: true, instanceId: this.instanceId, playerCharacter: JSON.stringify(this.playerCharacter) });
      } else {
        (0, _messaging.sendPackage)(this.socket, _MessageTypes2.default.Authentication, { success: false, errorMessage: 'Authentication failed.' });
      }
      break;
    case _MessageTypes2.default.Port:
      // incoming -> message: { levelId }
      var level = null;
      if (_GameEngine2.default.levels[message.levelId]) {
        level = _GameEngine2.default.levels[message.levelId];
      } else {
        level = _GameEngine2.default.getLevel(message.levelId); // new Level(message.levelId);
        _GameEngine2.default.levels[message.levelId] = level;
      }
      var pc = this.playerCharacter;
      //pc.tx = level.start.tx;
      pc.position.x = level.start.tx * _GameSettings.GameSettings.TILE_SCALE;
      //pc.ty = level.start.ty;
      pc.position.y = level.start.ty * _GameSettings.GameSettings.TILE_SCALE;
      pc.levelId = level.id;
      // TODO: Update this WHOOOOOLE file with pc.getLevel() instead of levelId
      pc.getLevel = function () {
        return level;
      };
      level.sprites.push(pc);

      // TODO: Will need to check whether player is "allowed" to port here.
      //  For example, are they currently near a portal to this area?
      // console.log("sending port package to: " + this.instanceId, this);
      (0, _messaging.sendPackage)(this.socket, _MessageTypes2.default.Port, { success: true, level: level, playerCharacter: pc });
      // console.log("sent port package");
      // console.log("broadcasting port package");
      (0, _messaging.broadcastPackage)(_MessageTypes2.default.Spawn, { spawnClass: _SpriteTypes.SpriteTypes.PLAYER, spawn: pc });
      // console.log("broadcast port package");
      break;
    case _MessageTypes2.default.KeyPressed:
      handleKeyPressed(this, message);
      break;
    case _MessageTypes2.default.KeyReleased:
      handleKeyReleased(this, message);
      break;
    case _MessageTypes2.default.MouseDown:
    case _MessageTypes2.default.MouseUp:
    case _MessageTypes2.default.MouseMove:
      handleMouseEvent(this, message);
      break;
    case _MessageTypes2.default.Cast:
      castSpell(this, message);
      break;
    default:
      log('Unhandled socket communcation. Message type: ' + message.type, message);
      break;
  }
};
var clientClose = function clientClose() {
  // First stop any messages going to the client.
  this.socket = null;
  // TODO: Then save any relevant client data to the database
  //   Note: should save with a separate function so that we can also auto-save periodically.
  // Then remove the client from the World. 
  // TODO: When above TODO is finished, this should be a callback.
  {
    if (this.playerCharacter) {
      var level = _GameEngine2.default.getLevel(this.playerCharacter.levelId);
      if (level) {
        var levelIndex = level.sprites.indexOf(this.playerCharacter);
        level.sprites.splice(levelIndex, 1);
        level.sprites[this.playerCharacter.instanceId] = undefined;
        _GameEngine2.default.clients[this.instanceId] = undefined; // TODO: use GameEngine.removeClient();
        (0, _messaging.broadcastPackage)(_MessageTypes2.default.Despawn, { spawnId: this.playerCharacter.instanceId });
      }
    }
  }
};

var handleMouseEvent = function handleMouseEvent(client, message) {
  if (message.type === _MessageTypes2.default.MouseDown) {
    // console.log("Mouse down", message);
    client.setMouseDown(message);
  } else if (message.type === _MessageTypes2.default.MouseUp) {
    // console.log("Mouse up");
    client.setMouseUp();
  } else {
    // console.log("Mouse move: " + Date.now());
    client.setMousePosition(message.aim);
  }
};

var handleKeyPressed = function handleKeyPressed(client, message) {
  var action = message.action;
  switch (action) {
    case _PlayerActions2.default.LEFT:
    case _PlayerActions2.default.RIGHT:
    case _PlayerActions2.default.UP:
    case _PlayerActions2.default.DOWN:
      handlePlayerMoveRequest(client, message);
      break;
    case _PlayerActions2.default.SHOOT_PROJECTILE:
      // log("Got shoot request: ", message);
      handlePlayerFireRequest(client, message);
      break;
    default:
      log('Unexpected player action type: ' + action, message);
      break;
  }
};
var handleKeyReleased = function handleKeyReleased(client, message) {
  var action = message.action;
  // log("Released: " + action);
};

var handlePlayerMoveRequest = function handlePlayerMoveRequest(client, message) {
  var action = message.action;
  var pc = client.playerCharacter;
  var newDirection = { x: 0, y: 0 };
  switch (action) {
    case 'LEFT':
      newDirection.x -= 1;
      break;
    case 'RIGHT':
      newDirection.x += 1;
      break;
    case 'UP':
      newDirection.y -= 1;
      break;
    case 'DOWN':
      newDirection.y += 1;
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
  (0, _messaging.sendPackage)(client.socket, _MessageTypes2.default.MoveTo, {
    x: pc.position.x,
    y: pc.position.y
  });
  pc.getLevel().frameQueue.push({
    type: _MessageTypes2.default.UpdateSprite,
    sprite: JSON.stringify(pc)
  });
};

var handlePlayerFireRequest = function handlePlayerFireRequest(client, message) {
  var pc = client.playerCharacter;
  var pcController = _GameEngine2.default.CharacterManager.getController(pc);

  // console.log(Abilities["FIREBALL"]);

  // const fbAbility = new Abilities["FIREBALL"]();

  pcController.useAbility("BLUEBEAM", message);

  // fbAbility.use(pc);

  // console.log("Player -> Fireball: ", pc.position, "->", addDistance2d(pc.position, pc.angle, 1));
  // const fireball = new FireBall(
  //   {
  //     start: addDistance2d(pc.position, pc.angle - Math.PI / 2, .5 * GameSettings.TILE_SCALE),
  //     aim: pc.hasMoveTarget ? pc.moveTarget : message.aim, // If the player is moving shoot the fireball at the movement position, otherwise shoot at the mouse position.
  //     speed: GameSettings.TILE_SCALE * 12,
  //     collider: {
  //       ignoresIds: [ pc.instanceId ]
  //     }
  //   }
  // );
  // // pc.collider.ignoresIds.push(fireball.instanceId);
  // let sprites = World.levels[pc.levelId].sprites;
  // sprites.push(fireball);
  // broadcastPackage(MessageTypes.Spawn, { spawnClass: SpriteTypes.FIREBALL, spawn: fireball });

  // fireball.delete = () => {

  //   sprites = sprites.splice(sprites.indexOf(fireball), 1);
  //   broadcastPackage(MessageTypes.Despawn, { spawnId: fireball.instanceId });
  // };

  // log("Number of sprites in level: " + World.levels[pc.levelId].sprites.length);
  // log("Level sprites: ", World.levels[pc.levelId].sprites);
};

var castSpell = function castSpell(client, message) {
  if (client.playerCharacter.canCast(message.spellId)) {
    // TODO: Eventually something like this -> client.player.cast(DatabaseManager.getSpell(spellId));
    //const fb = new FireBall();
  }
};

// Serving the game service.
var gameServer = new _ws2.default.Server({
  server: server,
  perMessageDeflate: false
});
gameServer.on('connection', initiateClient);

// Managing timed game loop
var lastUpdate = Date.now();
setInterval(function () {
  // TODO?: Cater packages to each client based on view range, etc.?
  // One use case would be to remove stealth units from client side until they are visible again.

  var thisUpdate = Date.now();
  var delta = thisUpdate - lastUpdate;
  lastUpdate = thisUpdate;

  var levelsArray = Object.keys(_GameEngine2.default.levels).map(function (key) {
    return _GameEngine2.default.levels[key];
  });

  // Update all gameobjects
  levelsArray.forEach(function (level) {
    level.sprites.forEach(function (sprite) {
      if (sprite.update) {
        var preSprite = JSON.stringify(sprite, function (k, v) {
          return k === 'owner' ? undefined : v;
        });
        sprite.update(delta);
        var postSprite = JSON.stringify(sprite, function (k, v) {
          return k === 'owner' ? undefined : v;
        });
        // if(sprite instanceof PlayerCharacter && sprite.moving) {
        //   console.log("PRE: ", preSprite, "POST: ", postSprite);
        // }
        // If updates exist and prop changes are made, add updates to a package
        if (postSprite !== preSprite) {
          level.frameQueue.push({
            type: _MessageTypes2.default.UpdateSprite,
            sprite: postSprite
          });
        }
      }

      level.sprites.forEach(function (otherSprite) {
        if (otherSprite === sprite) return;
        switch (sprite.checkCollision(otherSprite)) {
          case _Collider.CollisionStatus.ENTER:
            sprite.onCollisionEnter && sprite.onCollisionEnter(otherSprite.collider);
            break;
          case _Collider.CollisionStatus.COLLIDING:
            sprite.onCollision && sprite.onCollision(otherSprite.collider);
            break;
          case _Collider.CollisionStatus.EXIT:
            sprite.onCollisionExit && sprite.onCollisionExit(otherSprite.collider);
            break;
        }
      });
    });
  });

  Object.keys(_GameEngine2.default.clients).map(function (id) {
    return _GameEngine2.default.clients[id];
  }).forEach(function (client) {
    if (!client || !client.playerCharacter || !client.socket) return;

    var level = _GameEngine2.default.levels[client.playerCharacter.levelId];
    if (!level) return;

    // send update package to all connected clients on a per-level basis.
    if (level.frameQueue.length > 0) {
      (0, _messaging.sendPackage)(client.socket, _MessageTypes2.default.FrameQueue, { queue: level.frameQueue });
    }
  });

  levelsArray.forEach(function (level) {
    level.frameQueue.length = 0; // TODO: ensure data is actually gone! This feels weird, but is reportedly the "fastest" reliable way to clear an array in Javascript.
    //       (see http://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript);
  });
}, 1000 / 60);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CastTypes = exports.CastTypes = {
  INSTANT: 'INSTANT',
  CAST: 'CAST'
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Character = __webpack_require__(9);

var _Character2 = _interopRequireDefault(_Character);

var _CharacterController = __webpack_require__(21);

var _CharacterController2 = _interopRequireDefault(_CharacterController);

var _messaging = __webpack_require__(11);

var _MessageTypes = __webpack_require__(5);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _SpriteTypes = __webpack_require__(2);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var controllers = [];

var CharacterManager = function () {
  function CharacterManager() {
    _classCallCheck(this, CharacterManager);
  }

  _createClass(CharacterManager, [{
    key: 'addController',
    value: function addController(character) {
      return controllers.push(new _CharacterController2.default(character));
    }
    /**
     * 
     * @param {Character} character 
     * @returns {CharacterController}
     */

  }, {
    key: 'getController',
    value: function getController(character) {
      var controller = controllers.find(function (c) {
        return c.character === character;
      });
      // console.log("getting controller: ", controller);
      return controller;
    }
  }, {
    key: 'applyDamage',
    value: function applyDamage(character, damageInfo) {
      var _this = this;

      if (character instanceof _Character2.default) {
        character.tookDamage(damageInfo.damage, damageInfo.source);
      } else if (character instanceof _CharacterController2.default) {
        character.applyDamage(damageInfo);
      }
      (0, _messaging.broadcastPackage)(_MessageTypes2.default.TakeDamage, {
        target: character.instanceId,
        damage: damageInfo.damage,
        remainingHp: character.stats.hp,
        maxHp: character.stats.maxHp,
        source: damageInfo.source
      });
      if (character.health <= 0 && !character.isDead) {
        character.isDead = true;
        character.deactivate();
        (0, _messaging.broadcastPackage)(_MessageTypes2.default.PlayerDeath, {
          target: character.instanceId,
          source: damageInfo.source
        });
        _GameEngine2.default.spawnSprite(character.levelId, _SpriteTypes.SpriteTypes.BLOODSTAIN, { start: character.position });
        setTimeout(function () {
          _this.respawnPlayer(character, { position: _GameEngine2.default.getRandomSpawnPoint(character.levelId) });
        }, 3000);
      }
    }
  }, {
    key: 'respawnPlayer',
    value: function respawnPlayer(character, params) {
      // console.log("Respawning character at: ", params.position);
      character.isDead = false;
      character.health = character.stats.maxHp;
      character.setPosition(params.position);
      character.activate();
      (0, _messaging.broadcastPackage)(_MessageTypes2.default.PlayerRespawn, {
        target: character.instanceId,
        position: params.position
      });
    }
  }]);

  return CharacterManager;
}();

exports.default = new CharacterManager();

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = __webpack_require__(23);

var _fs2 = _interopRequireDefault(_fs);

var _Level = __webpack_require__(22);

var _Level2 = _interopRequireDefault(_Level);

var _SpriteClassMap = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var levels = {};

var LevelManager = function () {
  function LevelManager() {
    _classCallCheck(this, LevelManager);
  }

  _createClass(LevelManager, [{
    key: 'getLevel',
    value: function getLevel(levelId) {
      if (!this.levels[levelId]) {

        var level = new _Level2.default(levelId);
        var levelData = this.loadFromJSONFile('./levels/level_' + levelId + '.json');
        Object.assign(level, levelData);
        level.populate(levelData);

        if (!level) throw new Error("Level did not load. This is probably because of an invalid level ID.");

        this.levels[levelId] = level;
      }
      return this.levels[levelId];
    }
    // Note: I expect this is a fairly expensive operation, so I probably don't want to do it every frame.

  }, {
    key: 'getLevelBySprite',
    value: function getLevelBySprite(sprite) {
      var _this = this;

      var levelFound = null;
      Object.keys(this.levels).forEach(function (levelId) {
        // console.log("doing get level");
        var level = _this.getLevel(levelId);
        // console.log("got level");
        if (level.sprites.indexOf(sprite) !== -1) {
          levelFound = level;
          // console.log("Found from comparison: " + levelFound.id);
        }
      });
      // console.log("return level: ", levelFound);
      return levelFound;
    }
  }, {
    key: 'loadFromJSONFile',
    value: function loadFromJSONFile(filename) {
      var level = JSON.parse(_fs2.default.readFileSync(filename, 'utf-8'));

      // console.log("Loaded Level: ", level);

      level.sprites = level.sprites.map(function (s) {
        var spriteClass = _SpriteClassMap.SpriteClassMap.get(s.type);
        if (spriteClass) {
          return Object.assign(new spriteClass(), s);
        }
        return s;
      });
      return level;
    }
  }, {
    key: 'addSprite',
    value: function addSprite(levelId, sprite) {
      this.getLevel(levelId).addSprite(sprite);
    }
  }, {
    key: 'removeSprite',
    value: function removeSprite(levelId, sprite) {
      this.getLevel(levelId).removeSprite(sprite);
    }
  }, {
    key: 'levels',
    get: function get() {
      return levels;
    }
  }]);

  return LevelManager;
}();

var levelManager = new LevelManager();

exports.default = levelManager;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Sprite2 = __webpack_require__(0);

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bloodstain = function (_Sprite) {
  _inherits(Bloodstain, _Sprite);

  function Bloodstain() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Bloodstain);

    // console.log("Creating an explosion!!!!!");
    var _this = _possibleConstructorReturn(this, (Bloodstain.__proto__ || Object.getPrototypeOf(Bloodstain)).call(this, params));

    _this.setPosition(params.start || { x: 0, y: 0 });
    _this.setTexture('./images/BloodSplatter.png');

    _this.livesUntil = +Date.now() + 1 * 1000; // one second bloodstain!

    return _this;
  }

  _createClass(Bloodstain, [{
    key: 'update',
    value: function update(delta) {
      if (this.livesUntil && this.livesUntil <= +Date.now()) {
        _GameEngine2.default.despawnSprite(this);
        return;
      }
      _get(Bloodstain.prototype.__proto__ || Object.getPrototypeOf(Bloodstain.prototype), 'update', this).call(this, delta);
    }
  }]);

  return Bloodstain;
}(_Sprite3.default);

exports.default = Bloodstain;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sprite2 = __webpack_require__(0);

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Explosion = function (_Sprite) {
  _inherits(Explosion, _Sprite);

  function Explosion() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Explosion);

    var _this = _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, params));

    _this.setPosition(params.start);
    _this.setTexture('./images/ChestClosed.png');
    return _this;
  }

  return Explosion;
}(_Sprite3.default);

exports.default = Explosion;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Sprite2 = __webpack_require__(0);

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Explosion = function (_Sprite) {
  _inherits(Explosion, _Sprite);

  function Explosion() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Explosion);

    // console.log("Creating an explosion!!!!!");
    var _this = _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, params));

    _this.setPosition(params.start || { x: 0, y: 0 });
    _this.setTexture('./images/ExplosionExploding.png');

    _this.livesUntil = +Date.now() + .1 * 1000; // tenth of a second explosion

    return _this;
  }

  _createClass(Explosion, [{
    key: 'update',
    value: function update(delta) {
      if (this.livesUntil && this.livesUntil <= +Date.now()) {
        _GameEngine2.default.despawnSprite(this);
        return;
      }
      _get(Explosion.prototype.__proto__ || Object.getPrototypeOf(Explosion.prototype), 'update', this).call(this, delta);
    }
  }]);

  return Explosion;
}(_Sprite3.default);

exports.default = Explosion;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameSettings = __webpack_require__(1);

var _Sprite2 = __webpack_require__(0);

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _ColliderTypes = __webpack_require__(4);

var _ColliderTypes2 = _interopRequireDefault(_ColliderTypes);

var _SpriteTypes = __webpack_require__(2);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FireBall = function (_Sprite) {
  _inherits(FireBall, _Sprite);

  function FireBall() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, FireBall);

    if (!params.collider) {
      params.collider = {
        type: _ColliderTypes2.default.RADIUS,
        tags: ['PROJECTILE', 'FIRE'],
        collidesWith: ['PLAYER', 'WALL']
      };
    }

    if (!params.collider.type) params.collider.type = _ColliderTypes2.default.RADIUS;
    if (!params.collider.tags) params.collider.tags = ['PROJECTILE', 'FIRE'];
    if (!params.collider.collidesWith) params.collider.collidesWith = ['PLAYER', 'WALL'];

    var _this = _possibleConstructorReturn(this, (FireBall.__proto__ || Object.getPrototypeOf(FireBall)).call(this, params));

    var start = params.start || { x: 0, y: 0 };
    var aim = params.aim || { x: -1, y: -1, placeholder: true };
    var speed = params.speed || _GameSettings.GameSettings.TILE_SCALE * 25;
    var owner = params.owner || null;

    var life = params.life || .5; // Seconds to live

    _this.setTexture('./images/FireballStatic.png');

    //console.log("Starting fireball at: ", start);
    _this.setPosition(start);
    _this.aim = aim;
    // https://gist.github.com/conorbuck/2606166
    _this.angle = Math.atan2(aim.y - start.y, aim.x - start.x); // radians
    //console.log("Speed is: ", speed);
    _this.speed = speed;

    _this.stats = {
      damage: 10
    };

    // TODO: Don't hit this fireball's owner!!!! this.owner = owner;

    _this.livesUntil = Date.now() + life * 1000; // 3 seconds.
    return _this;
  }

  _createClass(FireBall, [{
    key: 'update',
    value: function update(delta) {
      if (Date.now() > this.livesUntil) {
        // console.log("Deleting fireball.");
        this.delete();
        return;
      }

      //this.checkCollisions();

      if (this.aim.placeholder) return;
      // SOH, CAH, TOA
      var deltaY = Math.sin(this.angle) * this.speed * delta / 1000;
      var deltaX = Math.cos(this.angle) * this.speed * delta / 1000;
      this.setPosition({
        x: this.position.x + deltaX,
        y: this.position.y + deltaY
      });
    }
  }, {
    key: 'delete',
    value: function _delete() {
      throw new Error("Must override FireBall.delete() method on instances.");
    }
  }, {
    key: 'onCollisionEnter',
    value: function onCollisionEnter(otherCollider) {
      _get(FireBall.prototype.__proto__ || Object.getPrototypeOf(FireBall.prototype), 'onCollisionEnter', this) && _get(FireBall.prototype.__proto__ || Object.getPrototypeOf(FireBall.prototype), 'onCollisionEnter', this).call(this, otherCollider);

      if (otherCollider.tags.includes('PLAYER')) {
        var otherPlayer = otherCollider.ownerGO;
        _GameEngine2.default.CharacterManager.applyDamage(otherPlayer, { damage: this.stats.damage, source: this.ownerGO });
        _GameEngine2.default.spawnSprite(otherPlayer.levelId, _SpriteTypes.SpriteTypes.EXPLOSION, { start: this.position });
      } else {
        _GameEngine2.default.spawnSprite(_GameEngine2.default.getLevelBySprite(this).id, _SpriteTypes.SpriteTypes.EXPLOSION, { start: this.position });
      }

      _GameEngine2.default.despawnSpriteByLevel(_GameEngine2.default.getLevelBySprite(this).id, this);
    }
  }]);

  return FireBall;
}(_Sprite3.default);

exports.default = FireBall;

/***/ }),
/* 45 */,
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpriteTypes = __webpack_require__(2);

var _MessageTypes = __webpack_require__(5);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _GameSettings = __webpack_require__(1);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

var _Ability2 = __webpack_require__(25);

var _Ability3 = _interopRequireDefault(_Ability2);

var _BlueBeam = __webpack_require__(14);

var _BlueBeam2 = _interopRequireDefault(_BlueBeam);

var _gx2D = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlueBeamAbility = function (_Ability) {
  _inherits(BlueBeamAbility, _Ability);

  /**
   * BlueBeam ability
   * @param {Object} params - Parameters for creating this ability class.
   * @param {string} params.playerInstanceId - Instance ID of the player who this ability is assigned to.
   */
  function BlueBeamAbility(params) {
    _classCallCheck(this, BlueBeamAbility);

    var _this = _possibleConstructorReturn(this, (BlueBeamAbility.__proto__ || Object.getPrototypeOf(BlueBeamAbility)).call(this, params));

    _this.name = 'Blue Beam';
    _this.cooldown = 1500;
    _this.cooldownStart = null;
    return _this;
  }

  _createClass(BlueBeamAbility, [{
    key: 'use',
    value: function use(pc, params) {
      if (this.isOnCooldown()) {
        // TODO: some sort of feedback to the client that the ability cannot currently be used.
        /// ie. sendPackage(...)
      } else {
        this.triggerCooldown();
        var beam = new _BlueBeam2.default({
          start: (0, _gx2D.addDistance2d)(pc.position, pc.angle - Math.PI / 2, .5 * _GameSettings.GameSettings.TILE_SCALE),
          playerPosition: pc.position,
          aim: pc.hasMoveTarget ? pc.moveTarget : params.aim, // If the player is moving shoot the fireball at the movement position, otherwise shoot at the mouse position.
          speed: _GameSettings.GameSettings.TILE_SCALE * 12,
          collider: {
            ignoresIds: [pc.instanceId]
          }
        });

        var sprites = _GameEngine2.default.levels[pc.levelId].sprites;
        sprites.push(beam);
        (0, _GameEngine.broadcastPackage)(_MessageTypes2.default.Spawn, { spawnClass: _SpriteTypes.SpriteTypes.BLUEBEAM, spawn: beam });

        beam.delete = function () {
          sprites.splice(sprites.indexOf(beam), 1);
          (0, _GameEngine.broadcastPackage)(_MessageTypes2.default.Despawn, { spawnId: beam.instanceId });
        };
      }
    }
  }]);

  return BlueBeamAbility;
}(_Ability3.default);

exports.default = BlueBeamAbility;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpriteTypes = __webpack_require__(2);

var _MessageTypes = __webpack_require__(5);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _GameSettings = __webpack_require__(1);

var _GameEngine = __webpack_require__(3);

var _GameEngine2 = _interopRequireDefault(_GameEngine);

var _Ability2 = __webpack_require__(25);

var _Ability3 = _interopRequireDefault(_Ability2);

var _FireBall = __webpack_require__(44);

var _FireBall2 = _interopRequireDefault(_FireBall);

var _gx2D = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FireballAbility = function (_Ability) {
  _inherits(FireballAbility, _Ability);

  /**
   * Fireball ability
   * @param {Object} params - Parameters for creating this ability class.
   * @param {string} params.playerInstanceId - Instance ID of the player who this ability is assigned to.
   */
  function FireballAbility(params) {
    _classCallCheck(this, FireballAbility);

    var _this = _possibleConstructorReturn(this, (FireballAbility.__proto__ || Object.getPrototypeOf(FireballAbility)).call(this, params));

    _this.name = 'Fireball';
    _this.cooldown = 500;
    _this.cooldownStart = null;
    return _this;
  }

  _createClass(FireballAbility, [{
    key: 'use',
    value: function use(pc, params) {
      if (this.isOnCooldown()) {
        // TODO: some sort of notification to the client that the ability cannot currently be used.
        /// ie. sendPackage(...)
      } else {
        this.triggerCooldown();
        var fireball = new _FireBall2.default({
          start: (0, _gx2D.addDistance2d)(pc.position, pc.angle - Math.PI / 2, .5 * _GameSettings.GameSettings.TILE_SCALE),
          aim: pc.hasMoveTarget ? pc.moveTarget : params.aim, // If the player is moving shoot the fireball at the movement position, otherwise shoot at the mouse position.
          speed: _GameSettings.GameSettings.TILE_SCALE * 12,
          collider: {
            ignoresIds: [pc.instanceId]
          }
        });

        var sprites = _GameEngine2.default.levels[pc.levelId].sprites;
        sprites.push(fireball);
        (0, _GameEngine.broadcastPackage)(_MessageTypes2.default.Spawn, { spawnClass: _SpriteTypes.SpriteTypes.FIREBALL, spawn: fireball });

        fireball.delete = function () {
          sprites.splice(sprites.indexOf(fireball), 1);
          (0, _GameEngine.broadcastPackage)(_MessageTypes2.default.Despawn, { spawnId: fireball.instanceId });
        };
      }
    }
  }]);

  return FireballAbility;
}(_Ability3.default);

exports.default = FireballAbility;

/***/ }),
/* 48 */,
/* 49 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpriteImage = function () {
  /**
   * Base Image class for multiplayer game
   * @param {Object} params 
   * @param {String} params.source
   * @param {Boolean} params.animated
   * @param {Number} params.frameWidth
   * @param {Number} params.frameHeight
   * @param {Number} params.frameRate - Frames per second.
   */
  function SpriteImage(_ref) {
    var _this = this;

    var source = _ref.source,
        animated = _ref.animated,
        frameWidth = _ref.frameWidth,
        frameHeight = _ref.frameHeight,
        frameRate = _ref.frameRate,
        frames = _ref.frames;

    _classCallCheck(this, SpriteImage);

    this.imageElement = new Image(source);
    this.animated = animated || false;
    this.frameWidth = frameWidth || 32;
    this.frameHeight = frameHeight || 32;
    this.frameRate = frameRate || 30;
    this.frames = 0;

    this.imageElement.style.objectFit = 'none';
    this.imageElement.style.width = this.frameWidth + "px";
    this.imageElement.style.height = this.frameHeight + "px";

    if (this.animated) {
      this.createdAt = +Date.now();

      this.imageElement.addEventListener('load', function () {
        _this.frames = _this.imageElement.width / _this.frameWidth;
      });
    }
  }

  _createClass(SpriteImage, [{
    key: "getFrame",
    value: function getFrame() {
      if (this.animated) {
        var currentFrame = parseInt((+Date.now() - this.createdAt) / 1000 * this.frameRate) % this.frames;
        this.imageElement.style.objectPosition = "-" + this.frameWidth * currentFrame + "px 0";
      }
      return this.imageElement;
    }
  }]);

  return SpriteImage;
}();

exports.default = SpriteImage;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map