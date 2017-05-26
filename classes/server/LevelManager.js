
import fs from 'fs';

import Level from '../shared/Level';

const levels = {};

class LevelManager {

  get levels() {
    return levels;
  }

  getLevel(levelId) {
    if(!this.levels[levelId]) {
      
      const level = new Level(levelId);
      level.populate(this.loadFromJSONFile(`./levels/level_${levelId}.json`));

      if(!level)
        throw new Error("Level did not load. This is probably because of an invalid level ID.");

      this.levels[levelId] = level;
    }
    return this.levels[levelId];
  }

  loadFromJSONFile(filename) {
    return JSON.parse(fs.readFileSync(filename, 'utf-8'));
  }

  addSprite(levelId, sprite) {
    (this.getLevel(levelId)).addSprite(sprite);
  }

}

const levelManager = new LevelManager();

export default levelManager;