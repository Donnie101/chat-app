var socket = io();

socket.on('connect',function(){
  console.log('connected to server');

});
socket.on('disconnect',function(){
  console.log('disconnected from server');
});

socket.on('newMessage',function(message){
  var li = $('<li></li>');
  li.text(`${message.from} ${message.createdAt}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from} ${message.createdAt}: `);
  a.attr('href',message.url);
  li.append(a);
  $('#messages').append(li);
});

var messageText = $('[name=message]');

$('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text:messageText.val()
  },function(data){
    messageText.val('');
  });
});

var locationButton = $('#send-location');

locationButton.on('click',function(e){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(positon){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude : positon.coords.latitude,
      longitude: positon.coords.longitude
    });
  },function(err){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });

});
