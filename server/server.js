const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.emit('newMessage',{
    from:'Jack',
    text:'Take a deep breath',
    createdAt:new Date().getTime().toString()
  });

  socket.on('disconnect',()=>{
    console.log('user disconnected');
  });

  socket.on('createMessage',function(newMessage){
    console.log('create message: ',newMessage);
  });

});


server.listen(port,()=>{
  console.log('Listen on port ',port);
});
