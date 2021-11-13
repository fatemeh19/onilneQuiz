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
    role: String
  });

const userModel = mongoose.model('users', userSchema)
module.exports.userModel = userModel

