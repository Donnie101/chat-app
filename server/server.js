const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//CONNECT
io.on('connection',(socket)=>{
  console.log('new user connected');

//JOIN ROOM
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    socket.emit('newMessage',generateMessage('Admin','Welocme to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joind`));
    io.to(params.room).emit('updateUsersList',users.getUserList(params.room));

    callback();

  });

//CREATE MESSAGE
  socket.on('createMessage',function(message,callback){
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });

//CREATE LOCATION MESSAGE
  socket.on('createLocationMessage',(coords)=>{
     io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

//DISCONNECT
  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }

  });
});


server.listen(port,()=>{
  console.log('Listen on port ',port);
});
