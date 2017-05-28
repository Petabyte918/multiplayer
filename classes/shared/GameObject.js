import { guid } from '../Helpers/guid'

export default class GameObject {
  constructor() { // (paramObject = {}) {
    this.position = { x: 0, y: 0 }
    this._relativePosition = { x: 0, y: 0 }
    this.instanceId = guid();
    this.active = true;
    this.levelId = undefined;
    this.children = [];
  }

  // Relative to current level map
  setPosition(position = { x: 0, y: 0 }) {
    // TODO: Integrate legal level position checks.
    this.position.x = position.x;
    this.position.y = position.y;
  }

  // Relative to parent object
  setRelativePosition(position = { x: 0, y: 0 }) {
    this._relativePosition = position;
    if(!this.parentGO) throw new Error("This GameObject does not have a parent GameObject.");
    else console.log(position, this.parentGO);
    const parentX = this.parentGO && this.parentGO.position ? this.parentGO.position.x : 0;
    const parentY = this.parentGO && this.parentGO.position ? this.parentGO.position.y : 0;
    this.setPosition({
      x: parentX + position.x,
      y: parentY + position.y,
    });
    console.log("set progressbar position?", this.position);
  }

  deactivate() {
    this.active = false;
  }

  activate() {
    this.active = true;
  }

  isActive() {
    return this.active;
  }

  update(delta) {
    if(this.isActive()) {
      if(this.children) {
        this.children.forEach(child => {
          if(child.update) {
            child.update(delta);
          }
        });
      } 
    }
  }
}
