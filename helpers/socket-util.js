var io;
var socket;

function initSocket(inio) {
  io = inio;
  io.on('connection', function(s) {
    socket = s;
  });
}

function getIO() {
  return io;
}

function getSocket() {
  return socket;
}

function emitEvent(eventName, argsArr) {
  var inp = [eventName] + argsArr;
  io.emit.apply(inp);
}

module.exports = {
  initSocket: initSocket,
  getSocket: getSocket,
  getIO: getIO
};
