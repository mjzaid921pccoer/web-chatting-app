// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
username = document.getElementById('username'),
      send = document.getElementById('send'),
      conversation = document.getElementById('conversation'),
      feedback = document.getElementById('feedback');

// Emit events
send.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        username: username.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', username.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    conversation.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
