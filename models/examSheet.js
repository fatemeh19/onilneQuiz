const mongoose = require('mongoose')
const { Schema } = mongoose;
const {answerModel} = require('./answer')


  const examSheetSchema = new Schema({
    id:Number,  
    examId:Number,
    studentId:Number,
    start_time:String,
    quesOrder:[Number],
    answers:[answerModel],
    currentQues:Number,
    remainingTime:String

    
  });

const examSheetModel = mongoose.model('examSheets', examSheetSchema)
module.exports.examSheetModel = examSheetModel

