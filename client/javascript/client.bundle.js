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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
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
/* 3 */,
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
/* 11 */,
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
/* 16 */,
/* 17 */,
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
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;
exports.debounce = debounce;
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, deferTimer;
  return function () {

    var context = scope || this;

    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 250);
    if (callNow) func.apply(context, args);
  };
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TileTypes = {
  DIRT: 0,
  GRASS: 1,
  ROCK: 2,
  WATER: 3,
  PIT: 4,
  BRIDGE: 5
};

exports.default = TileTypes;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sprites = [];

var ClientGlobals = function () {
  function ClientGlobals() {
    _classCallCheck(this, ClientGlobals);
  }

  _createClass(ClientGlobals, [{
    key: "getSpriteById",
    value: function getSpriteById(instanceId) {
      return sprites.find(function (s) {
        return s.instanceId === instanceId;
      });
    }
  }, {
    key: "addSprite",
    value: function addSprite(sprite) {
      return sprites.push(sprite);
    }
  }, {
    key: "removeSprite",
    value: function removeSprite(sprite) {
      return sprites.splice(sprites.indexOf(sprite), 1);
    }
  }, {
    key: "sprites",
    get: function get() {
      return sprites;
    },
    set: function set(value) {
      sprites = value;
    }
  }]);

  return ClientGlobals;
}();

exports.default = new ClientGlobals();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(15);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  fillStyle: "red",
  font: "14px Arial",
  lifeTime: 5 * 1000,
  position: { x: 0, y: 0 },
  text: "Hello World"
};

var CombatText = function (_GameObject) {
  _inherits(CombatText, _GameObject);

  function CombatText(params, deleteCallback) {
    _classCallCheck(this, CombatText);

    if (!deleteCallback) throw new Error("Please provide a callback for combat text deleteCallback.");

    var _this = _possibleConstructorReturn(this, (CombatText.__proto__ || Object.getPrototypeOf(CombatText)).call(this));

    _this.deleteCallback = deleteCallback || function () {
      throw new Error("Please provide a callback for combat text deleteCallback.");
    };

    _this.fillStyle = params.fillStyle || defaults.fillStyle;
    _this.setFont(params.font || defaults.font);
    _this.setPosition(params.position || defaults.position);
    _this.text = params.text || defaults.text;
    _this.lifeTime = params.lifeTime || defaults.lifeTime;
    _this.livesUntil = +Date.now() + _this.lifeTime;

    _this.xShift = params.xShift || Math.random() * 48 - 24;

    // console.log("TTL: " + (params.lifeTime || defaults.lifeTime));
    _this.cancelTimeout = setTimeout(function () {
      _this.delete();
    }, params.lifeTime || defaults.lifeTime);

    // console.log("Created combat text: ", this);
    return _this;
  }

  _createClass(CombatText, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.globalAlpha = (this.livesUntil - Date.now()) / this.lifeTime;
      ctx.font = this.font;
      ctx.fillStyle = this.fillStyle;
      ctx.fillText(this.text, this.position.x, this.position.y);
      ctx.globalAlpha = 1;
    }
  }, {
    key: "setFont",
    value: function setFont(font) {
      this.font = font || defaults.font;
    }
  }, {
    key: "update",
    value: function update(delta) {
      this.position.y -= 48 * delta / 1000;
      this.position.x += this.xShift * delta / 1000;
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.deleteCallback();
    }
  }]);

  return CombatText;
}(_GameObject3.default);

exports.default = CombatText;

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _PlayerCharacter = __webpack_require__(10);

var _PlayerCharacter2 = _interopRequireDefault(_PlayerCharacter);

var _Character = __webpack_require__(9);

var _Character2 = _interopRequireDefault(_Character);

var _Sprite = __webpack_require__(0);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _CombatText = __webpack_require__(30);

var _CombatText2 = _interopRequireDefault(_CombatText);

var _MessageTypes = __webpack_require__(5);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _TileTypes = __webpack_require__(28);

var _TileTypes2 = _interopRequireDefault(_TileTypes);

