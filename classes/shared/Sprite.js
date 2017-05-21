import GameObject from './GameObject'

class Sprite extends GameObject {
  
  setPosition(position) {
    this.position.x = position.x;
    this.position.y = position.y;
    if(this.position.x < 0) this.position.x = 0;
    if(this.position.y < 0) this.position.y = 0;
  }

}

export default Sprite;