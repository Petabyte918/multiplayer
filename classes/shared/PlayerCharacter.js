
import Character from './Character';
import GameSettings from '../GameSettings';

class PlayerCharacter extends Character {
  constructor(characterName = 'BoOoOoOob', startX = 1, startY = 1) {
    super();
    
    this.name = characterName;
    this.level = 1;
    this.strength = 1;
    this.health = 50;
    
    this.tx = startX;
    this.ty = startY;
    
    this.color = '#3aadd1'; // TODO: Do we want to keep this property?
  }

  setPosition(position) {
    super.setPosition(position);
    this.tx = Math.round(this.position.x / GameSettings.TILE_SCALE);
    this.ty = Math.round(this.position.y / GameSettings.TILE_SCALE);
    if(this.tx < 0) this.tx = 0;
    if(this.ty < 0) this.ty = 0;
  }
};

export default PlayerCharacter;