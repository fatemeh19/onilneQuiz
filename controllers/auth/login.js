const joi = require('joi')
const {userModel} = require("../../models/user")
const { Helper } = require("../../components/helper")



class AuthController {

    static async Login(req, res) {
        console.log("login")
       
        
        try {
            let token
            const schema = joi.object().keys({
                username: joi.string().required(),
                password: joi.string().required(),
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:" یکی از فیلد های ضروری را پر نکرده اید "})
            }

            userModel.findOne({
                username:value.username,
               

            },async(err,user)=>{
                
                if(!user){
                    return res.send({status:"error",message:" نام کاربری شما اشتباه می باشد "})


                }else{
                    let compare = await Helper.Compare(value.password, user.password)
                    if (!compare) return res.send({status:"error",message:" نام پسورد شما اشتباه می باشد "})

                     token = await Helper.GenerateToken(user)
                     user.token = token

                     return res.send({status:"success",message:"با موفقیت وارد شدید",data:user})



                }

                

             })

            
                
            
           
         

        } catch (error) {
            return response.catchError(res, error)
        }
        
    }

    static async ResetPass(req, res) {
        try {
            const schema = joi.object().keys({
                code : joi.number().required(),
                password: joi.string().required(),
                confirm: joi.string().required()
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return response.validation(res, error)
            }

            if(value.password!=value.confirm){
                return res.send({status:"error",message:" پسورد خود را به درستی تایید کنید "})



            }else{
                value.password = await Helper.Hash(value.password)

                userModel.findOne({
                    resetPassCode:value.code
                },(err,user)=>{
                    if(!user){

                    }else{
                        user.password = value.password
                        user.save()
                        return res.send({status:"success",message:"پسورد شما با موفقیت ریست شد ",data:user})
        

                    }
                })

                

            }
         
           
        } catch (error) {
            return response.catchError(res, error)
        }
    }

    static async sendEmailRP(req, res) {
        try {
            
            const schema = joi.object().keys({
                email: joi.string().required(),
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:" یکی از فیلد های ضروری را پر نکرده اید "})
            }

            var nodemailer = require('nodemailer')
            let code = Math.floor(Math.random() * 100000) + 1000
            console.log(code)

            userModel.findOne({
                email:value.email
            },(err,user)=>{
                if(!user){
                    return res.send({status:"error",message:" کاربری با این ایمیل وجود ندارد"})


                }else{
                    user.resetPassCode = code
                    user.save()

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'fatemehveysi1378@gmail.com',
                    pass: 'Fv19242419'
                }
                });
    
                var mailOptions = {
                from: 'fatemehveysi1378@gmail.com',
                to: value.email,
                subject: "onlineQuiz Reset Pass",
                text: 'code : '+code+'\n'+'کد بالا را پس از ورود به ادرس زیر در فیلد کد وارد نمایید'+'\n'+"address:"+"http://localhost:5500/manager-panel-change-password.html"
                }
    
                transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response)
                }
                })
    
                   

                }
            })
            


         
         
           
        } catch (error) {
            return response.catchError(res, error)
        }
    }
   
}

module.exports = AuthController;