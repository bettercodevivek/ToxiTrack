require('dotenv').config();

const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');

const AuthRouter = require('./Routes/AuthRoutes');

const PORT = process.env.PORT;

const ConnectDB = require('./Config/db');

ConnectDB();

app.use(express.json());

app.use(cookieParser());

app.use('/api/auth',AuthRouter);


app.listen(PORT,()=>{
    console.log('Server started successfully !')
});