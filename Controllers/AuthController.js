const User = require('../Models/UserModel');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');



// User Signup Handler function

const Signup = async(req,res) => {
    try{
      const {username,email,password} = req.body;

      if(!username || !email || !password){
        return res.status(401).json({error:"All credentials need to be filled !"})
      }

     const userExists = await User.findOne({email});

     if(userExists){
        return res.status(401).json({error:"This user already exists !"})
     }

     const newUser = new User({username,email,password,role:"admin"});

     await newUser.save();

     res.status(201).json({
        message:"New User created successfully !",
        user:{
            username:newUser.username,
            email:newUser.email,
            role:newUser.role
        }
     });

    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}


const Login = async(req,res) => {
    try{
      const {email,password} = req.body;

      if(!email || !password){
        return res.status(401).json({error:"All credentials need to be filled"});
      }

      const isExisting = await User.findOne({email});

      if(!isExisting){
        return res.status(404).json({error:"User not found ! Please signup"})
      }

      const isMatch = await bcrypt.compare(password,isExisting.password);

      if(!isMatch){
        return res.status(401).json({error:"Invalid password ! Please enter the password again !"});
      }

      const payLoad = {
        username:isExisting.username,
        email:isExisting.email,
        role:isExisting.role,
        userId:isExisting._id
      }

      const accessToken = jwt.sign(payLoad,process.env.ACCESS_SECRET_KEY,{expiresIn:"2m"});

      const refreshToken = jwt.sign(payLoad,process.env.REFRESH_SECRET_KEY,{expiresIn:"7d"});

      res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:7*24*60*1000
      });

      res.status(200).json({
        message:"Login attempt successful !",
        token:accessToken
      });
    } 
    catch(err){
         res.status(500).json({error:"Internal Server Error !"})
    }
}

const RefreshToken = async(req,res) => {
    try{

      const refreshToken = req.cookies;

      if(!refreshToken){
        return res.status(401).json({error:"Refresh Token not found !"})
      }

      const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET_KEY);

      const payLoad = {
        username:decoded.username,
        email:decoded.email,
        role:decoded.role,
        userId:decoded.userId
      }

      const accessToken = jwt.sign(payLoad,process.env.ACCESS_SECRET_KEY,{expiresIn:'2m'});

      res.status(200).json({
        message:"Token Verification Successful !",
        token:accessToken
      })

    }
    catch(err){
       res.status(500).json({error:"Internal Server Error !"})
    }
}