
const FireBall = function FireBall(start = {}, aim = {}, velocity = 32) {
  // https://gist.github.com/conorbuck/2606166
  this.angle = Math.atan2(aim.y - start.y, aim.x - start.x); // if you want degrees, do this too!!! * 180 / Math.PI;

  this.x = start.x - 16;
  this.y = start.y - 16;
  this.velocity = velocity;

  this.livesUntil = performance.now() + (1.5 * 1000); // 3 seconds.

  this.setPosition = (position) => {
    this.x = position.x;
    this.y = position.y;
  };

  this.update = (delta) => {
    if (performance.now() > this.livesUntil) {
      this.delete();
    }
    // SOH, CAH, TOA
    const deltaY = Math.sin(this.angle) * this.velocity * delta;
    const deltaX = Math.cos(this.angle) * this.velocity * delta;
    this.x += deltaX;
    this.y += deltaY;
  };
};

module.exports = FireBall;