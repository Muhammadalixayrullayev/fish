const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // public papkasi orqali HTML, JS fayllarini yuborish

io.on('connection', (socket) => {
  console.log('A user connected');

  // Foydalanuvchi video oqimini yuborishi
  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer); // Boshqa foydalanuvchiga video oqimini yuborish
  });

  // Boshqa foydalanuvchidan javobni olish
  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer); // Boshqa foydalanuvchiga javob yuborish
  });

  // ICE nomzodlarini yuborish
  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate); // ICE nomzodlarini boshqa foydalanuvchiga yuborish
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
