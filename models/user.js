const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const userSchema = new Schema({
    id:Number,
    uniId:String, // String is shorthand for {type: String}
    fullName: String,
    password:   String,
    username: String,
    email:   String,
    emailVerify:Boolean,
    token : String,
    lastLoginAt:Date,
    role: String,
    resetPassCode:Number,
    deleted:{ type: Boolean, default: false },
    profilePic:{
      url: String,
      name: String
    }
    
  });

const userModel = mongoose.model('users', userSchema)
module.exports.userModel = userModel

