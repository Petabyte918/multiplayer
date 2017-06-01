
import { CastTypes } from '../../CastTypes';

/**
 * Base class for abilities
 * @constructor
 * @abstract
 */
export default class Ability {
  /**
   * Ability class is the base class for all abilities.
   * @param {Object} params - Parameters for creating this ability class.
   * @param {string} params.name - Name of ability.
   * @param {string} params.playerInstanceId - Instance ID of the player who this ability is assigned to.
   */
  constructor(params = {}) {
    this.name='Generic ability';
     // No cooldown instant cast by default
    this.abilityType = CastTypes.INSTANT;
    this.cooldown = 0;
    this.cooldownStart = null;
    // this.cooldownGroup = ......... should this be programmed here or described in database.
  }

  /**
   * @abstract
   * @param {Object} params - Details for casting whatever spell is being cast. Likely no more than the character that did the casting.
   */
  use(params) {
    throw new Error("Must override.");
  }

  /**
   * @virtual
   */
  triggerCooldown() {
    this.cooldownStart = +Date.now();
  }

  /**
   * @virtual
   */
  isOnCooldown() {
    return +Date.now() < this.cooldownStart + this.cooldown;
  }
}