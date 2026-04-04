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
    socket.broadcast.emit('increase-bar', bar);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});