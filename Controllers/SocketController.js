const analyzeToxicity = require('../Utils/perspective');
const Message = require('../Models/MessageModel');

const socketHandler = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) return next(new Error('Auth token missing'));

    try {
      const decoded = require('jsonwebtoken').verify(token, process.env.ACCESS_SECRET_KEY);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`${socket.user.username} connected`);

    socket.on('sendMessage', async (msg) => {
      const score = await analyzeToxicity(msg);
      const isToxic = score > 0.75;

      await Message.create({
        userId: socket.user.userId,
        username: socket.user.username,
        message: msg,
        score,
        isToxic
      });

      if (isToxic) {
        socket.emit('toxicWarning', {
          message: msg,
          score
        });
      } else {
        io.emit('newMessage', {
          user: socket.user.username,
          message: msg,
          score
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`${socket.user.username} disconnected`);
    });
  });
};

module.exports = socketHandler;
