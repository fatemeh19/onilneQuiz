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
   
}

module.exports = AuthController;