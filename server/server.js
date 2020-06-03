const path =require('path');
const http=require('http');
const pathP=path.join(__dirname,'../public');
const express=require('express');
const socketIO=require('socket.io');
const {genmessage,genLocationmessage}=require('./utils/message')
var port=process.env.PORT || 3000

var app =express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(pathP));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.emit('newMessage',genmessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',genmessage('Admin','new user joined'));
  
    socket.on('createMessage',(newmessage,callback)=>{
        console.log('new message',newmessage);
        io.emit('newMessage',genmessage(newmessage.from,newmessage.text));
        callback();
    });

    socket.on('createLocation',(coords)=>{
        io.emit('newLocationMessage',genLocationmessage('Admin',coords.latitude,coords.longitude));
    })
    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    })
});


server.listen(port,()=>{
    console.log(`server is running on ${port}`)
})