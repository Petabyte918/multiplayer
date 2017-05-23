import GameObject from './GameObject'

class Sprite extends GameObject {
  
  setPosition(position) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

}

export default Sprite;