
import { GameSettings } from '../GameSettings';
import Sprite from './Sprite';
import ColliderTypes from '../ColliderTypes';

//import World from '../GameEngine'; // Gonna break!!!

class FireBall extends Sprite {
  constructor(params = {}) {
    if(!params.collider) {
      params.collider = { 
        type: ColliderTypes.RADIUS,
        tags: ['PROJECTILE', 'FIRE'],
        collidesWith: ['PLAYER', 'WALL'],
      };
    } 
    
    if(!params.collider.type)
      params.collider.type = ColliderTypes.RADIUS;
    if(!params.collider.tags)
      params.collider.tags = ['PROJECTILE', 'FIRE'];
    if(!params.collider.collidesWith)
      params.collider.collidesWith = ['PLAYER', 'WALL'];

    super(params);

    const start = params.start || { x: 0, y: 0 };
    const aim = params.aim || { x: -1, y: -1, placeholder: true };
    const speed = params.speed || GameSettings.TILE_SCALE * 25;
    const owner = params.owner || null;

    const life = params.life || .5; // Seconds to live

    //console.log("Starting fireball at: ", start);
    this.setPosition(start);
    this.aim = aim;
    // https://gist.github.com/conorbuck/2606166
    this.angle = Math.atan2(aim.y - start.y, aim.x - start.x); // radians
    //console.log("Speed is: ", speed);
    this.speed = speed;

    this.stats = {
      damage: 10
    }
    
    // TODO: Don't hit this fireball's owner!!!! this.owner = owner;

    this.livesUntil = Date.now() + (life * 1000); // 3 seconds.
  }

  update(delta) {
    if (Date.now() > this.livesUntil) {
      // console.log("Deleting fireball.");
      this.delete();
      return;
    }

    //this.checkCollisions();

    if(this.aim.placeholder) return;
    // SOH, CAH, TOA
    const deltaY = Math.sin(this.angle) * this.speed * delta / 1000;
    const deltaX = Math.cos(this.angle) * this.speed * delta / 1000;
    this.setPosition({
      x: this.position.x + deltaX,
      y: this.position.y + deltaY
    });
  }

  delete() {
    throw new Error("Must override FireBall.delete() method on instances.");
  }

  onCollisionEnter(otherCollider) {
    super.onCollisionEnter && super.onCollisionEnter(otherCollider);
    
    if(otherCollider.tags.includes('PLAYER')) {
      const otherPlayer = otherCollider.ownerGO;
      otherPlayer.takeDamage(this.stats.damage, this.ownerGO);
      
    }

  }

}

export default FireBall;