var _SpriteTypes = __webpack_require__(2);

var _PlayerActions = __webpack_require__(13);

var _PlayerActions2 = _interopRequireDefault(_PlayerActions);

var _GameSettings = __webpack_require__(1);

var _ClientGlobals = __webpack_require__(29);

var _ClientGlobals2 = _interopRequireDefault(_ClientGlobals);

var _MediaManager = __webpack_require__(8);

var _MediaManager2 = _interopRequireDefault(_MediaManager);

var _gx2D = __webpack_require__(6);

var _throttling = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Game Objects
// import FireBall from '../../classes/shared/FireBall';


// Constants & Enumerations


// Game Managers


// Helpers


// tile canvas
var tileCanvas = document.querySelector('#tileCanvas');
var tileContext = tileCanvas.getContext('2d');
// sprite canvas
var spriteCanvas = document.querySelector('#spriteCanvas');
var spriteContext = spriteCanvas.getContext('2d');
// UI canvas 
var uiCanvas = document.querySelector('#uiCanvas');
var uiContext = uiCanvas.getContext('2d');
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
var TILE_SCALE = _GameSettings.GameSettings.TILE_SCALE;
var gameMode = MODE_PLAY;

var TileColorMap = new Map();
TileColorMap.set(_TileTypes2.default.DIRT, '#5b2607');
TileColorMap.set(_TileTypes2.default.GRASS, 'green');
TileColorMap.set(_TileTypes2.default.ROCK, 'grey');
TileColorMap.set(_TileTypes2.default.WATER, 'blue');
TileColorMap.set(_TileTypes2.default.PIT, 'black');
TileColorMap.set(_TileTypes2.default.BRIDGE, '#7c4b2e');

// const SpriteTextureMap = new Map();
// SpriteTextureMap.set(SpriteTypes.CHEST, './images/ChestClosed.png');
// SpriteTextureMap.set(SpriteTypes.FIREBALL, './images/FireballStatic.png');
// SpriteTextureMap.set(SpriteTypes.PLAYER, './images/PlayerOverhead.png');

var ImageLoader = new Map();

var playerCharacter = null;

// level tiles / objects for map the player is currently on.
var tileMap = [];
var sprites = _ClientGlobals2.default.sprites; // []; // SPRITE
var ui = {
  textSprites: [],
  addCombatText: function addCombatText(text) {
    this.textSprites.push(text);
  },
  removeCombatText: function removeCombatText(text) {
    this.textSprites.splice(this.textSprites.indexOf(text), 1);
  }
};

var mousePosition = {};

function openClientSocket() {
  console.log("Opening socket");
  var sock = null;
  try {
    var protocol = window.location.protocol === "https:" ? "wss" : "ws";
    sock = client.socket || new WebSocket(protocol + '://' + location.hostname + ':' + location.port + '/');
    client.socket = sock;
  } catch (ex) {
    // Errors will be thrown if not using http, as location object data will not look the same.
    console.log("Error: ", ex);
    console.log("If you're testing on the server, did you remember to use localhost?");
  }
  console.log("Sending socket back");
  return sock;
}

