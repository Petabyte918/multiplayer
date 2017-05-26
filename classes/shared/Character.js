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

  takeDamage(amount = 0, sourceCharacter) {
    // TODO: modifiers.
    this.health -= amount;
    let overkill = 0;
    if (this.health < 0) {
      overkill = Math.abs(this.health);
      console.log("Overkill!!!! -> " + overkill  + " HP");
      this.health = 0;
    }

    const damagePackage = {
      playerId: this.instanceId,
      remaining: [ this.stats.hp, this.stats.maxHp ],
      amount,
      overkill,
      source: sourceCharacter ? sourceCharacter.instanceId : null
    };

    // TODO: factor out hacked in code to work with library somehow. Shared codebase is causing issues with this.
    // broadcastPackage(
    //   MessageTypes.TakeDamage,
    //   damagePackage
    // );

    console.log("Took " + amount + " Damage.");

    if (this.health === 0) {
      this.die();
    }

  }

  die() {
    // broadcastPackage(
    //   MessageTypes.PlayerDeath,
    //   {
    //     instanceId: this.instanceId,
    //     position: this.position
    //   }
    // );
    // setTimeout(function() {
    //   broadcastPackage(
    //     MessageTypes.Despawn,
    //     {
    //       spawnId: this.instanceId
    //     }
    //   )
    // }, 3500);
    console.error("You have died.");
  }

}

export default Character;