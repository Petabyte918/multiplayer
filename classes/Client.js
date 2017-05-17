
function Client(token, socket, authenticated = false) {
  this.socket = socket;
  this.token = token;
  this.authenticated = authenticated;
  this.ipAddress = this.socket.upgradeReq.headers['x-forwarded-for'] 
                    || this.socket.upgradeReq.connection.remoteAddress;
  
}

module.exports = Client;