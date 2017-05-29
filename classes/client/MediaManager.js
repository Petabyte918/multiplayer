
import AnimatedImage from './AnimatedImage';

const ImageLoader = new Map();

class MediaManager {
  loadImage(imageSource, loadComplete) {
    // var p = new Promise(function(res, rej) {
      let imgElement = ImageLoader.get(imageSource);
      if (!imgElement) {
        imgElement = new Image();
        imgElement.src = imageSource;
        // TODO: handle errors where images are not found.
        imgElement.addEventListener('load', (e) => { 
          console.log("Image loaded."); 
        });
        ImageLoader.set(imageSource, imgElement);
        // imgElement.addEventListener('load', (e) => { res(imgElement); });
        // imgElement.addEventListener('error', (e) => { rej(e); });
      }
        // res(imgElement);
        return imgElement;

    // });
    // if(typeof loadComplete === "function") {
    //   p.then((image) => loadComplete(undefined, image)).catch((err) => loadComplete(err, undefined));
    // } else {
    //   return p;
    // }
  }
  loadAnimatedImage(imageSource, params) {
    const animImgElement = new AnimatedImage({ spriteSheetImage: imageSource, fps: 60, frameWidth: 32, frameHeight: 32 }).image;
  }
}

export default new MediaManager();