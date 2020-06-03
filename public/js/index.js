var socket=io();
socket.on('connect',function(){
    console.log('connected to server');
 
});

    socket.on('disconnect',function(){
    console.log('disconnected from server');
 });

 socket.on('newMessage',function(message){
     console.log("new message",message);
     var li=jQuery('<li></li>');
     li.text(`${message.from}: ${message.text}`);

     jQuery('#messages').append(li);
 });
socket.on('newLocationMessage',function(message){
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);

})
//  socket.emit('createMessage',{
//      from: 'frank',
//      text: 'hello babes'
//  },function(data){
//      console.log('got it ',data);
//  });

 jQuery('#message-form').on('submit',function(e){
     e.preventDefault();
     var messagetextbox=jQuery('[name=message]');
     socket.emit('createMessage',{
         from: jQuery('[name=name]').val(),
         text: messagetextbox.val()
     },function(){
         messagetextbox.val('')
     });
 });

 var locationbtn=jQuery('#location');
 locationbtn.on('click',function(){
     if(!navigator.geolocation)
     return alert('geolocation not supported by browser');

     locationbtn.attr('disabled','disabled').text("Sending location...");

     navigator.geolocation.getCurrentPosition(function(position){
         locationbtn.removeAttr('disabled').text("Send Location");
         socket.emit('createLocation',{
             latitude: position.coords.latitude,
             longitude: position.coords.longitude
         });
     },function(){
        locationbtn.removeAttr('disabled').text("Send Location");
         alert('Unable to fetch.')
     })
 })