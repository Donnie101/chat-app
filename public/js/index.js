var socket = io();

socket.on('connect',function(){
  console.log('connected to server');

});
socket.on('disconnect',function(){
  console.log('disconnected from server');
});

socket.on('newMessage',function(message){
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text:$('[name=message]').val()
  },function(data){
    console.log(data);
  });
});

var locatonButton = $('#send-location');

locatonButton.on('click',function(e){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition(function(positon){
    socket.emit('createLocationMessage',{
      latitude : positon.coords.latitude,
      longitude: positon.coords.longitude
    });
  },function(err){
    alert('Unable to fetch location');
  });

});
