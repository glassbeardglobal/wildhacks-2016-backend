$(document).ready(function() {
  var socket = io();

  socket.emit('push to mobile');

  socket.on('authenticated', function(msg) {
    console.log(msg);
    $('#messages').append($('<li>').text("Authenticated"));
  });

  socket.on('push to web', function() {
    window.location.href = '/demo';
  });

  console.log(Cookies.get('userid'));
});
