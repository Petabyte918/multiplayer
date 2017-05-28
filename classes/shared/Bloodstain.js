import Sprite from './Sprite';
import World from '../GameEngine';

export default class Bloodstain extends Sprite {
  constructor(params = {}) {
    super(params);
    // console.log("Creating an explosion!!!!!");
    this.setPosition(params.start || { x: 0, y: 0 });
    this.setTexture('./images/BloodSplatter.png');

    this.livesUntil = + Date.now() + 1 * 1000; // one second bloodstain!

  }

  update(delta) {
    if (this.livesUntil && this.livesUntil <= +Date.now()) {
      World.despawnSprite(this);
      return;
    }
    super.update(delta);
  }
}