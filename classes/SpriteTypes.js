
import PlayerCharacter from './shared/PlayerCharacter';
import FireBall from './shared/FireBall';


const SpriteTypes = {
  PLAYER: 'SpriteTypes.PLAYER',
  CHEST: 'SpriteTypes.CHEST',
  FIREBALL: 'SpriteTypes.FIREBALL',
};

export const SpriteClassMap = new Map();
SpriteClassMap.set(SpriteTypes.PLAYER, PlayerCharacter);
SpriteClassMap.set(SpriteTypes.FIREBALL, FireBall);

export default SpriteTypes;
