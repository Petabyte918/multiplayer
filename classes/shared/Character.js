import Sprite from './Sprite';
import ColliderTypes from '../ColliderTypes';

import ProgressBar from '../client/ProgressBar';

class Character extends Sprite {
  constructor(paramObject = {}) {
    if(!paramObject.collider) paramObject.collider = { type: ColliderTypes.RADIUS }
    super(paramObject);
  }

  canCast(spellId) {
    // TODO: Check if the character has the spell in their spellbook and if it's not on cooldown.
    return true;
  }

  isVisibleTo(bounds) {
    const right = this.position.x + (this.width || 32);
    const bottom = this.position.y + (this.width || 32);

    const isGood = this.position.x < bounds.right
           && this.position.y < bounds.bottom
           && right > bounds.left
           && bottom > bounds.top;
    return isGood;
  }

  drawHealthBar(context) {
    if(this.isActive() && !this.isDead) {
      if(!this.healthBar) {
        console.log("creating a healthbar");
        this.healthBar = new ProgressBar({
          x: 0,
          y: 0,
          width: 32, // TODO: Use game settings
          height: 5, 
          current: this.stats.hp,
          max: this.stats.maxHp,
          // bgColor: 
          // fgColor:
          parentGO: this
        });
        this.healthBar.setBounds(this.position.x - 16, this.position.y - 16);
        this.healthBar.draw(context);
      } else {
        // console.log("Setting healthbar bounds to: ", this.position, this.instanceId);
        this.healthBar.setBounds(this.position.x - 16, this.position.y - 16);
        this.healthBar.draw(context);
      }
    }
  }

  tookDamage(amount = 0, damageSource) {
    // TODO: modifiers.
    this.health -= amount;
    let overkill = 0;
    if (this.health < 0) {
      overkill = -this.health;
      // console.log("Overkill!!!! -> " + overkill  + " HP");
      this.health = 0;
    }
    console.log("taking damage!");

  }

}

export default Character;