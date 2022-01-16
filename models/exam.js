const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const examSchema = new Schema({
    numfQuestion:Number,
    id:Number,
    profId:Number,
    courseId:Number,
    title:String,
    testordesc:Boolean, //0 test , 1 desc
    review:Boolean,
    start_date:String,
    start_time:String,
    end_date:String,
    end_time:String,

    numOfEnter:Number,
    arrange_Q:Boolean,
    backtoQuestion:Boolean,
    quizTime:Number,
   

  });

const examModel = mongoose.model('exams', examSchema)
module.exports.examModel = examModel

