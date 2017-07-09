const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.on('disconnect',()=>{
    console.log('user disconnected');
  });

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.emit('newMessage',generateMessage('Admin','Welocme to the chat app'));


  socket.on('createMessage',function(message){
    io.emit('newMessage',generateMessage(message.from,message.text));
  });
});


server.listen(port,()=>{
  console.log('Listen on port ',port);
});
