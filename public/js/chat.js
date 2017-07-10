var socket = io();

function scrollToBottom(){
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight);
  };

};

//LITENS TO CONNECTION
socket.on('connect',function(){
  console.log('connected to server');
  var params = $.deparam(window.location.search);

  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href = "/";
    }else{
      console.log('No error');
    }
  });
});

//LISTENS TO DISCONNECTION
socket.on('disconnect',function(){
  console.log('disconnected from server');
});



//LISTENS TO NEW MESSAGE
socket.on('newMessage',function(message){
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    text:message.text,
    createdAt:message.createdAt,
  });
  $('#messages').append(html);
  scrollToBottom();
});

//LISTENS TO NEW MESSAGE LOCATION
socket.on('newLocationMessage',function(message){
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    createdAt:message.createdAt,
    url:message.url
  });
  $('#messages').append(html);
  scrollToBottom();
});

var messageText = $('[name=message]');

$('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    text:messageText.val()
  },function(data){
    messageText.val('');
  });
});

//LISTENS FOR USERS LIST
socket.on('updateUsersList',function(users){
  var ol = $('<ol></ol>');

  users.forEach(function(user){
    ol.append($('<li></li>').text(user))
  });

  $('#users').html(ol);

});

//SENDS LOCATION COORDS
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
