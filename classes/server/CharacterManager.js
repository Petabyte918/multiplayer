
import { broadcastPackage } from '../Helpers/messaging';
import MessageTypes from '../MessageTypes';
import { SpriteTypes } from '../SpriteTypes';

import World from '../GameEngine';

class CharacterManager {
  applyDamage(character, damageInfo) {
    // TODO: handle other damage types: bleeding, poison, arcane, fire, frost, etc.???
    character.tookDamage(damageInfo.damage, damageInfo.source);
    broadcastPackage(MessageTypes.TakeDamage, {
      target: character.instanceId,
      damage: damageInfo.damage,
      remainingHp: character.stats.hp,
      maxHp: character.stats.maxHp,
      source: damageInfo.source
    });
    if(character.health <= 0 && !character.isDead) {
      character.isDead = true;
      character.deactivate();
      broadcastPackage(MessageTypes.PlayerDeath, {
        target: character.instanceId,
        source: damageInfo.source
      });
      World.spawnSprite(character.levelId, SpriteTypes.BLOODSTAIN, { start: character.position });
      setTimeout(() => {
        this.respawnPlayer(character, { position: World.getRandomSpawnPoint(character.levelId) });
      }, 3000);
    }
  }

  respawnPlayer(character, params) {
    // console.log("Respawning character at: ", params.position);
    character.isDead = false;
    character.health = character.stats.maxHp;
    character.setPosition(params.position);
    character.activate();
    broadcastPackage(MessageTypes.PlayerRespawn, {
      target: character.instanceId,
      position: params.position
    });
  }
}

export default new CharacterManager();