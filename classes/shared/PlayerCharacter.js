
import Character from './Character';
import { GameSettings } from '../GameSettings';
import ColliderTypes from '../ColliderTypes';

import { distance2d, angle2d } from '../Helpers/gx2D';

//import World, { MessageTypes, sendPackage, broadcastPackage  } from '../GameEngine';

class PlayerCharacter extends Character {
  constructor(characterName = 'Frank') {
    super({
      collider: {
        type: ColliderTypes.RADIUS,
        tags: ['PLAYER']
      }
    });

    this.id = -1;
    
    this.name = characterName;
    this.stats = {
      level: 1,
      strength: 1,
      hp: 50,
      maxHp: 50,
      maxVelocity: 8 * GameSettings.TILE_SCALE,
      acceleration: 16 * GameSettings.TILE_SCALE,
    };
    this.level = 1;
    this.strength = 1;
    this.health = 50;
    this.maxHealth = 50;
    this.velocity = 0;

    this.moveTarget = {};

    this.color = '#3aadd1'; // TODO: Do we want to keep this property?
  }

  setPosition(position) {
    super.setPosition(position);
    this.tx = Math.round(this.position.x / GameSettings.TILE_SCALE);
    this.ty = Math.round(this.position.y / GameSettings.TILE_SCALE);
    if(this.tx < 0) this.tx = 0;
    if(this.ty < 0) this.ty = 0;
  }

  get hasMoveTarget() {
    return this.moveTarget && this.moveTarget.x && this.moveTarget.y;
  }
  setMoveTarget(x, y) {
    this.moveTarget = { x, y };
  }
  clearMoveTarget() {
    this.moveTarget = undefined;
    this.moveAngle = undefined;
  }

  update(delta) {
    if(this.hasMoveTarget) {
      this.isWalking = true;

      // TODO: make 8 = some STOPPING_DISTANCE constant ... GameSettings?
      if(distance2d(this.position, this.moveTarget) < 8) {
        this.clearMoveTarget();
        return;
      }

      this.moveAngle = angle2d(this.position.x, this.position.y, this.moveTarget.x, this.moveTarget.y);
      this.angle = this.moveAngle + Math.PI / 2;

      
      if (this.velocity < this.stats.maxVelocity) {
        // console.log('accelerating from: ' + this.velocity, "DELTA: " + delta, "ANGLE: " + this.angle);
        this.velocity += (this.stats.acceleration * delta / 1000);
        if(this.velocity > this.stats.maxVelocity) this.velocity = this.stats.maxVelocity
        // console.log('New velocity: ' + this.velocity + '/' + this.stats.maxVelocity);
      }

      const deltaY = Math.sin(this.moveAngle) * this.velocity * (delta / 1000);
      const deltaX = Math.cos(this.moveAngle) * this.velocity * (delta / 1000);

      const newPosition = {
        x: this.position.x + deltaX,
        y: this.position.y + deltaY
      };
      //console.log(this.position, newPosition);
      this.setPosition(newPosition);
    } else {
      this.isWalking = false;
      if(this.hasMoveTarget) this.clearMoveTarget();
      this.velocity = 0;
    }
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
      source: sourceCharacter.instanceId
    }

    // sendPackage(
    //   World.getClientByPlayerCharacter(this).socket,
    //   MessageTypes.TakeDamage,
    //   damagePackage 
    // );
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

export default PlayerCharacter;