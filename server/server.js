const path =require('path');
const http=require('http');
const pathP=path.join(__dirname,'../public');
const express=require('express');
const socketIO=require('socket.io');

var port=process.env.PORT || 3000

var app =express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(pathP));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.emit('newMessage',{
        from: "Admin",
        text:"welcome to the chat app",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from :"Admin",
        text: "New user",
        createdAt: new Date().getTime()
    })
  
    socket.on('createMessage',(newmessage)=>{
        console.log('emailnew',newmessage);
        io.emit('newMessage',{
            from: newmessage.from,
            text: newmessage.text,
            createdAt: new Date().getTime()
        })
    });
    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    })
});


server.listen(port,()=>{
    console.log(`server is running on ${port}`)
})