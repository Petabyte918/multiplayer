
import GameObject from '../shared/GameObject';

const defaults = {
  fillStyle: "red",
  font: "14px Arial",
  lifeTime: 5 * 1000,
  position: { x: 0, y: 0 },
  text: "Hello World",
};

export default class CombatText extends GameObject {
  constructor(params, deleteCallback) {
    if(!deleteCallback) throw new Error("Please provide a callback for combat text deleteCallback.");
    super();
    
    this.deleteCallback = deleteCallback || (() => { throw new Error("Please provide a callback for combat text deleteCallback."); });
    
    this.fillStyle = params.fillStyle || defaults.fillStyle;
    this.setFont(params.font || defaults.font);
    this.setPosition(params.position || defaults.position);
    this.text = params.text || defaults.text;
    this.lifeTime = params.lifeTime || defaults.lifeTime;
    this.livesUntil = +Date.now() + this.lifeTime;

    console.log("TTL: " + (params.lifeTime || defaults.lifeTime));
    this.cancelTimeout = setTimeout(() => {
      this.delete();
    }, params.lifeTime || defaults.lifeTime);

    console.log("Created combat text: ", this);
  }

  draw(ctx) {
    ctx.globalAlpha = (this.livesUntil - Date.now()) / this.lifeTime;
    ctx.font = this.font;
    ctx.fillStyle = this.fillStyle;
    ctx.fillText(this.text, this.position.x, this.position.y);
    ctx.globalAlpha = 1;
  }

  setFont(font) {
    this.font = font || defaults.font;
  }

  update(delta) {
    this.position.y -= 48 * delta / 1000;
  }

  delete() {
    this.deleteCallback();
  }

}