
import PlayerCharacter from './shared/PlayerCharacter';
import FireBall from './shared/FireBall';

export const SpriteTypes = {
  PLAYER: 'SpriteTypes.PLAYER',
  CHEST: 'SpriteTypes.CHEST',
  FIREBALL: 'SpriteTypes.FIREBALL',
};


export const SpriteClassMap = new Map();
SpriteClassMap.set(SpriteTypes.PLAYER, PlayerCharacter);
SpriteClassMap.set(SpriteTypes.FIREBALL, FireBall);

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

  console.warn("didn't find it.");
  return undefined;
}
