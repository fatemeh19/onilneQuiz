const joi = require('joi')
const {examModel} = require('../../models/exam')
const {questionModel} = require('../../models/question')
const {courseModel} = require('../../models/course')
const {examSheetModel} = require('../../models/examSheet')


// const response = require('../../middleware/responseHandler')
// const { Helper } = require("../../components/helper")
const persianDate = require('persian-date');



class ExamController {


    static async Create(req, res) {
        try {
            const schema = joi.object().keys({
                numfQuestion: joi.number().required(),
                courseId:joi.number().required(),
                title:joi.string().required(),
                testordesc:joi.boolean().required(), //0 test , 1 desc
                review:joi.boolean().required(),
                start_date:joi.string().required(),
                start_time:joi.string().required(),
                end_date:joi.string().required(),
                end_time:joi.string().required(),
                numOfEnter:joi.number(),
                arrange_Q:joi.boolean().required(),
                backtoQuestion:joi.boolean().required(),
                quizTime:joi.number(),
              
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                 return res.send({status:"error",message:"یکی از فیلد های ضروری را پر نکرده اید"})

            }
            let exams = await examModel.find({})
            if(exams.length==0){
                value.id = 1

            }else{
                value.id = exams[(exams.length)-1].id + 1

            }
          
            value.profId = req.user.id
            const newExam = new examModel(value)
            newExam.save(function (err) {
            if (err) console.log(err)
            else{
                return res.send({status:"success",message:"آزمون شما با موفقیت ساخته شد",data:newExam})


            }
            })
            // if(value.QtoQTimeForAnyQ && !(value.timeForAnyQuestion)){
            //     if((value.numfQuestion)*(value.questionTime)>quizTime){
            //         return res.send({status:"error",message:"لطفا زمان کل آزمون را متناسب با زمان تعیین شده برای هر سوال انتخاب کنید"})


            //     }else{
            //         const newExam = new examModel(value)
            //         newExam.save(function (err) {
            //         if (err) console.log(err)
            //         else{
            //             return res.send({status:"success",message:"آزمون شما با موفقیت ساخته شد"})


            //         }
            //         })
                    
            //     }
            // }
            // else if(value.floating){
            //     if(value.duration>value.quizTime){
            //         return res.send({status:"error",message:"مدت زمان پاسخگویی آزمون نباید بیشتر از زمانی باشد که برای کل ازمون قرار داده شده است"})


            //     }
            //     else{
            //         const newExam = new examModel(value)
            //         newExam.save(function (err) {
            //         if (err) console.log(err)
            //         else{
            //             return res.send({status:"success",message:"آزمون شما با موفقیت ساخته شد",data:newExam})


            //         }
            //         })

            //     }
                

            // }
            
            // let dateSplitStart = value.start_date.split("/")
            

            // let persiandateS=new persianDate([parseInt(dateSplitStart[0]), parseInt(dateSplitStart[1])-1,  parseInt(dateSplitStart[2])+1]).toCalendar('gregorian')
            // console.log(persiandateS)
            // const dateS = new Date(persiandateS.year() ,persiandateS.month(),persiandateS.date())
            // console.log(dateS)


            // let dateSplitEnd = value.end_date.split("/")
            

            // let persiandateS=new persianDate([parseInt(dateSplitStart[0]), parseInt(dateSplitStart[1])-1,  parseInt(dateSplitStart[2])+1]).toCalendar('gregorian')
            // console.log(persiandateS)
            // const dateS = new Date(persiandateS.year() ,persiandateS.month(),persiandateS.date())
            // console.log(dateS)
       
            // var updatedDayWrapper = new persianDate(updatedDay)
            // updatedDayWrapper.formatPersian = false
            // updatedDayWrapper.toArray()
            // let updatedat =updatedDayWrapper.toArray()
            
         

           
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }

    static async addQuestion(req, res) {
        try {
            const schema = joi.object().keys({
                face: joi.string(),
                desc:joi.string(),
                examId:joi.number().required(),
                quesoptions:joi.array().items(joi.string()),
                answoptions:joi.number(), 
                Score: joi.number().required(),
              
               
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                 return res.send({status:"error",message:"یکی از فیلد های ضروری را پر نکرده اید"})

            }
            console.log(value)
            let ques={}
            let answer={}
            examModel.findOne({
                id:value.examId
            },(error,exam)=>{
                if(!exam){
                    return res.send({status:"error",message:"آزمون مد نظر شما موجود نیست"})

                }else{
                    questionModel.find({
                        examId:exam.id
                    },async(error,questions)=>{
                        if((questions.length)+1>exam.numfQuestion){
                            return res.send({status:"error",message:"از حدی که تعیین کردید نمی توانید بیشتر سوال طرح کنید"})


                        }else{
                        
                            if(req.files.questionPic){
                               
                               let quesPic={
                                    url:process.cwd()+"/public/upload/"+req.files.questionPic[0].filename,
                                    name:req.files.questionPic[0].originalname
                                  }
                                  ques = {
                                    quesPic
                                  
                                }
                                //   ques.quesPic = quesPic
                                  value.ques = ques
                               

                            }
                            if(value.face){
                                let face =value.face
                                ques = {
                                    face
                                  
                                }

                            }
                           
                                
                               

                            
                            if(req.files.answerPic){
                                let answPic={
                                    url:process.cwd()+"/public/upload/"+req.files.answerPic[0].filename,
                                    name:req.files.answerPic[0].originalname
                                  }
                                  answer = {
                                    answPic
                                  
                                }
                                  answer.answPic = answPic
                               

                            }
                            if(value.quesoptions){
                                ques.options = value.quesoptions
                                answer.options = value.answoptions


                            }
                            if(value.desc){
                                let desc =value.desc
                                answer = {
                                    desc
                                  
                                }

                            }
                            value.ques = ques
                            value.answer = answer

                          




                            let questions = await questionModel.find({})
                            if(questions.length==0){
                                value.id = 1
                
                            }else{
                                value.id = questions[(questions.length)-1].id + 1
                
                            }

                            const newQuestion = new questionModel(value)
                                newQuestion.save(function (err) {
                                      if (err) console.log(err)

                                      else{
                                        return res.send({status:"success",message:"با موفقیت اضافه شد",data:newQuestion})

                                      }
                                    })
                        

                        }
                    })
                    
                   
                }
               

            

            })
            

            
            
            

           
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }

    static async List(req, res) {
        try {

            examModel.find({
                profId:req.user.id

            },(err,exams)=>{
                return res.send({status:"success",message:"با موفقیت انجام شد",data:exams})

                
            })
            
            
           
           
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }

    static async studentElist(req, res) {
        try {
            
            let list = []
            examModel.find({},(err,exams)=>{
                courseModel.find({
                    uniId:req.user.uniId
                },async (err,courses)=>{
                    for (let i = 0; i < exams.length; i++) {
                        for (let j = 0; j < courses.length; j++) {
                            if(exams[i].courseId==courses[j].id){
                                for (let k = 0; k < courses[j].studentIds.length; k++) {
                                    if(courses[j].studentIds[k]==req.user.id){
                                        list.push(exams[i])
                                
                                    } 
                                    
                                }
                               
                                
                            }
                           
                            
                        }
                        
                    }
                    return res.send({status:"success",message:"با موفقیت انجام شد",data:list})

                    


                })

              
             

                
            })
            
            
           
           
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }
    static async createNewExamSheet(req, res) {
        try {
            const schema = joi.object().keys({
                

                //id:Number,  
                examId:joi.number().required(),
                //studentId:Number,
                start_time: joi.string().required(),
                //quesOrder:[Number],
                //answers:[answerModel],
                //currentQues:Number,
                //remainingTime:String
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:" یکی از فیلد های ضروری را پر نکرده اید یا فرمت ایمیل  شما اشتباه است"})
            }

            examModel.findOne({id:value.examId},(err,exam)=>{
                if(exam){
                examSheetModel.find({},(err,examSheets)=>{
                    if(examSheets.length==0){
                        value.id = 1
    
                    }else{
                        value.id = examSheets[(examSheets.length)-1].id + 1
    
                    }
                    let quesOrder = []
    
                    // exam.end_time 
                    // console.log(exam.end_time)
                    let dateSplitstart = value.start_time.split(":")
                    let dateSplitend = exam.end_time.split(":")
                    for (let index = 0; index < dateSplitstart.length; index++) {

                        dateSplitstart[index]= parseInt(dateSplitstart[index])
                        dateSplitend[index]= parseInt(dateSplitend[index])
                    }
                    console.log(dateSplitend[0])
                    let totalmin = (dateSplitend[0]-dateSplitstart[0])*60+(dateSplitend[1]-dateSplitstart[1])
                    let sec = dateSplitend[2]-dateSplitstart[2]
                    if(sec<0){
                        sec = 60+(sec)
                        totalmin--
                    }
                    totalmin = totalmin + ':' + (sec)

                    questionModel.find({
                        examId:value.examId
                    },(err,questions)=>{
                        if(questions){
                            for (let index = 0; index < questions.length; index++) {
                                quesOrder.push(questions[index].id)
                                
                            }


                            let newExamSheet = {
                                id:value.id,  
                                examId:value.examId,
                                studentId:req.user.id,
                                quesOrder:quesOrder,
                                currentQues:quesOrder[0],
                                remainingTime:totalmin
                            }
                            newExamSheet = new examSheetModel(newExamSheet)
                            newExamSheet.save(function (err) {
                            if (err) console.log(err)
                            else{
                                return res.send({status:"success",message:"با موفقیت وارد ازمون شدید",data:newExamSheet})


                            }
                            })
                        }
                    })

                })
                



                    

                
                }



            })
            // examSheetModel


            
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }
    static async getExamSheet(req, res) {
        try {
            
            
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }
    
    static async addAnswerToExamSheet(req, res) {
        try {
            
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }

    

    

   
}

module.exports = ExamController;