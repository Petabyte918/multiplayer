
import Character from './Character';
import { GameSettings } from '../GameSettings';
import ColliderTypes from '../ColliderTypes';

class PlayerCharacter extends Character {
  constructor(characterName = 'Frank', startX = 1, startY = 1) {
    super({ 
      collider: { 
        type: ColliderTypes.RADIUS,
        tags: ['PLAYER']
      }
    });

    this.id = -1;
    
    this.name = characterName;
    this.level = 1;
    this.strength = 1;
    this.health = 50;
    this.maxHealth = 50;
    
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

  update(delta) {
    const deltaY = Math.sin(this.angle) * this.velocity * delta;
    const deltaX = Math.cos(this.angle) * this.velocity * delta;
    this.x += deltaX;
    this.y += deltaY;
  }

  takeDamage(amount = 0, sourceCharacter) {
    // TODO: modifiers.
    this.health -= amount;
    if(this.health < 0) {
      console.log("Overkill!!!! -> " + Math.abs(this.health) + " HP");
      this.health = 0;
    }
    if(this.health === 0) {
      this.die();
    } else {
      console.log("Took " + amount + " Damage.");
    }
  }

  die() {
    console.error("You have died.");
  }

}

export default PlayerCharacter;