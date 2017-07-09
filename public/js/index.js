var socket = io();

socket.on('connect',function(){
  console.log('connected to server');

});
socket.on('disconnect',function(){
  console.log('disconnected from server');
});



socket.on('newMessage',function(newMessage){
  console.log('You got a new message: ',newMessage);
});
