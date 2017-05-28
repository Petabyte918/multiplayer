import Sprite from './Sprite';
import World from '../GameEngine';

export default class Explosion extends Sprite {
  constructor(params = {}) {
    super(params);
    // console.log("Creating an explosion!!!!!");
    this.setPosition(params.start || { x: 0, y: 0 });
    this.setTexture('./images/ExplosionExploding.png');

    this.livesUntil = + Date.now() + .1 * 1000; // tenth of a second explosion

  }

  update(delta) {
    if (this.livesUntil && this.livesUntil <= +Date.now()) {
      World.despawnSprite(this);
      return;
    }
    super.update(delta);
  }
}