//packages used
const path=require('path');
const express = require('express');
const socket = require('socket.io');

const publicPath=path.join(__dirname,"/public");
console.log(publicPath);
// App setup
var app = express();
const PORT=process.env.PORT || 4000;
var server = app.listen(PORT, function(){
    console.log('server setup done PORT:',PORT);
});

// Static files
app.use(express.static(publicPath));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {
    console.log('Connected Client : ', socket.id);
    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });
    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
