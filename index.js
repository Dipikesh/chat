const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use("/static", express.static('./static/'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

var port = process.env.PORT || 8000;

server.listen(port);



// var express = require('express'),
//     app = express(),
//     http = require('http'),
//     socketIO = require('socket.io'),
//     server, io;

//     const PORT = 8080 ;
// app.get('/', function (req, res) {
// res.send('hello world');
// // __dirname + '/index.html'
// });

// server = http.createServer(app);
// server.listen(PORT);

// // app.listen(PORT,()=>{
// //     console.log(PORT)
// // })


// io = socketIO(server);
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
