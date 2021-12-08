const joi = require('joi')
const {examModel} = require('../../models/exam')
// const response = require('../../middleware/responseHandler')
// const { Helper } = require("../../components/helper")



class ExamController {


    static async Create(req, res) {
        try {
            console.log(req.body)
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
                // return res.send({status:"error",message:error})

            }
            console.log(value)
            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }



    

   
}

module.exports = ExamController;