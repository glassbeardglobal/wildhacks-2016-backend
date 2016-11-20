var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.emit('push to mobile');

socket.on('authenticated', function(msg) {
  console.log(msg);
  $('#messages').append($('<li>').text("Authenticated"));
});

socket.on('push to web', function() {
  window.location.href = '/demo';
});

console.log(Cookies.get('userid'));
