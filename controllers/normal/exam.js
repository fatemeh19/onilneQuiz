const joi = require('joi')
const {examModel} = require('../../models/exam')
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
                numOfEnter:joi.number().required(),
                stopTimer:joi.boolean().required(), // 0 no stop,1 stop
                duration:joi.number().required(),
                questionTime:joi.number().required(),
                timeForAnyQuestion:joi.boolean().required(),
                arrange_Q:joi.boolean().required(),
                backtoQuestion:joi.boolean().required(),
                quizTime:joi.number().required()
                
                
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                 return res.send({status:"error",message:"یکی از فیلد های ضروری را پر نکرده اید"})

            }
            
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
            
            if(value.duration>value.quizTime){
                return res.send({status:"error",message:"مدت زمان پاسخگویی آزمون نباید بیشتر از زمانی باشد که برای کل ازمون قرار داده شده است"})

            }else{



            const newExam = new examModel(value)
            newExam.save(function (err) {
              if (err) console.log(err)
              else{
                return res.send({status:"success",message:"آزمون شما با موفقیت ساخته شد"})


              }
            })


            }

           
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }



    

   
}

module.exports = ExamController;