// Start socket
function startSocketClient() {
  // TODO: Does this cause conflicts if called more than once?
  var sock = openClientSocket();
  // try {
  //   const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  //   sock = client.socket || new WebSocket(`${protocol}://${location.hostname}:${location.port}/`);
  //   client.socket = sock;
  // } catch(ex) {
  //   // Errors will be thrown if not using http, as location object data will not look the same.
  //   console.log("Error: ", ex);
  //   console.log("If you're testing on the server, did you remember to use localhost?")
  // }

  sock.onmessage = function onmessage(event) {
    var message = JSON.parse(event.data);

    switch (message.type) {
      case _MessageTypes2.default.PONG:
        // console.log("Pong received.");
        break;
      case _MessageTypes2.default.Who:
        // sendPackage(MessageTypes.Who, { who: 'James:df8c8023ae' });
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
          message.level = JSON.parse(message.level);
          // console.log(message);
          tileMap = message.level.tileMap;
          var massagedSpriteData = message.level.sprites.map(function (s) {
            return classifySprite(s.spawn, s.spawnClass);
          });
          sprites.push.apply(sprites, _toConsumableArray(massagedSpriteData)); // SPRITE
          massagedSpriteData.forEach(function (s) {
            sprites[s.instanceId] = s;
          });

          playerCharacter = sprites.find(function (s) {
            return s.instanceId === message.playerCharacter.instanceId;
          }); // SPRITE
          playerCharacter.setPosition(message.playerCharacter.position);

          // TODO: Can we determine if this is a first load?
          drawCanvas();
        } else {
          console.log("Message was not successful!!!!", message);
        }
        break;
      case _MessageTypes2.default.MoveTo:
        // DEBUG: console.log("Attempted to move: ", message);
        playerCharacter.setPosition(message);
        drawSprites();
        break;
      case _MessageTypes2.default.Spawn:
        if (!message.spawnClass) {
          console.error("No spawn class provided.");
          return;
        }
        if (message.spawnClass === _SpriteTypes.SpriteTypes.PLAYER) {
          console.log("Player spawned: ", message.spawn.instanceId);
          console.log('Spawn info: ', message);
        } else if (message.spawnClass === _SpriteTypes.SpriteTypes.BLUEBEAM) {
          console.log("SPECIAL BEAM CANNON!");
        }
        // const spawnClass = SpriteClassMap.get(message.spawnClass);
        if (message.spawn.instanceId === playerCharacter.instanceId) return;
        // const newSpawn = Object.assign(new Sprite(), message.spawn, { type: message.spawnClass });
        var newSpawn = classifySprite(message.spawn, message.spawnClass);
        sprites.push(newSpawn);
        sprites[newSpawn.instanceId] = newSpawn;
        break;
      case _MessageTypes2.default.Despawn:
        // console.log('Despawn Message: ', message); // message.spawnId
        sprites.splice(sprites.findIndex(function (s) {
          return s.instanceId === message.spawnId;
        }), 1);
        sprites[message.spawnId] = undefined;
        if (message.spawnId === playerCharacter.instanceId) {
          // TODO: respawn
        }
        delete sprites[message.spawnId];
        break;
      case _MessageTypes2.default.FrameQueue:
        // TODO: finish below
        message.queue.forEach(function (item) {
          if (item.type === _MessageTypes2.default.UpdateSprite) {
            var spriteUpdateInfo = JSON.parse(item.sprite);
            var spriteToUpdate = sprites[spriteUpdateInfo.instanceId];
            if (spriteToUpdate) {
              Object.assign(spriteToUpdate, spriteUpdateInfo);
            } else {
              // console.log("couldn't find sprite.", spriteUpdateInfo);
            }
          } else {
            console.log("Invalid frame action");
          }
        });
        drawSprites();
        // TODO: Draw sprite changes all in one go - DO NOT draw them in each iteration above.
        break;
      case _MessageTypes2.default.TakeDamage:
        handleTakeDamage(message);
        break;
      case _MessageTypes2.default.PlayerDeath:
        handlePlayerDeath(message);
        break;
      case _MessageTypes2.default.PlayerRespawn:
        // console.log('Respawn info: ', message);
        handlePlayerRespawn(message);
        break;
      case _MessageTypes2.default.DEBUG:
        console.log('Debug package received. Message: ' + message.message);
        break;
      default:
        console.log('Message type not recognized: ', message);
        break;
    }
  };

  sock.onclose = function onclose(something) {
    console.log('Socket Closed -> ', something);
    // TODO: If user did not purposely disconnect, attempt to reconnect
  };
  sock.onerror = function onerror(something) {
    console.log('Some Error -> ', something);
    // TODO: Determine conditions for reconnect and then use them to create reconnect logic.
  };
}

var handleTakeDamage = function handleTakeDamage(message) {
  var target = sprites[message.target];
  var damage = message.damage;
  var text = new _CombatText2.default({
    text: '-' + damage,
    lifeTime: 1000,
    position: {
      x: target.position.x - 16,
      y: target.position.y - 16
    }
  }, function () {
    ui.removeCombatText(text);
  });
  ui.addCombatText(text);
  target.stats.hp = message.remainingHp;
  target.stats.maxHp = message.maxHp;
};

