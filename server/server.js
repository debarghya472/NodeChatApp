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
    // socket.emit('newEmail',{
    //     from: "deb@gmail.com",
    //     text:"hey",
    //     createAt: 123
    // });
    socket.emit('newMessage',{
        from: "rhytam",
        text:"hey babes",
        createdAt: 123
    });
    socket.on('createMessage',(newmessage)=>{
        console.log('emailnew',newmessage);
    });
    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    })
});


server.listen(port,()=>{
    console.log(`server is running on ${port}`)
})