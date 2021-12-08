const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const questionSchema = new Schema({
    id:Number,
    examId:String,
    number:Number,
    ResponseTime:Date,
    questionText:String,
    

    
    
  });

const questionModel = mongoose.model('questions', questionSchema)
module.exports.questionModel = questionModel

