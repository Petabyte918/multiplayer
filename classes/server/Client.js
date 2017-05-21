
function Client(info) {
  this.socket = info.socket;
  this.token = info.token;
  this.authenticated = info.authenticated || false;
  this.ipAddress = this.socket.upgradeReq.headers['x-forwarded-for']
                    || this.socket.upgradeReq.connection.remoteAddress;
  this.playerCharacter = info.playerCharacter || null;
}

module.exports = Client;
