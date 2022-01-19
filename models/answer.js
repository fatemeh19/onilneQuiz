const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const answerSchema = new Schema({
    questionId:Number,
    ResponseTest:Number,
    ResponseDesc:String,
    grade:{ 
      type:Number,
      default:0
    }

  });

const answerModel = mongoose.model('answers', answerSchema)
module.exports.answerModel = answerModel
module.exports.answerSchema = answerSchema

