
import { angle2d } from '../Helpers/gx2D';

export default class Client {
  constructor(info) {
    this.socket = info.socket;
    this.token = info.token;
    this.authenticated = info.authenticated || false;
    this.ipAddress = this.socket.upgradeReq.headers['x-forwarded-for']
                      || this.socket.upgradeReq.connection.remoteAddress;
    this.playerCharacter = info.playerCharacter || null;
  }

  setMouseDown(params) {
    // console.log("setting playercharacter to moving.");
    // this.playerCharacter.moving = true;
    this.playerCharacter.setMoveTarget(params.x, params.y);
  }
  setMouseUp() {
    this.playerCharacter.moving = false;
  }
  setMousePosition(aim) {
    // console.error("setting position");
    const pc = this.playerCharacter;
    if(pc && !pc.hasMoveTarget) {
      pc.aim = aim;
      pc.angle = angle2d(pc.position.x, pc.position.y, aim.x, aim.y) + Math.PI / 2;
      // console.log('angle: ', pc.angle);
    } 
  }
}
