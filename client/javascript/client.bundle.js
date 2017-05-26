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
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(11);

var _GameObject3 = _interopRequireDefault(_GameObject2);

var _Collider = __webpack_require__(9);

var _Collider2 = _interopRequireDefault(_Collider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    // TODO: Add sprite frame dimensions
    // TODO: Add framerate.
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

      console.log("Collision detected between: ", this.instanceId, otherCollider.ownerGO.instanceId);
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
      if (this.moving) {
        console.log("Updating");
        if (this.aim.placeholder) return;
        // SOH, CAH, TOA
        var deltaY = Math.sin(this.angle) * this.speed * delta / 1000;
        var deltaX = Math.cos(this.angle) * this.speed * delta / 1000;
        this.setPosition({
          x: this.position.x + deltaX,
          y: this.position.y + deltaY
        });
      }
    }
  }]);

  return Sprite;
}(_GameObject3.default);

exports.default = Sprite;

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Character2 = __webpack_require__(13);

var _Character3 = _interopRequireDefault(_Character2);

var _GameSettings = __webpack_require__(2);

var _ColliderTypes = __webpack_require__(4);

var _ColliderTypes2 = _interopRequireDefault(_ColliderTypes);

var _gx2D = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    _this.health = 50;
    _this.maxHealth = 50;
    _this.velocity = 0;

    _this.moveTarget = {};

    _this.color = '#3aadd1'; // TODO: Do we want to keep this property?
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
exports.ClientSpriteClassMap = exports.SpriteTypes = undefined;
exports.GetSpriteTypeName = GetSpriteTypeName;

var _PlayerCharacter = __webpack_require__(3);

var _PlayerCharacter2 = _interopRequireDefault(_PlayerCharacter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpriteTypes = exports.SpriteTypes = {
  PLAYER: 'SpriteTypes.PLAYER',
  CHEST: 'SpriteTypes.CHEST',
  FIREBALL: 'SpriteTypes.FIREBALL',
  EXPLOSION: 'SpriteTypes.EXPLOSION'
};

var ClientSpriteClassMap = exports.ClientSpriteClassMap = new Map();
ClientSpriteClassMap.set(SpriteTypes.PLAYER, _PlayerCharacter2.default);

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
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.angle2d = angle2d;
exports.distance2d = distance2d;
function angle2d(ax, ay, bx, by) {
  return Math.atan2(by - ay, bx - ax);
}

// These are terrible.
// see: https://en.wikipedia.org/wiki/Linear_interpolation
// export function lerp1d(start, end, delta) {
//   return ( start.y * (end.x - delta) + end.y * (delta - start.x) ) / (end.x - start.x);
// }

// export function lerp2d(startPosition, endPosition, delta) {
//   return { 
//     x: lerp1d(startPosition.x, endPosition.x, delta),
//     y: lerp1d(startPosition.y, endPosition.y, delta),
//   }
// }

function distance2d(startPosition, endPosition) {
  var aSquared = Math.pow(startPosition.x - endPosition.x, 2);
  var bSquared = Math.pow(startPosition.y - endPosition.y, 2);
  return Math.sqrt(aSquared + bSquared);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollisionStatus = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _guid = __webpack_require__(0);

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
          console.log("Collided with tags: ", collidedTags);
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _guid = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
  function GameObject() {
    _classCallCheck(this, GameObject);

    // (paramObject = {}) {
    this.position = {
      x: 0,
      y: 0
    };
    this.instanceId = (0, _guid.guid)();
  }

  _createClass(GameObject, [{
    key: 'setPosition',
    value: function setPosition() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };

      this.position.x = position.x;
      this.position.y = position.y;
    }
  }]);

  return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite2 = __webpack_require__(1);

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _ColliderTypes = __webpack_require__(4);

var _ColliderTypes2 = _interopRequireDefault(_ColliderTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Character = function (_Sprite) {
  _inherits(Character, _Sprite);

  function Character() {
    var paramObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Character);

    if (!paramObject.collider) paramObject.collider = { type: _ColliderTypes2.default.RADIUS };
    return _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).call(this, paramObject));
  }

  _createClass(Character, [{
    key: 'canCast',
    value: function canCast(spellId) {
      // TODO: Check if the character has the spell in their spellbook and if it's not on cooldown.
      return true;
    }
  }, {
    key: 'takeDamage',
    value: function takeDamage() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var sourceCharacter = arguments[1];

      // TODO: modifiers.
      this.health -= amount;
      var overkill = 0;
      if (this.health < 0) {
        overkill = Math.abs(this.health);
        console.log("Overkill!!!! -> " + overkill + " HP");
        this.health = 0;
      }

      var damagePackage = {
        playerId: this.instanceId,
        remaining: [this.stats.hp, this.stats.maxHp],
        amount: amount,
        overkill: overkill,
        source: sourceCharacter ? sourceCharacter.instanceId : null
      };

      // TODO: factor out hacked in code to work with library somehow. Shared codebase is causing issues with this.
      // broadcastPackage(
      //   MessageTypes.TakeDamage,
      //   damagePackage
      // );

      console.log("Took " + amount + " Damage.");

      if (this.health === 0) {
        this.die();
      }
    }
  }, {
    key: 'die',
    value: function die() {
      // broadcastPackage(
      //   MessageTypes.PlayerDeath,
      //   {
      //     instanceId: this.instanceId,
      //     position: this.position
      //   }
      // );
      // setTimeout(function() {
      //   broadcastPackage(
      //     MessageTypes.Despawn,
      //     {
      //       spawnId: this.instanceId
      //     }
      //   )
      // }, 3500);
      console.error("You have died.");
    }
  }]);

  return Character;
}(_Sprite3.default);

