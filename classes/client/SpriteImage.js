
export default class SpriteImage {
  /**
   * Base Image class for multiplayer game
   * @param {Object} params 
   * @param {String} params.source
   * @param {Boolean} params.animated
   * @param {Number} params.frameWidth
   * @param {Number} params.frameHeight
   * @param {Number} params.frameRate - Frames per second.
   */
  constructor({ source, animated, frameWidth, frameHeight, frameRate, frames }) {
    this.imageElement = new Image(source);
    this.animated = animated || false;
    this.frameWidth = frameWidth || 32;
    this.frameHeight = frameHeight || 32;
    this.frameRate = frameRate || 30;
    this.frames = 0;

    this.imageElement.style.objectFit = 'none';
    this.imageElement.style.width = this.frameWidth + "px";
    this.imageElement.style.height = this.frameHeight + "px";
    
    if(this.animated) {
      this.createdAt = +Date.now();

      this.imageElement.addEventListener('load', () => {
        this.frames = this.imageElement.width / this.frameWidth;
      });
    }
  }

  getFrame() {
    if (this.animated) {
      const currentFrame = parseInt( (+Date.now() - this.createdAt)  / 1000 * this.frameRate ) % this.frames;
      this.imageElement.style.objectPosition = "-" + (this.frameWidth * currentFrame) + "px 0";
    }
    return this.imageElement;
  }
}