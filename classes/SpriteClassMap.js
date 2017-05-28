
import PlayerCharacter from './shared/PlayerCharacter';
import FireBall from './shared/FireBall';
import Explosion from './shared/Explosion';
import Bloodstain from './shared/Bloodstain';
import Chest from './shared/Chest';
import { SpriteTypes } from './SpriteTypes';

export const SpriteClassMap = new Map();
SpriteClassMap.set(SpriteTypes.PLAYER, PlayerCharacter);
SpriteClassMap.set(SpriteTypes.FIREBALL, FireBall);
SpriteClassMap.set(SpriteTypes.EXPLOSION, Explosion);
SpriteClassMap.set(SpriteTypes.BLOODSTAIN, Bloodstain);
SpriteClassMap.set(SpriteTypes.CHEST, Chest);

export function GetSpriteTypeName(obj) {
  var iterator = SpriteClassMap.entries();
  let mapCursor = {};

  do {
    
    mapCursor = iterator.next();
    if(mapCursor.done) break;

    if(obj instanceof mapCursor.value[1]) {
      return mapCursor.value[0];
    }
  } while(!mapCursor.done);

  return undefined;
}