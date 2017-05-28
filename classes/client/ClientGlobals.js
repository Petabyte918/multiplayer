
let sprites = [];

class ClientGlobals {

  get sprites() { return sprites; }
  set sprites(value) { sprites = value; } 

  getSpriteById(instanceId) {
    return sprites.find(s => s.instanceId === instanceId);
  }
  addSprite(sprite) {
    return sprites.push(sprite);
  }
  removeSprite(sprite) {
    return sprites.splice(sprites.indexOf(sprite), 1);
  }
}

export default new ClientGlobals();