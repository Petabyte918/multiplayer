
import { GameSettings } from '../GameSettings';
import Sprite from './Sprite';
import ColliderTypes from '../ColliderTypes';
import { SpriteTypes } from '../SpriteTypes';
import { addDistance2d } from '../Helpers/gx2D';

import MediaManager from '../client/MediaManager';

// import World from '../GameEngine';

class BlueBeam extends Sprite {
  constructor(params = {}) {
    if(!params.collider) {
      params.collider = {
        type: ColliderTypes.RADIUS,
        tags: ['PROJECTILE', 'MAGIC'],
        collidesWith: ['PLAYER'],
      };
    }
    
    if(!params.collider.type)
      params.collider.type = ColliderTypes.RADIUS;
    if(!params.collider.tags)
      params.collider.tags = ['PROJECTILE', 'MAGIC'];
    if(!params.collider.collidesWith)
      params.collider.collidesWith = ['PLAYER'];

    super(params);

    const start = params.start || { x: 0, y: 0 };
    const aim = params.aim || { x: -1, y: -1, placeholder: true };
    const speed = params.speed || GameSettings.TILE_SCALE * 25;

    const life = params.life || 1.5; // Seconds to live

    this.setTexture('./images/BlueBeam.png');

    //console.log("Starting fireball at: ", start);
    this.setPosition(start);
    this.aim = aim;
    // https://gist.github.com/conorbuck/2606166
    this.angle = Math.atan2(aim.y - start.y, aim.x - start.x); // radians
    //console.log("Speed is: ", speed);
    this.speed = speed;

    this.playerPosition = params.playerPosition || { x: 0, y: 0 };

    this.stats = {
      damage: 10,
      tickRate: .5,
    };
    
    // TODO: Don't hit this fireball's owner!!!! this.owner = owner;

    this.livesUntil = Date.now() + (life * 1000); // 3 seconds.

    this.lastTick = +Date.now();
  }

  update(delta) {

    if (Date.now() > this.livesUntil) {
      this.delete();
      return;
    }

    if(this.aim.placeholder) return;

    const beamPosition = addDistance2d(this.playerPosition, this.angle, .5 * GameSettings.TILE_SCALE);
    this.setPosition(beamPosition);

    if(+Date.now() - this.lastTick >= this.stats.tickRate) {
      // TODO: do tick damage to anything that the hit box overlaps.
      // Time to do other collision types.
    }

  }

  /**
   * @override
   */
  draw(context) {
    let imgElement = MediaManager.loadImage(this.texture);

    let rotAngle = 0;
    if (this.angle) {
      rotAngle = this.angle;
    }
    context.translate(this.position.x, this.position.y);
    context.rotate(rotAngle);
    context.drawImage(imgElement, 0, -16);
    context.drawImage(imgElement, 32, -16);
    context.drawImage(imgElement, 64, -16);
    context.rotate(-rotAngle);
    context.translate(-(this.position.x), -(this.position.y));

    if(this.children) {
      this.children.forEach(child => {
        if(child.draw) {
          child.draw(context);
        }
      })
    }
  }

  delete() {
    throw new Error("Must override FireBall.delete() method on instances.");
  }

  onCollisionEnter(otherCollider) {
    super.onCollisionEnter && super.onCollisionEnter(otherCollider);
    
    // if(otherCollider.tags.includes('PLAYER')) {
    //   const otherPlayer = otherCollider.ownerGO;
    //   World.CharacterManager.applyDamage(otherPlayer, { damage: this.stats.damage, source: this.ownerGO  });
    //   World.spawnSprite(otherPlayer.levelId, SpriteTypes.EXPLOSION, { start: this.position });
    // } else {
    //   World.spawnSprite(World.getLevelBySprite(this).id, SpriteTypes.EXPLOSION, { start: this.position });
    // }

    // World.despawnSpriteByLevel(World.getLevelBySprite(this).id, this);

  }

}

export default BlueBeam;
