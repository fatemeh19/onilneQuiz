const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const examSchema = new Schema({
    numfQuestion:Number,
    id:Number,
    profId:Number,
    courseId:Number,
    title:String,
    Archive:Boolean,//0 not archive, 1 archive
    testordesc:Boolean, //0 test , 1 desc
    questionType:Boolean, //0 with prof , 1 pdf
    mines:Boolean, //0 no,1 yes
    review:Boolean,
    start_date:String,
    start_time:String,
    end_date:String,
    end_time:String,

    //
    currentDateAndTime:Boolean,
    floating:Boolean,
    QtoQTimeForAnyQ:Boolean,
    QtoQFullTime:Boolean,
    //
    numOfEnter:Number,
    stopTimer:Boolean, // 0 no stop,1 stop
    duration:Number,
    questionTime:Number,
    timeForAnyQuestion:Boolean,
    arrange_Q:Boolean,
    backtoQuestion:Boolean,
    quizTime:Number,
    pdf:{
      url:String,
      name:String
    }

  });

const examModel = mongoose.model('exams', examSchema)
module.exports.examModel = examModel

