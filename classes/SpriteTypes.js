
import PlayerCharacter from './shared/PlayerCharacter';

export const SpriteTypes = {
  PLAYER: 'SpriteTypes.PLAYER',
  CHEST: 'SpriteTypes.CHEST',
  FIREBALL: 'SpriteTypes.FIREBALL',
  EXPLOSION: 'SpriteTypes.EXPLOSION',
};


export const ClientSpriteClassMap = new Map();
ClientSpriteClassMap.set(SpriteTypes.PLAYER, PlayerCharacter);

export function GetSpriteTypeName(obj) {
  var iterator = ClientSpriteClassMap.entries();
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
