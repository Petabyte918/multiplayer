
import PlayerCharacter from './shared/PlayerCharacter';
import BlueBeam from './shared/BlueBeam';

export const SpriteTypes = {
  PLAYER: 'SpriteTypes.PLAYER',
  CHEST: 'SpriteTypes.CHEST',
  FIREBALL: 'SpriteTypes.FIREBALL',
  BLUEBEAM: 'SpriteTypes.BLUEBEAM',
  EXPLOSION: 'SpriteTypes.EXPLOSION',
  BLOODSTAIN: 'SpriteTypes.BLOODSTAIN',
};

export const ClientSpriteClassMap = new Map();
ClientSpriteClassMap.set(SpriteTypes.PLAYER, PlayerCharacter);
ClientSpriteClassMap.set(SpriteTypes.BLUEBEAM, BlueBeam);

export const SpriteTextureMap = new Map();
SpriteTextureMap.set(SpriteTypes.CHEST, './images/ChestClosed.png');
SpriteTextureMap.set(SpriteTypes.FIREBALL, './images/FireballStatic.png');
SpriteTextureMap.set(SpriteTypes.FIREBALL, './images/BlueBeam.png');
SpriteTextureMap.set(SpriteTypes.PLAYER, './images/PlayerOverhead.png');

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
