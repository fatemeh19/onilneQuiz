const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const questionSchema = new Schema({
    id:Number,
    examId:Number,
    type:String,
    numberOfQues:Number,
    ques:{
      quesPic:{
        url:String,
        name:String
      },
      quesText:String,
      options:[String]
    },
    answer:{
      answPic:{
        url:String,
        name:String
      },
      answText:String,
      options:[String]

    },
    ResponseTime:Date,
    Score: String,
    desc:String

  });

const questionModel = mongoose.model('questions', questionSchema)
module.exports.questionModel = questionModel

