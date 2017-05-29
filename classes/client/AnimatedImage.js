
export default class AnimatedImage {
  /**
   * An animation wrapper for animated sprite images.
   * @param {Object} params 
   * @param {Image} params.spriteSheetImage
   * @param {Number} params.fps
   * @param {Number} params.frameWidth
   * @param {Number} params.frameHeight
   */
  constructor(params) {
    // TODO: ensure required params are provided.
    this.spriteSheetImage = params.spriteSheetImage;
    this.fps = params.fps;
    this.frameWidth = params.frameWidth;
    this.frameHeight = params.frameHeight;
    this._createdAt = +Date.now();

    this.frames = this.spriteSheetImage.width / this.frameWidth;

    this.imageElement = new Image(this.frameWidth, this.frameHeight);
    this.imageElement.src = this.spriteSheetImage;
    this.imageElement.style.overflow = "hidden";
    this.imageElement.style.left = 0;

    const clearHandle = setInterval(function() {
      // const dims = this.getCurrentFrameDimensions();
      this.imageElement.style.left = -this.frameWidth * this.frames;
    }, 1000 / this.fps);

  }

  get image() { return this.imageElement; }

  getCurrentFrameNumber() {
    const framesElapsed = ((+Date.now() - this._createdAt) / 1000  / this.fps);
    console.log("Frames elapsed: " + framesElapsed);
    return framesElapsed % this.fps;
  }

  getCurrentFrameDimensions() {
    return {
      x: this.getCurrentFrameNumber() * this.frameWidth,
      y: 0,
      w: this.frameWidth,
      h: this.frameHeight
    };
  }

}