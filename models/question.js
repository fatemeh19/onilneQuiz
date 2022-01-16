const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const questionSchema = new Schema({
    id:Number,
    examId:Number,
    ques:{
      face:String,
      quesPic:{
        url:String,
        name:String
      },
      options:String,
     
    },
    answer:{
      answPic:{
        url:String,
        name:String
      },
      options:String,
      desc:String

    },
    Score: Number,
  

  });

const questionModel = mongoose.model('questions', questionSchema)
module.exports.questionModel = questionModel

