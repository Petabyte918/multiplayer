
import { guid } from '../Helpers/guid';
import ColliderTypes from '../ColliderTypes';

class Collider {
  constructor(params = {}, ownerGO) {

    //console.log("constructing collider for owner: " + ownerGO.instanceId, ownerGO);
    //console.log("Tags: ", params.tags);
    this.ownerGO = ownerGO;

    this.type = params.type || ColliderTypes.NONE;
    this.radius = params.radius || 16;
    this.rect = params.rect || { left: 0, top: 0, right: 32, bottom: 32 };
    // Tags that this object has.
    this.tags = params.tags || ['ALL'];
    // Tags that this object reacts to.
    this.collidesWith = params.collidesWith || ['ALL'];

    this.ignoresIds = params.ignoresIds || [];

    //TODO: temporary, remove
    this.instanceId = guid();

    this.currentCollisions = [];

  }

  getCollisionStatus(otherCollider) {
    // If I have the sprite and not the collider, try to get the collider
    if(!(otherCollider instanceof Collider)) otherCollider = otherCollider.collider;
    if(!(otherCollider instanceof Collider)) return CollisionStatus.NONE;
    // If the other collider's game object is not active.
    if(!otherCollider.ownerGO.isActive()) return CollisionStatus.NONE;

    // If I'm colliding with myself return CollisionStatus.NONE;
    if(otherCollider === this) return CollisionStatus.NONE;
    // Excludes should be provided via ignoresIds
    if(this.ignoresIds.includes(otherCollider.ownerGO.instanceId)) return CollisionStatus.NONE;
    // If no collision tracking return CollisionStatus.NONE
    if(this.type === ColliderTypes.NONE || otherCollider.type === ColliderTypes.NONE) return CollisionStatus.NONE;
    
    // Check types
    const collidedTags = this.collidesWith.filter(function(tag) {
      if(otherCollider.tags.includes(tag)) {
        return true;
      }
      return false;
    });
    // No collisions on expected tag types.
    if(collidedTags.length === 0) return CollisionStatus.NONE;

    if(this.type === ColliderTypes.RADIUS && otherCollider.type === ColliderTypes.RADIUS) {
      // two radius colliders
      const thisCenter = this.getColliderPoint(PointEnum.CENTER);
      const otherCenter = otherCollider.getColliderPoint(PointEnum.CENTER);
      const distance = this.getDistanceBetween(thisCenter, otherCenter);
      let isOverlapping = false;
      if(distance < this.radius + otherCollider.radius) {
        // console.log("Collision at distance: " + distance, thisCenter, otherCenter);
        isOverlapping = true;
      }
      if(isOverlapping && !this.currentCollisions.includes(otherCollider.instanceId)) {
        // console.log("collision enter");
        // console.log("Collided with tags: ", collidedTags);
        this.currentCollisions.push(otherCollider.instanceId);
        return CollisionStatus.ENTER;
      } else if(isOverlapping) {
        return CollisionStatus.COLLIDING;
      }
      if(!isOverlapping && this.currentCollisions.includes(otherCollider.instanceId)) {
        // console.log("collision leave\n\n\n");
        this.currentCollisions.splice(this.currentCollisions.indexOf(otherCollider.instanceId), 1);
        return CollisionStatus.EXIT;
      }
      return CollisionStatus.NONE;
    } else if(this.type === ColliderTypes.RECTANGLE && otherCollider.type === ColliderTypes.RECTANGLE) {
      // two square colliders
      
    } else if(this.type === ColliderTypes.RADIUS) {
      // one of each: this is radius, other is rectangle
    } else if(this.type === ColliderTypes.RECTANGLE) {
      // one of each: this is rectangle, other is radius
    } else {
      console.error("Unknown collider type: " + this.type + " - " + otherCollider.type);
    }
    return false;
  }

  getAbsoluteRect() {
    return {
      left: this.rect.left + this.ownerGO.position.x,
      right: this.rect.right + this.ownerGO.position.x,
      top: this.rect.top + this.ownerGO.position.y,
      bottom: this.rect.bottom + this.ownerGO.position.y,
    }
  }

  getColliderPoint(pointType) {
    const absRect = this.getAbsoluteRect();
    switch(pointType) {
      case PointEnum.CENTER:
        return {
          x: absRect.left + ( (absRect.right - absRect.left) / 2 ),
          y: absRect.top + ( (absRect.bottom - absRect.top) / 2 ),
        }
      case PointEnum.TOPLEFT:
        return { x: absRect.left, y: absRect.top }
      case PointEnum.TOPRIGHT:
        return { x: absRect.right, y: absRect.top }
      case PointEnum.BOTTOMLEFT:
        return { x: absRect.left, y: absRect.bottom }
      case PointEnum.BOTTOMRIGHT:
        return { x: absRect.right, y: absRect.bottom }
      default:
        return undefined;
    }
  }

  // TODO: this probably belongs in some central place ("engine?") so the app can access it to.
  getDistanceBetween(pointA, pointB) {
    const aSquared = Math.pow(pointA.x - pointB.x, 2);
    const bSquared = Math.pow(pointA.y - pointB.y, 2);
    return Math.sqrt(aSquared + bSquared);
  }
}

const PointEnum = {
  CENTER: 'CENTER',
  TOPLEFT: 'TOPLEFT',
  TOPRIGHT: 'TOPRIGHT',
  BOTTOMLEFT: 'BOTTOMLEFT',
  BOTTOMRIGHT: 'BOTTOMRIGHT'
}

export const CollisionStatus = {
  ENTER: 'ENTER',
  COLLIDING: 'COLLIDING',
  EXIT: 'EXIT',
  NONE: 'NONE',
}

export default Collider;
