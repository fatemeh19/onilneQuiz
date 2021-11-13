const joi = require('joi')
const {userModel} = require('../../models/user')
const {uniModel} = require('../../models/university')
const {userType} = require('../../components/Enums')
// const response = require('../../../middleware/responseHandler')
const { Helper } = require("../../components/helper")


class UserController {
    static async Create(req, res) {
        try {
            
         
            const schema = joi.object().keys({
                uniId: joi.number().required(), 
                fullName: joi.string().required(),
                password: joi.string().required(),
                username: joi.string().required(),
                email:   joi.string().custom(Helper.email, "email validation").required(),
                role: joi.string().required()

                
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:" یکی از فیلد های ضروری را پر نکرده اید یا فرمت ایمیل  شما اشتباه است"})
            }
            console.log(value)
            let users = await userModel.find({})
            if(users.length==0){
                value.id = 1

            }else{
                value.id = users[(users.length)-1].id + 1

            }
           
                

                    userModel.findOne({
                        email:value.email
                    },(err,user)=>{
                        if(user){
                            return res.json({status:"error",message:"یوزر با ایمیل شما موجود می باشد"})


                        }
                        else{
                            userModel.findOne({
                                username:value.username
                            },async (err,user)=>{
                                if(user){
                                    return res.json({status:"error",message:"یوزر با نام کاربری شما موجود می باشد"})
                    
                                }else{
                                    value.password =await  Helper.Hash(value.password)
                                    const NewUser = new userModel(value)
                                    NewUser.save(function (err) {
                                      if (err) console.log(err)
                                    })
                        
                        
                                   
                                return res.send({status:"success",message:"با موفقیت ایجاد شد",data:NewUser})
                        
                
                                }
                
                
                            })

                        }
        
        
                    })


                


           

            


           
           
           

           
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }
    
}

module.exports = UserController;