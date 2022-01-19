const mongoose = require('mongoose')
const { Schema } = mongoose;
const {answerSchema} = require('./answer')


  const examSheetSchema = new Schema({
    id:Number,  
    examId:Number,
    studentId:Number,
    start_time:String,
    quesOrder:[Number],
    answers:[answerSchema],
    currentQues:Number,
    remainingTime:String,
    status:String, //Finished or not Finished
    finalScore:Number

    
  });

const examSheetModel = mongoose.model('examSheets', examSheetSchema)
module.exports.examSheetModel = examSheetModel

