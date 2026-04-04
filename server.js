const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// DIT IS DE BELANGRIJKSTE REGEL
app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('increase-bar', (bar) => {
    console.log('Received increase-bar for:', bar);
    io.emit('increase-bar', bar);
  });

  socket.on('increase-all', () => {
    console.log('Received increase-all');
    io.emit('increase-all');
  });

  socket.on('fall-apples', () => {
    console.log('Received fall-apples');
    io.emit('fall-apples');
  });

  socket.on('move-left', () => {
    console.log('Received move-left');
    io.emit('move-left');
  });

  socket.on('move-right', () => {
    console.log('Received move-right');
    io.emit('move-right');
  });

  socket.on('start-move-left', () => {
    console.log('Received start-move-left');
    io.emit('start-move-left');
  });

  socket.on('stop-move-left', () => {
    console.log('Received stop-move-left');
    io.emit('stop-move-left');
  });

  socket.on('start-move-right', () => {
    console.log('Received start-move-right');
    io.emit('start-move-right');
  });

  socket.on('stop-move-right', () => {
    console.log('Received stop-move-right');
    io.emit('stop-move-right');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});