const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const uniSchema = new Schema({
    id:Number,
    name: String,
    address:   String,
  });

const uniModel = mongoose.model('universities', uniSchema)

module.exports.uniModel = uniModel
