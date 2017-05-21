import Sprite from './Sprite';

class Character extends Sprite {
  canCast(spellId) {
    // TODO: Check if the character has the spell in their spellbook and if it's not on cooldown.
    return true;
  }
}

export default Character;