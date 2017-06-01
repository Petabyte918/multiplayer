import { SpriteTypes } from '../../SpriteTypes';
import MessageTypes from '../../MessageTypes';
import { GameSettings } from '../../GameSettings';
import World, { broadcastPackage } from '../../GameEngine';

import Ability from './Ability';

import FireBall from '../../shared/FireBall';

import { addDistance2d } from '../../Helpers/gx2D';


export default class FireballAbility extends Ability {
  /**
   * Fireball ability
   * @param {Object} params - Parameters for creating this ability class.
   * @param {string} params.playerInstanceId - Instance ID of the player who this ability is assigned to.
   */
  constructor(params) {
    super(params);
    this.name = 'Fireball';
    this.cooldown = 500;
    this.cooldownStart = null;
  }

  use(pc, params) {
    if(this.isOnCooldown()) {
      // TODO: some sort of notification to the client that the ability cannot currently be used.
      /// ie. sendPackage(...)
    } else {
      this.triggerCooldown();
      const fireball = new FireBall(
        {
          start: addDistance2d(pc.position, pc.angle - Math.PI / 2, .5 * GameSettings.TILE_SCALE),
          aim: pc.hasMoveTarget ? pc.moveTarget : params.aim, // If the player is moving shoot the fireball at the movement position, otherwise shoot at the mouse position.
          speed: GameSettings.TILE_SCALE * 12,
          collider: {
            ignoresIds: [ pc.instanceId ]
          }
        }
      );

      const sprites = World.levels[pc.levelId].sprites;
      sprites.push(fireball);
      broadcastPackage(MessageTypes.Spawn, { spawnClass: SpriteTypes.FIREBALL, spawn: fireball });

      fireball.delete = () => {
        sprites.splice(sprites.indexOf(fireball), 1);
        broadcastPackage(MessageTypes.Despawn, { spawnId: fireball.instanceId });
      };
    }
  }

}