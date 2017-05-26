
import { SpriteClassMap } from './SpriteTypes';
import { guid } from './Helpers/guid';

// Game elements
// import Client from './server/Client';
import LevelManager from './server/LevelManager';

export { sendPackage, broadcastPackage, MessageTypes } from './Helpers/messaging';

// Database elements???

const clients = {};
// const levels = {};

class GameEngine {

  // read only so that we cannot reassign from outside.
  get levels() { return LevelManager.levels; }
  get clients() { return clients; }

  constructor() {
    this.getLevel = LevelManager.getLevel.bind(LevelManager);
  }

  // So at this point, it's pretty clear that sprites are bound to their map. 
  spawnSprite(levelId, spriteTypeName, attributes) {
    const classType = SpriteClassMap.get(spriteTypeName);
    const spawn = new classType(attributes);
    LevelManager.addSprite(levelId, spawn);
    return spawn;
  }

  // Clients
  addClient(client) {
    if(!client.instanceId) client.instanceId = guid();
    clients[client.instanceId] = client;
  }
  addClientWithAttributes(attributes) {

  }
  removeClient(client) {
    delete clients[client.instanceId];
  }
  getClientByInstanceId(instanceId) {
    return clients[instanceId];
  }
  getClientByPlayerCharacter(character) {
    return clients.find(c => c.playerCharacter === character);
  }
  getPlayerByInstanceId(instanceId) {
    // Can pass either the client's instance Id or the character's instanceId
    return clients.find(c => c.instanceId === instanceId || (c.playerCharacter && c.playerCharacter.instanceId === instanceId));
  }

}

// Ensures singleton (I think)
const World = new GameEngine();

export default World;