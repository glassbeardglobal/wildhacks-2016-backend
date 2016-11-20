var su = require('./socket-util');

var User = require('../models/User');

var io = su.getIO();

io.on('connection', function(socket) {
  socket.on('clienttext', function(msg) {
    console.log(msg);
  });

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('authenticate', function(userid) {
    io.emit('authenticate');
  });

  socket.on('increment price', function() {
    io.emit('increment price');
  });

  socket.on('register mobile', function(userid) {
    User.findById(userid, function(err, doc) {
      if (!err && doc != undefined) {
        doc.socketMobile = socket.id;
        doc.save();
      }
    });
  });

  socket.on('push to mobile', function(userid) {
    io.emit('push to mobile');
  });

  socket.on('push to web', function() {
    io.emit('push to web');
  });
});
