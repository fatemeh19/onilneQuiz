const joi = require('joi')
const {courseModel} = require('../../models/course')
// const response = require('../../middleware/responseHandler')
// const { Helper } = require("../../components/helper")
const {userModel} = require('../../models/user')


class CourseController {
    static async Create(req, res) {
        try {
            console.log(req.body)
            const schema = joi.object().keys({
                studentIds:joi.array().items(joi.number()),
                name: joi.string().required(),
                profId: joi.number().required(),
                
                
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:"یکی از فیلد های ضروری را پر نکرده اید"})
            }
            let flag =false

            courseModel.find({ }, function (err, courses) {
                for (let index = 0; index < courses.length; index++) {
                    if(courses[index].name==value.name &&courses[index].profId==value.profId){
                        flag = true                        
                        return res.send({status:"error",message:"شما نمی توانید دوبار یک درس را با یک استاد ایجاد کنید"})
                        
                    }
                    
                }
                if(!flag){
                    if(courses.length==0){
                        value.id = 1
        
                    }else{
                        value.id = courses[(courses.length)-1].id + 1
        
                    }
                    value.uniId = req.user.uniId
                    const NewCourse = new courseModel(value);
                    NewCourse.save(function (err) {
                  if (err) console.log(err)
                  else{
                    return res.send({status:"success",message:"با موفقیت ایجاد شد",data:NewCourse})
    
                  }
                  // saved!
                })  

                }
                 

               

            
                
              })
            

            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }



    static async List(req, res) {
        try {
           
                courseModel.find({
                    uniId:req.user.uniId
                },async (err,courses)=>{
                    
                    return res.send({status:"success",message:"با موفقیت انجام شد",data:courses})


                })

            

        } catch (error) {
            return response.catchError(res, error)
        }
    }

   
}

module.exports = CourseController;