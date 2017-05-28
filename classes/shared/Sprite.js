
// import { SpriteTextureMap } from '../SpriteTypes';

import MediaManager  from '../client/MediaManager';

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

    if(!this.angle) this.angle = params.angle || 0;
    // TODO: Add sprite frame dimensions
    // TODO: Add framerate.
    // TODO: ANIMATE!!! Yay!
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

    // console.log("Collision detected between: ", this.instanceId, otherCollider.ownerGO.instanceId);
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
    // console.log("updating sprite");
    super.update(delta);
    // if(this.moving) {
    //   console.log("Updating");
    //   if(this.aim.placeholder) return;
    //   // SOH, CAH, TOA
    //   const deltaY = Math.sin(this.angle) * this.speed * delta / 1000;
    //   const deltaX = Math.cos(this.angle) * this.speed * delta / 1000;
    //   this.setPosition({
    //     x: this.position.x + deltaX,
    //     y: this.position.y + deltaY
    //   });
    // }
  }

  draw(context) {
    if(!this.texture) return;
    let imgElement = MediaManager.loadImage(this.texture);

    let rotAngle = 0;
    if (this.angle) {
      rotAngle = this.angle;
    }
    context.translate(this.position.x, this.position.y);
    context.rotate(rotAngle);
    context.drawImage(imgElement, -16, -16);
    context.rotate(-rotAngle);
    context.translate(-this.position.x, -this.position.y);

    if(this.children) {
      this.children.forEach(child => {
        if(child.draw) {
          child.draw(context);
        }
      })
    }

  }
}

export default Sprite;