import Sprite from './Sprite';

export default class Explosion extends Sprite {
  constructor(params = {}) {
    super(params);
    this.setPosition(params.start);
    this.setTexture('./images/ChestClosed.png');
  }
}