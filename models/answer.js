const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const answerSchema = new Schema({
    questionId:Number,
    Response:Number
    

  });

const answerModel = mongoose.model('answers', answerSchema)
module.exports.answerModel = answerModel