var handlePlayerDeath = function handlePlayerDeath(message) {
  var target = sprites.find(function (s) {
    return s.instanceId === message.target;
  });
  target.isDead = true;
};
var handlePlayerRespawn = function handlePlayerRespawn(message) {
  var target = sprites.find(function (s) {
    return s.instanceId === message.target;
  });
  target.isDead = false;
  target.stats.hp = target.stats.maxHp;
  // console.log("Found: ", target);
  // console.log("ID: ", message.target);
  target.setPosition(message.position);
};

var sendLogin = function sendLogin(username, password) {
  sendPackage(_MessageTypes2.default.Who, { who: username + ':' + password });
};

var classifySprite = function classifySprite(sprite, spriteClassTag) {
  sprite.spriteClassTag = spriteClassTag;
  if (!spriteClassTag) return sprite;
  var spriteClass = _SpriteTypes.ClientSpriteClassMap.get(spriteClassTag);
  if (!spriteClass || sprite instanceof spriteClass) return sprite;
  var classifiedSprite = Object.assign(new spriteClass(), sprite);
  return classifiedSprite;
};

// Pipeline message handlers
function LoginSucceeded() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  console.log("message: ", message);

  if (!message.instanceId) return;
  client.instanceId = message.instanceId; // Save to global for later use.
  toast('Welcome', 'Connected to server.');

  hideUI('UI_Login');

  // TODO: Show loading message / spinner
  startGame();
}

function LoginFailed() {
  var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'not defined';

  /* eslint-disable no-alert */
  toast('YOU FAILED (to log in)!!!');
  // toast('Oh and the error was: ', error);
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
  uiCanvas.width = spriteCanvas.width = cursorCanvas.width = tileCanvas.width = document.body.offsetWidth;
  uiCanvas.height = spriteCanvas.height = cursorCanvas.height = tileCanvas.height = document.body.offsetHeight;
  drawCanvas();
}

// Draw canvas
function drawCanvas() {
  // clear bg
  tileContext.fillStyle = 'cyan'; // clear color
  tileContext.fillRect(0, 0, tileCanvas.width, tileCanvas.height);

  // draw background tiles
  drawBackground();

  // draw sprites
  drawSprites();

  // draw HUD
  drawHUD();
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
    // SPRITE

    if (sprite.isDead) return;
    if (sprite.draw) {
      sprite.draw(spriteContext);
      return;
    }

    if (sprite.spriteClassTag === _SpriteTypes.SpriteTypes.BLUEBEAM) {
      console.log("draw not called for beam.");
    }

    var imageSource = sprite.texture || _SpriteTypes.SpriteTextureMap.get(sprite.type);
    if (imageSource === undefined) console.log("undefined darnit.", sprite);
    drawSprite(sprite.position.x, sprite.position.y, imageSource, sprite.angle || 0);
  });
};

