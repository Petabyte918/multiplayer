
const fs = require('fs');

function Level(levelId) {
  // Initialize defaults
  this.start = { tx: -1, ty: -1 };
  this.tileMap = [];
  this.sprites = [];

  // Load data
  if (levelId) {
    this.id = levelId;
    this.loadFromJSONFile(`./levels/level_${levelId}.json`);
  } else {
    throw new Error("Didn't provide level ID");
  }
}

Level.prototype.loadFromJSONFile = function loadFromJSONFile(filename) {
  const levelData = JSON.parse(fs.readFileSync(filename, 'utf-8'));
  this.start = levelData.start;
  this.tileMap = levelData.tileMap;
  this.sprites = levelData.sprites;
};

module.exports = Level;
