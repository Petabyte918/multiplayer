import GameObject from './GameObject';
import Collider, { CollisionStatus } from './Collider';

class Sprite extends GameObject {
  
  constructor(params = {}) {
    super(params);

    // ensure we don't get undefined errors and then pass params to the Collider constructor
    params.collider = params.collider || {};
    // TODO: shall we take this one level deeper and put it on GameObject?
    //        Since base game object technically doesn't move, it should only have collider if it is a wall, trigger or switch.
    this.collider = new Collider(params.collider, params.owner || this);

    this.moving = params.moving || false;
    this.aim = params.aim || { x: -1, y: -1, placeholder: true };

    this.texture = './images/SpritePlaceholder.png';
    // TODO: Add sprite frame dimensions
    // TODO: Add framerate.
  }

  setTexture(imageSource) {
    this.texture = imageSource;
  }

  checkCollision(target) {
    if(this.collider) return this.collider.getCollisionStatus(target);
    return CollisionStatus.NONE;
  }

  setPosition(position = { x: 0, y: 0 }) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  onCollisionEnter(otherCollider) {
    // console.log("OTHER Collider is: ", otherCollider.ownerGO);

    console.log("Collision detected between: ", this.instanceId, otherCollider.ownerGO.instanceId);
  }

  toJSON() {
    const output = Object.assign({}, this);
    if(output.collider) {
      output.collider = Object.assign({}, output.collider);
      output.collider.ownerGO = undefined;
    } 
    return output;
  }


  update(delta) {
    if(this.moving) {
      console.log("Updating");
      if(this.aim.placeholder) return;
      // SOH, CAH, TOA
      const deltaY = Math.sin(this.angle) * this.speed * delta / 1000;
      const deltaX = Math.cos(this.angle) * this.speed * delta / 1000;
      this.setPosition({
        x: this.position.x + deltaX,
        y: this.position.y + deltaY
      });
    }
  }
}

export default Sprite;