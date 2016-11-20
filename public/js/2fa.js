var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('authenticated', function(msg){
  $('#messages').append($('<li>').text("Authenticated"));
});
