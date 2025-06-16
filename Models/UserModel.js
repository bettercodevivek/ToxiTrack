const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user','moderator'],
        default:'user'
    },
    refreshToken:{
        type:String,
        default:""
    }
},{timestamps:true});

UserSchema.pre('save', async function(){
    const user = this;
    const saltRounds = 10;

    if(!user.isModified('password')) next();

     try{
        
        const hashedPwd = await bcrypt.hash(user.password,saltRounds);
        
        user.password = hashedPwd;

        next();


      }
      catch(err){
        next(err);
      }
});


const User = mongoose.model('User',UserSchema);

module.exports = User;