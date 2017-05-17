
var PlayerCharacter = function(characterName = "Bob", startX = 1, startY = 1) {
  this.name = characterName;
  this.level = 1;
  this.strength = 1;
  this.health = 50;
  this.color = "#3aadd1"; // TODO: Do we want to keep this property?
  this.x = startX;
  this.y = startY;
}
