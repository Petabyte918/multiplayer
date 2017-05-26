
import Sprite from '../shared/Sprite';
import { GameSettings } from '../GameSettings';
import MessageTypes from '../MessageTypes';
import { GetSpriteTypeName } from '../SpriteClassMap';

import World, { broadcastPackage } from '../GameEngine';

export default class Level {
  
  constructor(levelId) {

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

  populate(levelData) {
    this.start = levelData.start;
    this.tileMap = levelData.tileMap;
    this.sprites = levelData.sprites.map((s) => {
      const sprite = Object.assign(new Sprite(), s);
      sprite.setPosition({
        x: s.tx * GameSettings.TILE_SCALE,
        y: s.ty * GameSettings.TILE_SCALE
      });
      return sprite;
    });
  }

  toJSON() {
    const obj = Object.assign({}, this);
    obj.sprites = obj.sprites.map(s => {
      const obj = { spawnClass: GetSpriteTypeName(s), spawn: s }
      return obj;
    });
    // console.log("Level JSONified: ", obj);
    return JSON.stringify(obj);
  }

  addSprite(sprite) {
    // TODO: something more robust.
    this.sprites.push(sprite);
    broadcastPackage(MessageTypes.Spawn, { spawnClass: GetSpriteTypeName(sprite), spawn: sprite });
  }

  removeSprite(sprite) {
    this.sprites.splice(this.sprites.indexOf(sprite), 1);
    broadcastPackage(MessageTypes.Despawn, { spawnId: sprite.instanceId });
  }

}

// Level.prototype.loadFromJSONFile = function loadFromJSONFile(filename) {
//   const levelData = JSON.parse(fs.readFileSync(filename, 'utf-8'));
// };

