require('dotenv').config();
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PID = process.pid;
const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// app.use(express.static(__dirname + '/static'));

users = [];
connections = [];

io.sockets.on('connection', (socket) => {
    console.log('Connect is success');
    //Add user from array
    connections.push(socket);

    //Deleted user from array
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnect is success');
    });

    socket.on('SendMess', (data) => {
        io.sockets.emit('AddMess', {
            message: data.message,
            name: data.name,
            className: data.className
        });
    });

    

});



const start = (req, res) => {
    try {
        server.listen(PORT, () => {
            console.log(`Woker started on PORT ${PORT}, PID ${PID}`);
        });
    } catch (error) {
        console.log(error);
    }
}


start();