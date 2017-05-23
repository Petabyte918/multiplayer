
import GameSettings from '../GameSettings';
import Sprite from './Sprite';

class FireBall extends Sprite {
  constructor(paramObject = {}) {
    super(paramObject);

    const start = paramObject.start || { x: 0, y: 0 };
    const aim = paramObject.aim || { x: -1, y: -1, placeholder: true };
    const speed = paramObject.speed || GameSettings.TILE_SCALE * 25;
    const owner = paramObject.owner || null;

    const life = paramObject.life || .5; // Seconds to live

    console.log("Starting fireball at: ", start);
    this.setPosition(start);
    this.aim = aim;
    // https://gist.github.com/conorbuck/2606166
    this.angle = Math.atan2(aim.y - start.y, aim.x - start.x); // radians
    console.log("Speed is: ", speed);
    this.speed = speed;
    
    // TODO: Don't hit this fireball's owner!!!! this.owner = owner;

    this.livesUntil = Date.now() + (life * 1000); // 3 seconds.
  }

  update(delta) {
    if (Date.now() > this.livesUntil) {
      // console.log("Deleting fireball.");
      this.delete();
      return;
    }
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

}

export default FireBall;
