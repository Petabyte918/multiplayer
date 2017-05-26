import { guid } from '../Helpers/guid'

export default class GameObject {
  constructor() { // (paramObject = {}) {
    this.position = {
      x: 0,
      y: 0
    }
    this.instanceId = guid();
  }

  setPosition(position = { x: 0, y: 0 }) {
    this.position.x = position.x;
    this.position.y = position.y;
  }
}
