
import Character from '../shared/Character';

import { broadcastPackage } from '../Helpers/messaging';
import MessageTypes from '../MessageTypes';
import { SpriteTypes } from '../SpriteTypes';

import Abilities from './Abilities';

import World from '../GameEngine';

export default class CharacterController {
  constructor(character) {
    this.character = character;
    this.isPlayer = true; // TODO: Figure out whether I should use this at all. Also how should I set it and should it be false by default.
    this.populateControllerAbilities.bind(this)();
  }
  applyDamage(character, damageInfo) {
    character.tookDamage(damageInfo.damage, damageInfo.source);
  }
  useAbility(abilityName, params) {
    // console.log("ability being used.", abilityName, this.abilities[abilityName]);
    if(this.canUseAbility(abilityName)) {
      // console.log("ability used");
      this.abilities[abilityName].use(this.character, params);
    }
  }
  canUseAbility(abilityName) {
    // TODO: Check cooldown, etc.
    return this.abilities[abilityName] && true;
  }
  populateControllerAbilities() {
    // this.abilities = this.character.abilities.map(abilityName => new Abilities[abilityName]());
    this.abilities = this.character.abilities.reduce(function(keyValAbilities, abilityName) {
      keyValAbilities[abilityName] = new Abilities[abilityName](); //a, b, c
      return keyValAbilities;
    }, {});
  }
}