var drawHUD = function drawHUD() {
  // TODO: draw HUD
  uiContext.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
  ui.textSprites.forEach(function (cbText) {
    if (cbText.draw) {
      cbText.draw(uiContext);
    }
  });

  var characters = sprites.filter(function (s) {
    return s instanceof _Character2.default;
  });
  characters.forEach(function (character) {
    // if(character.instanceId !== playerCharacter.instanceId)
    // console.log("checking visibility.");

    var bounds = {
      left: 0,
      right: spriteCanvas.width,
      top: 0,
      bottom: spriteCanvas.height
    };

    if (character.isVisibleTo(bounds)) {
      character.drawHealthBar(uiContext);
    } else {
      // console.log("Player is not visible: ", character.instanceId);
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

  var imgElement = _MediaManager2.default.loadImage(imageSource);
  var rotAngle = 0;
  if (angle) {
    rotAngle = angle;
  }
  if (!imgElement) {
    imgElement = new Image();
    imgElement.src = imageSource;
    var onImageLoad = function onImageLoad() {
      spriteContext.translate(x, y);
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

function keyPressed(keyName) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // If the keyName starts with Unmapped...
  if (keyName.toUpperCase().indexOf('UNMAPPED') === 0) {
    var code = parseInt(keyName.split(':')[1], 10);
    console.log('Unmapped key pressed: ' + code);
  } else {
    sendPackage(_MessageTypes2.default.KeyPressed, { action: keyName, message: message });
  }
}
function keyReleased(keyName) {
  if (keyName.indexOf('UNMAPPED') === 0) {
    var code = parseInt(keyName.split(':')[1], 10);
    console.log('Unmapped key released: ' + code);
  } else {
    sendPackage(_MessageTypes2.default.KeyReleased, { action: keyName });
  }
}

var keyMap = [{ code: 65, action: _PlayerActions2.default.LEFT }, // a
{ code: 65, action: _PlayerActions2.default.LEFT }, { code: 37, action: _PlayerActions2.default.LEFT }, // left arrow
{ code: 87, action: _PlayerActions2.default.UP }, // w
{ code: 38, action: _PlayerActions2.default.UP }, // up arrow
{ code: 68, action: _PlayerActions2.default.RIGHT }, // d
{ code: 39, action: _PlayerActions2.default.RIGHT }, // right arrow
{ code: 83, action: _PlayerActions2.default.DOWN }, // s
{ code: 40, action: _PlayerActions2.default.DOWN }, // down arrow
{ code: 16, action: _PlayerActions2.default.SHIFT }, { code: 32, action: _PlayerActions2.default.SHOOT_PROJECTILE }];

// Low Level Event Handlers
function keyDown(e) {
  var keyInfo = keyMap.find(function (k) {
    return k.code === e.keyCode;
  });
  if (keyInfo) {
    var message = {};
    switch (keyInfo.action) {
      case _PlayerActions2.default.SHOOT_PROJECTILE:
        // console.log("trying to shoot fireball");
        shootFireball(mousePosition);
        break;
      default:
        keyPressed(keyInfo.action, message);
        break;
    }
  } else {
    keyPressed(_PlayerActions2.default.UNMAPPED + ':' + e.keyCode);
  }
}
function keyUp(e) {
  var keyInfo = keyMap.find(function (k) {
    return k.code === e.keyCode;
  });
  if (keyInfo) {
    keyReleased(keyInfo.action);
  } else {
    keyReleased(_PlayerActions2.default.UNMAPPED + ':' + e.keyCode);
  }
}
var lastMovePackage = +Date.now();
var moveInterval = 250;
function mouseMove(e) {

  var angle = 0;
  if (!playerCharacter) return;

  if (playerCharacter.position) {
    angle = (0, _gx2D.angle2d)(playerCharacter.position.x, playerCharacter.position.y, e.clientX, e.clientY);
  }
  // Local only
  if (!playerCharacter.isWalking) {
    playerCharacter.angle = angle + Math.PI / 2; // Player character starts facing the wrong way. 
  }

  mousePosition = { x: e.clientX, y: e.clientY };

  if (+Date.now() > lastMovePackage + moveInterval) {
    // console.log("sending move package");
    sendPackage(_MessageTypes2.default.MouseMove, { aim: mousePosition });
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
  if (e.button === 2) {
    console.log("DOWN: " + e.button);
    e.preventDefault();
    return;
  } else {
    sendPackage(_MessageTypes2.default.MouseDown, {
      button: e.button,
      x: e.clientX,
      y: e.clientY
    });
  }
}
function mouseUp(e) {
  if (e.button === 2) {
    console.log("UP: " + e.button);
    e.preventDefault();
    return;
  } else {
    sendPackage(_MessageTypes2.default.MouseUp, {
      button: e.button,
      x: e.clientX,
      y: e.clientY
    });
  }
}

function shootFireball(towardPosition) {
  sendPackage(_MessageTypes2.default.KeyPressed, {
    action: _PlayerActions2.default.SHOOT_PROJECTILE,
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

  if ([_TileTypes2.default.DIRT, _TileTypes2.default.GRASS, _TileTypes2.default.BRIDGE].includes(tileTypeAtPosition)) {
    if (!sprites.filter(function (s) {
      return s.tx === tile.tx && s.ty === tile.ty;
    }).length > 0) {
      // SPRITE
      return true;
    }
  }
  return false;
};

function initEventHandlers() {
  document.onkeydown = keyDown;
  document.onkeyup = keyUp;
  document.addEventListener('mousemove', (0, _throttling.throttle)(mouseMove, 50));
  document.addEventListener('click', mouseClick);
  window.onresize = handleResize;
  document.ondragstart = function (e) {
    return e.preventDefault();
  };
  document.addEventListener('mousedown', mouseDown);
  document.addEventListener('mouseup', mouseUp);
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
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
  // TODO: Rename. (drawLoop() ??? )
  if (client.socket.readyState !== WebSocket.OPEN) {
    toast("Websocket has closed.", "stopped drawing");
    return;
  }

  var delta = timestamp - loopTime;
  updateHUD(delta);

  loopTime = timestamp;

  drawCanvas();
  // ensure next frame runs.
  window.requestAnimationFrame(updateLoop);
}

var updateHUD = function updateHUD(delta) {
  ui.textSprites.forEach(function (cbText) {
    if (cbText.update) {
      cbText.update(delta);
    }
  });

  var characters = sprites.filter(function (s) {
    return s instanceof _Character2.default;
  });
  characters.forEach(function (character) {
    // console.log("setting stats to " + character.health + " " + character.stats.maxHp + " for: ", character);
    if (character.healthBar) {
      character.healthBar.stats.current = character.stats.hp;
      character.healthBar.stats.max = character.stats.maxHp;
    }
  });
};

var sendPackage = async function sendPackage() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var reconnect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (type === null) throw new Error('Package type must be specified.');

  if ([WebSocket.CLOSED, WebSocket.CLOSING].includes(client.socket.readyState)) {
    if (reconnect) {
      console.log("Reconnecting.");
      client.socket = await openClientSocket();
    } else {
      console.log("Socket is closed. This will not work.");
    }
  }
  client.socket.send(JSON.stringify(Object.assign({ type: type }, attributes)));
};

setInterval(function pingPong() {
  sendPackage(_MessageTypes2.default.PING, {});
  // console.log("Ping sent.");
}, 25000);

startSocketClient(); // TODO: Need to monitor and reconnect


// TODO: Move to separate module
/// UI Manager

var UIParent = document.getElementById('UI_Overlay');
UIParent.visibleChildren = [document.getElementById('UI_Login')];

function showUI(uiElementId) {
  // Get UI element
  var uiElement = document.getElementById(uiElementId);

  // if nothing is returned or if it's already visible we don't need to do anything
  if (!uiElement || UIParent.visibleChildren.includes(uiElement)) return;

  // otherwise remove the hidden class
  uiElement.classList.remove("hidden");
  UIParent.classList.remove("hidden");

  // ... and keep track.
  UIParent.visibleChildren.push(uiElement);
}

function hideUI(uiElement) {

  if (!uiElement) return;

  if ((typeof uiElement === 'undefined' ? 'undefined' : _typeof(uiElement)) === _typeof("")) {
    uiElement = document.querySelector('#' + uiElement);
  }

  uiElement.classList.add("hidden");

  var index = UIParent.visibleChildren.indexOf(uiElement);
  if (index !== -1) {
    UIParent.visibleChildren.splice(index, 1);
  }

  if (UIParent.visibleChildren.length === 0) UIParent.classList.add("hidden");
}

// UI Implementation

var loginButton = document.getElementById('UI_Login__Button');

loginButton.addEventListener('click', function (e) {
  e.preventDefault();
  console.log("Login button clicked.");
  var username = document.getElementById('UI_Username__Input').value;
  var password = document.getElementById('UI_Password__Input').value;
  sendLogin(username, password);
});

/***/ }),
/* 49 */,
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
//# sourceMappingURL=client.bundle.js.map