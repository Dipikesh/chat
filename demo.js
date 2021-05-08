var app = require('express')();

    // app = express(),
   var http = require('http').createServer(app)
    var server, io;
socketIO = require('socket.io');

     const port = process.env.port;
app.get('/', function (req, res) {
res.sendfile(__dirname + '/index.html');
});
http.listen(port,function(){
  console.log('listening on' + port);
})
 

// // '
// app.listen(port,() =>{
//   console.log(`server is running on ${port}`);
// })
// });

// server = http.Server(app);
// const port = process.env.port || 5000;
// server.listen(port);

// io = socketIO(server);

// io.on('connection', function (socket) {
//   socket.emit('greeting-from-server', {
//       greeting: 'Hello Client'
//   });
//   socket.on('greeting-from-client', function (message) {
//     console.log(message);
//   });
// });