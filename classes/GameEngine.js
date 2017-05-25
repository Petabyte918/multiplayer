
import { SpriteTypes, SpriteClassMap } from './SpriteTypes';


// TODO... think this through....
class GameWorld {
  spawn(spriteClass, attributes) {
    SpriteClassMap.get(spriteClass);

  }
}

const World = new GameWorld();

export default World;