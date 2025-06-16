const express = require('express');

const AuthRouter = express.Router();

const {Signup,Login,Logout,RefreshToken} = require('../Controllers/AuthController');

const loginLimiter = require('../Middlewares/LoginLimiter');


AuthRouter.post('/signup',Signup);

AuthRouter.post('/login',loginLimiter,Login);

AuthRouter.get('/refresh',RefreshToken);

AuthRouter.post('/logout',Logout);

module.exports = AuthRouter;