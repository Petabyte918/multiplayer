import GameObject from './GameObject'

class Sprite extends GameObject {
  
  constructor(paramObject = {}) {
    super(paramObject)
    this.collisionTags = paramObject.collisionTags || [];
  }

  setPosition(position) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

}

export default Sprite;