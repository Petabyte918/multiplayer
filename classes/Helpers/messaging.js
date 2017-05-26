
import WebSocket from 'ws';

import MessageTypes from '../MessageTypes';
export { MessageTypes };

import World from '../GameEngine';

export const sendPackage = function sendPackage(socket, type = null, attributes = {}) {
  if (socket === null) throw new Error('Socket must be specified.'); // TODO: instanceof what?
  if (type === null) throw new Error('Package type must be specified.');

  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify(Object.assign({ type }, attributes)));
};

export const broadcastPackage = function broadcastPackage(type = null, attributes = {}, clientIdList = null) {
  clientIdList = clientIdList || Object.keys(World.clients);
  // TODO: only affect clients that are in range and can see (but for now everybody)
  clientIdList.forEach(clientKey => {
    // console.log("broadcasting package to: " + clientKey, type, attributes);
    const c = World.clients[clientKey];
    if(c) sendPackage(c.socket, type, attributes);
  });
}