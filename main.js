const socket = io();

const form = document.querySelector('#messForm');
const name = document.querySelector('#name');
const textarea = document.querySelector('#textarea');
const all_message = document.querySelector('#all_mess');


var socket = io.connect();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('SendMess', {
        message: textarea.val(), 
        name: name.val()
    });
    textarea.val('');
});               

socket.on('AddMess', function(data) {
    all_message.append("<div><b>" + data.name + "</b>: " + data.message + "</div>");
});
    


