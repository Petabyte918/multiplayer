
import Sprite from '../../classes/shared/Sprite';

export class ProgressBar extends Sprite {
  constructor(x, y, width, height, current, max, fgColor, bgColor, parentSprite) {
    super();
    this.setPosition({ x, y });
    this.bounds = { width, height }
    this.stats = { current, max }
    this.bgColor = bgColor || "#FFFFFF";
    this.fgColor = fgColor || "#FF0000";
    this.parent = parentSprite || { position: { x: 0, y: 0 }};
  }
  draw(ctx) {
    // Draw background
    let x = this.position.x + this.parentSprite.position.x;
    let y = this.position.y + this.parentSprite.position.x;
    let width = this.bounds.width;
    let height = this.bounds.height;
    ctx.fillStyle=this.bgColor;
    ctx.fillRect(x, y, width, height);

    // Draw foreground
    width = this.bounds.width * (this.stats.current / this.stats.max);
    ctx.fillStyle=this.fgColor;
    ctx.fillRect(x, y, width, height);
  }
}