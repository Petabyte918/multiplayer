
import SpriteImage from './SpriteImage';

const ImageLoader = new Map();

class MediaManager {

  loadImage(imageSource) {

    let imgElement = ImageLoader.get(imageSource);
    if (!imgElement) {
      
      imgElement = new Image();
      imgElement.src = imageSource;
      
      imgElement.addEventListener('load', (e) => {
        console.log("Image loaded."); 
      });
      ImageLoader.set(imageSource, imgElement);
    }

    return imgElement;

  }
}

export default new MediaManager();