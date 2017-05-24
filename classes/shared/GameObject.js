import { guid } from '../Helpers.js'

export default class GameObject {
  constructor() { // (paramObject = {}) {
    this.position = {
      x: 0,
      y: 0
    }
    this.instanceId = guid();
  }
}