exports.default = Character;

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;
exports.debounce = debounce;
function throttle(fn, threshhold, scope) {
  console.log("throttling.!!!");
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(11);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  fillStyle: "red",
  font: "14px Comic Sans MS",
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

    console.log("TTL: " + (params.lifeTime || defaults.lifeTime));
    _this.cancelTimeout = setTimeout(function () {
      console.log("Deleting");
      _this.delete();
    }, params.lifeTime || defaults.lifeTime);

    console.log("Created combat text: ", _this);
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
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _PlayerCharacter = __webpack_require__(3);

var _PlayerCharacter2 = _interopRequireDefault(_PlayerCharacter);

var _Sprite = __webpack_require__(1);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _CombatText = __webpack_require__(23);

var _CombatText2 = _interopRequireDefault(_CombatText);

var _MessageTypes = __webpack_require__(5);

var _MessageTypes2 = _interopRequireDefault(_MessageTypes);

var _TileTypes = __webpack_require__(22);

var _TileTypes2 = _interopRequireDefault(_TileTypes);

var _SpriteTypes = __webpack_require__(6);

var _PlayerActions = __webpack_require__(10);

var _PlayerActions2 = _interopRequireDefault(_PlayerActions);

var _GameSettings = __webpack_require__(2);

var _gx2D = __webpack_require__(8);

var _throttling = __webpack_require__(21);

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

var SpriteTextureMap = new Map();
SpriteTextureMap.set(_SpriteTypes.SpriteTypes.CHEST, './images/ChestClosed.png');
SpriteTextureMap.set(_SpriteTypes.SpriteTypes.FIREBALL, './images/FireballStatic.png');
SpriteTextureMap.set(_SpriteTypes.SpriteTypes.PLAYER, './images/PlayerOverhead.png');

var ImageLoader = new Map();

var playerCharacter = null;

// level tiles / objects for map the player is currently on.
var tileMap = [];
var sprites = []; // SPRITE
var ui = {
  textSprites: [],
  addCombatText: function addCombatText(text) {
    this.textSprites.push(text);
  },
  removeCombatText: function removeCombatText(text) {
    console.log("Removing from index: " + this.textSprites.indexOf(text));
    this.textSprites.splice(this.textSprites.indexOf(text), 1);
    drawCanvas();
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
        console.log("Pong received.");
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
        console.log('Spawn info: ', message);
        if (!message.spawnClass) {
          console.error("No spawn class provided.");
          return;
        }
        if (message.spawnClass === _SpriteTypes.SpriteTypes.PLAYER) {
          console.log("Player spawned: ", message.spawn.instanceId);
        }
        // const spawnClass = SpriteClassMap.get(message.spawnClass);
        if (message.spawn.instanceId === playerCharacter.instanceId) return;
        var newSpawn = Object.assign(new _Sprite2.default(), message.spawn, { type: message.spawnClass });
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
              console.log("couldn't find sprite.", spriteUpdateInfo);
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
  var target = message.target;
  var damage = message.damage;
  var text = new _CombatText2.default({
    text: '-' + damage,
    lifeTime: 1000,
    position: target.position
  }, function () {
    console.log("trying to remove combat text.");
    ui.removeCombatText(text);
  });
  ui.addCombatText(text);
};

var sendLogin = function sendLogin(username, password) {
  sendPackage(_MessageTypes2.default.Who, { who: username + ':' + password });
};

var classifySprite = function classifySprite(sprite, spriteClassTag) {
  if (!spriteClassTag) return sprite;
  var spriteClass = _SpriteTypes.ClientSpriteClassMap.get(spriteClassTag);
  if (sprite instanceof spriteClass) return;
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
  spriteCanvas.width = cursorCanvas.width = tileCanvas.width = document.body.offsetWidth;
  spriteCanvas.height = cursorCanvas.height = tileCanvas.height = document.body.offsetHeight;
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

    if (sprite instanceof _PlayerCharacter2.default) {
      drawSprite(sprite.position.x, sprite.position.y, SpriteTextureMap.get(_SpriteTypes.SpriteTypes.PLAYER), sprite.angle || 0);
    } else {
      // console.log("Other type of sprite: ", sprite.type, sprite.position, typeof sprite, sprite);
      var imageSource = sprite.texture || SpriteTextureMap.get(sprite.type);
      if (imageSource === undefined) console.log("undefined darnit.", sprite);
      drawSprite(sprite.position.x, sprite.position.y, imageSource, sprite.angle || 0);
    }
  });
};

var drawHUD = function drawHUD() {
  // TODO: draw HUD
  uiContext.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
  ui.textSprites.forEach(function (cbText) {
    console.log("Drawing text: " + cbText.text);
    if (cbText.draw) {
      cbText.draw(uiContext);
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
    console.log("Drawing text: " + cbText.text);
    if (cbText.update) {
      cbText.update(delta);
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
  console.log("Ping sent.");
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

/***/ })
/******/ ]);
//# sourceMappingURL=client.bundle.js.map