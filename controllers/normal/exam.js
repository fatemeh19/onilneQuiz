const joi = require('joi')
const {examModel} = require('../../models/exam')
const {questionModel} = require('../../models/question')

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
                Archive:joi.boolean().required(),   
                testordesc:joi.boolean().required(), //0 test , 1 desc
                questionType:joi.boolean().required(), //0 with prof , 1 pdf
                mines:joi.boolean().required(), //0 no,1 yes
                review:joi.boolean().required(),
                start_date:joi.string().required(),
                start_time:joi.string().required(),
                end_date:joi.string().required(),
                end_time:joi.string().required(),
            
                //
                currentDateAndTime:joi.boolean().required(),
                floating:joi.boolean().required(),
                QtoQTimeForAnyQ:joi.boolean().required(),
                QtoQFullTime:joi.boolean().required(),
                //
                numOfEnter:joi.number(),
                stopTimer:joi.boolean().required(), // 0 no stop,1 stop
                duration:joi.number(),
                questionTime:joi.number(),
                timeForAnyQuestion:joi.boolean().required(),
                arrange_Q:joi.boolean().required(),
                backtoQuestion:joi.boolean().required(),
                quizTime:joi.number(),
                subjectQ:joi.string(),
                showMinQ:joi.number(),
                explainationQ:joi.string(),
                subjectA:joi.string(),
                accessDateA:joi.string(),
                accessTimeA:joi.string(),
                explainationA:joi.string(),
                
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
            if(req.files){
                if(req.files.questionPdf){
                    let quesPdf={
                        url:process.cwd()+"/public/upload/"+req.files.questionPdf[0].filename,
                        name:req.files.questionPdf[0].originalname,
                        subjectQ:value.subjectQ,
                        showMinQ:value.showMinQ,
                        explainationQ:value.explainationQ
                        }


                        value.quesPdf = quesPdf

                }

                if(req.files.answerPdf){
                    let answPdf={
                        url:process.cwd()+"/public/upload/"+req.files.answerPdf[0].filename,
                        name:req.files.answerPdf[0].originalname,
                        subjectA:value.subjectA,
                        accessDateA:value.accessDateA,
                        accessTimeA:value.accessTimeA,
                        explainationA:value.explainationA,
                        }

                        value.answPdf = answPdf

                }
               
 

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
                examId:joi.number().required(),
                quesoptions:joi.array().items(joi.string()),
                answoptions:joi.string(), 
                ResponseTime:joi.number(),
                Score: joi.number().required(),
                desc:joi.string()
               
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
                            if(exam.QtoQTimeForAnyQ){
                                if(!exam.timeForAnyQuestion){
                                    value.ResponseTime = exam.questionTime
        
                                }
                            }
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
                               

                            }else{
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
                                        return res.send({status:"success",message:"با موفقیت ایجاد شد",data:newQuestion})

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

            examModel.findOne({
                profId:req.user.id

            },(err,exams)=>{
                return res.send({status:"success",message:"با موفقیت انجام شد",data:exams})

                
            })
            
            
           
           
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }



    

   
}

module.exports = ExamController;