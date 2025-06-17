require('dotenv').config();

const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');

const AuthRouter = require('./Routes/AuthRoutes');

const PORT = process.env.PORT;

const http = require('http');

const {Server} = require('socket.io');

const socketHandler = require('./Controllers/SocketController');

const ConnectDB = require('./Config/db');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

ConnectDB();

app.use(express.json());

app.use(cookieParser());

app.use('/api/auth',AuthRouter);

socketHandler(io);

app.listen(PORT,()=>{
    console.log('Server started successfully !')
});