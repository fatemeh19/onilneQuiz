const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const userSchema = new Schema({
    id:Number,
    uniId:String, // String is shorthand for {type: String}
    fullName: String,
    password:   String,
    username: String,
    email:   String,
    token : String,
    lastLoginAt:Date,
    role: String,
    resetPassCode:Number
  });

const userModel = mongoose.model('users', userSchema)
module.exports.userModel = userModel

