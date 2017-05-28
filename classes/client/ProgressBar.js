
import Sprite from '../shared/Sprite';

export default class ProgressBar extends Sprite {
  constructor(params = {}) { // x, y, width, height, current, max, fgColor, bgColor, parentSprite) {
    super();
    this.stats = { current: params.current, max: params.max }
    this.bgColor = params.bgColor || "#FFFFFF";
    this.fgColor = params.fgColor || "#FF0000";
    this.parentGO = params.parentGO || { position: { x: 0, y: 0 }};
    this.setBounds(params.x || -1, params.y || -1, params.width || -1, params.height || -1);
    this.setRelativePosition({ x: params.x || 0, y: params.y || 0 });
  }

  setBounds(x, y, width, height) {
    this.bounds = this.bounds || {};
    this.bounds.x = x || this.bounds.x;
    this.bounds.y = y || this.bounds.y;
    this.bounds.width = width || this.bounds.width, 
    this.bounds.height = height || this.bounds.height, 
    this.bounds.left = this.bounds.x;
    this.bounds.right = x && width ? x + width : this.bounds.x + this.bounds.width;
    this.bounds.top = this.bounds.y;
    this.bounds.bottom = y && height ? y + height : this.bounds.y + this.bounds.height;

    this.setPosition(this.bounds);
  }

  draw(ctx) {
    // Draw background
    let x = this.position.x;
    let y = this.position.y;
    let width = this.bounds.width;
    let height = this.bounds.height;
    ctx.fillStyle=this.bgColor;
    ctx.fillRect(x, y, width, height);

    // Draw foreground
    width = this.bounds.width * (this.stats.current / this.stats.max);
    ctx.fillStyle=this.fgColor;
    ctx.fillRect(x, y, width, height);
  }
  update(delta) {
    console.log("updating progressbar for: ", this.parentId);
  }
}