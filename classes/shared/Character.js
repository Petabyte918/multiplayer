import Sprite from './Sprite';
import ColliderTypes from '../ColliderTypes';

class Character extends Sprite {
  constructor(paramObject = {}) {
    if(!paramObject.collider) paramObject.collider = { type: ColliderTypes.RADIUS }
    super(paramObject);
  }
  canCast(spellId) {
    // TODO: Check if the character has the spell in their spellbook and if it's not on cooldown.
    return true;
  }
}

export default Character;