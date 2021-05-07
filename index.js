var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io;

app.get('/', function (req, res) {
res.sendFile(__dirname + '/index.html');
});

server = http.Server(app);
server.listen(80);


io = socketIO(server);
// console("i am in")
const users = {};

io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        console.log("user :",name);
users[socket.id] = name;
socket.broadcast.emit('user-joined',name);
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message:message,name : users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    });

    socket.on('typing', (data)=>{
        if(data.typing==true)
           socket.broadcast.emit('display', data)
        else
           socket.broadcast.emit('display', data)
      })

     
      
})
