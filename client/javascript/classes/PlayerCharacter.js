
const PlayerCharacter = function PlayerCharacter(characterName = 'Bob', startX = 1, startY = 1) {
  this.name = characterName;
  this.level = 1;
  this.strength = 1;
  this.health = 50;
  this.color = '#3aadd1'; // TODO: Do we want to keep this property?
  this.tx = startX;
  this.ty = startY;

  this.setPosition = (position) => {
    this.tx = position.tx;
    this.ty = position.ty;
  };
};
