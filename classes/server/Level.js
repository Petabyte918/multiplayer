import fs from 'fs';
import Sprite from '../shared/Sprite';
import { GameSettings } from '../GameSettings';
import { SpriteClassMap, GetSpriteTypeName } from '../SpriteTypes';

function Level(levelId) {

  // Initialize defaults
  this.start = { tx: -1, ty: -1 };
  this.tileMap = [];
  this.sprites = [];

  this.frameQueue = [];

  // Load data (this may overwrite defaults)
  if (levelId) {
    this.id = levelId;
    this.loadFromJSONFile(`./levels/level_${levelId}.json`);
  } else {
    throw new Error("Didn't provide level ID");
  }
}

Level.prototype.toJSON = function toJSON() {
  const obj = Object.assign({}, this);
  obj.sprites = obj.sprites.map(s => {
    const obj = { spawnClass: GetSpriteTypeName(s), spawn: s }
    return obj
  });
  // console.log("Level JSONified: ", obj);
  return JSON.stringify(obj);
}

Level.prototype.loadFromJSONFile = function loadFromJSONFile(filename) {
  const levelData = JSON.parse(fs.readFileSync(filename, 'utf-8'));
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
};

export default Level;
