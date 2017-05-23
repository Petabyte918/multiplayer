import { guid } from '../Helpers.js'

class GameObject {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }
    this.instanceId = guid();
  }
}

export default GameObject;