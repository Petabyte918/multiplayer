
import fs from 'fs';

import Level from '../shared/Level';
import { SpriteClassMap } from '../SpriteClassMap';

const levels = {};

class LevelManager {

  get levels() {
    return levels;
  }

  getLevel(levelId) {
    if(!this.levels[levelId]) {
      
      const level = new Level(levelId);
      const levelData = this.loadFromJSONFile(`./levels/level_${levelId}.json`);
      Object.assign(level, levelData);
      level.populate(levelData);

      if(!level)
        throw new Error("Level did not load. This is probably because of an invalid level ID.");

      this.levels[levelId] = level;
    }
    return this.levels[levelId];
  }
  // Note: I expect this is a fairly expensive operation, so I probably don't want to do it every frame.
  getLevelBySprite(sprite) {
    let levelFound = null;
    Object.keys(this.levels).forEach(levelId => {
      // console.log("doing get level");
      const level = this.getLevel(levelId);
      // console.log("got level");
      if(level.sprites.indexOf(sprite) !== -1) {
        levelFound = level;
        // console.log("Found from comparison: " + levelFound.id);
      }
    });
    // console.log("return level: ", levelFound);
    return levelFound;
  }

  loadFromJSONFile(filename) {
    const level = JSON.parse(fs.readFileSync(filename, 'utf-8'));
    
    // console.log("Loaded Level: ", level);

    level.sprites = level.sprites.map(s => {
      const spriteClass = SpriteClassMap.get(s.type);
      if(spriteClass) {
        return Object.assign(new spriteClass(), s);
      }
      return s;
    });
    return level;
  }

  addSprite(levelId, sprite) {
    (this.getLevel(levelId)).addSprite(sprite);
  }

  removeSprite(levelId, sprite) {
    (this.getLevel(levelId)).removeSprite(sprite);
  }

}

const levelManager = new LevelManager();

export default levelManager;