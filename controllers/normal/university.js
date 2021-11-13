const joi = require('joi')
const {uniModel} = require('../../models/university')
const response = require('../../middleware/responseHandler')
// const { Helper } = require("../../components/helper")


class UniversityController {
    static async Create(req, res) {
        try {
            const schema = joi.object().keys({
                name: joi.string().required(),
                address: joi.string().required(),
                
                
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:"یکی از فیلد های ضروری را پر نکرده اید"})
            }

             uniModel.find({ }, function (err, unies) {
                 console.log(unies.length)

                if(unies.length==0){
                    value.id = 1
    
                }else{
                    value.id = unies[(unies.length)-1].id + 1
    
                }
                const NewUni = new uniModel(value);
            NewUni.save(function (err) {
              if (err) console.log(err)
              else{
                return res.send({status:"success",message:"با موفقیت ایجاد شد",data:NewUni})

              }
              // saved!
            })

            
                
              })
            

            
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }
    
}

module.exports = UniversityController;