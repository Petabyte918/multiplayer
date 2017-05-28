
import { GameSettings } from './GameSettings';
import { SpriteClassMap } from './SpriteClassMap';
import { guid } from './Helpers/guid';

// Game elements
// import Client from './server/Client';
import LevelManager from './server/LevelManager';
import CharacterManager from './server/CharacterManager';
// TODO: import CreatureManager from './server/CreatureManager';

export { sendPackage, broadcastPackage, MessageTypes } from './Helpers/messaging';

// Database elements???

const clients = {};
// const levels = {};

class GameEngine {

  // read only so that we cannot reassign from outside.
  get levels() { return LevelManager.levels; }
  get clients() { return clients; }
  get CharacterManager() { return CharacterManager; }

  constructor() {
    this.getLevel = LevelManager.getLevel.bind(LevelManager);
    this.getLevelBySprite = LevelManager.getLevelBySprite.bind(LevelManager);
  }

  // So at this point, it's pretty clear that sprites are bound to their map. 
  spawnSprite(levelId, spriteTypeName, attributes) {
    // console.log("Spawning sprite");
    const classType = SpriteClassMap.get(spriteTypeName);
    const spawn = new classType(attributes);
    LevelManager.addSprite(levelId, spawn);
    return spawn;
  }

  despawnSprite(sprite) {
    LevelManager.removeSprite(this.getLevelBySprite(sprite).id, sprite);
  }
  despawnSpriteByLevel(levelId, sprite) {
    LevelManager.removeSprite(levelId, sprite);
  }

  // Clients
  addClient(client) {
    
    if(!client.instanceId) client.instanceId = guid();
    clients[client.instanceId] = client;
  }
  addClientWithAttributes(attributes) {
    // TODO: Is there a use for this?
    throw new Error("Not implemented");
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

  getRandomSpawnPoint(levelId) {
    const level = LevelManager.getLevel(levelId);
    // console.log("Getting random point for level: ", level);
    // console.log("Level width & scale settings: ", level.width, GameSettings.TILE_SCALE);
    const position = {
      x: (Math.random() * ((GameSettings.TILE_SCALE * level.width) - GameSettings.TILE_SCALE)) + GameSettings.TILE_SCALE,
      y: (Math.random() * ((GameSettings.TILE_SCALE * level.height) - GameSettings.TILE_SCALE)) + GameSettings.TILE_SCALE
    }
    return position;
  }

}

// Ensures singleton (I think)
const World = new GameEngine();

export default World;