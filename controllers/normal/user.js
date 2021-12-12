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
                        email:value.email,
                        deleted:false
                    },(err,user)=>{
                        if(user){
                            return res.json({status:"error",message:"یوزر با ایمیل شما موجود می باشد"})


                        }
                        else{
                            userModel.findOne({
                                username:value.username,
                                deleted:false
                            },async (err,user)=>{
                                if(user){
                                    return res.json({status:"error",message:"یوزر با نام کاربری شما موجود می باشد"})
                    
                                }else{
                                    value.password =await  Helper.Hash(value.password)
                                    value.profilePic={
                                        url:process.cwd()+"/public/upload/customProfile.jpeg",
                                        name:"customProfile.jpeg"
                                    }
                                     
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

    static async List(req, res) {
        try {
           

            const schema = joi.object().keys({
                role: joi.string(),
               
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:" یکی از فیلد های ضروری را پر نکرده اید "})
            }
            if(value.role){

                userModel.find({
                    role:value.role,
                    uniId:req.user.uniId,
                    deleted:false
                },async (err,users)=>{
                    return res.send({status:"success",message:"با موفقیت انجام شد",data:users})

                })

            }else{
                userModel.find({ uniId:req.user.uniId},async (err,users)=>{
                    return res.send({status:"success",message:"با موفقیت انجام شد",data:users})

                })

            }
            // const Schema = joi.object().keys({
            //     filter: joi.object().keys({
            //         where: joi.object().keys({
            //             role: joi.string(),
            //             username: joi.string(),
                       
            //         }) .default({}),
                    
            //     }).default({ order: { by: "id", sort: "desc" } })
            // })

           
            
            // const { error, value } = Schema.validate(req.query, { abortEarly: true })
            // if (error) {
            //     return response.validation(res, error)
            // }
            // let where = {}
            // where.deleted = false

            // if (value.filter.where) {
            //     where = {
            //         ...value.filter.where
            //     }
            //     where.deleted = false
               

               
            //     if (where.mobile) {
            //         where.mobile=(where.mobile.split(" "))[1]
            //         where.mobile='+'+where.mobile
            //     }
            //     console.log(where.mobile)
             
                
            // }
            // let users = await Helper.paginate(base, value.page, {
            //     attributes: ['id', 'mobile', 'email', 'status', "company","full_name","role","deleted"],
            //     where,
            // }, value.limit)

            // for (let index = 0; index < users.length; index++) {
            //     if(users[index].dataValues.status == AdminStatus[0]){
            //         users[index].dataValues.status = "در حال انتظار برای تایید"

            //     }
            //     else if(users[index].dataValues.status == AdminStatus[1]){
            //         users[index].dataValues.status = "تایید شده"

            //     }
            //     else{
            //         users[index].dataValues.status = "بلاک شده"
            //     }
               
                
            // }
            
            

            // for (let index = 0; index <  users.count; index++) {
            //     if(users[index].dataValues.deleted==true){
            //         users.splice(index, 1);
            //     }
                
            // }
            // return response.success(res, users, res.t("CRUD.Success"))
        } catch (error) {
            return response.catchError(res, error)
        }
    }

    static async GetMyUser(req, res) {
        try {

            let user = req.user
            
            return res.send({status:"success",message:"با موفقیت انجام شد",data:user})
        } catch (error) {
            return response.catchError(res, error)
        }
    }
    static async getUserById(req, res) {
        try {
            const Schema = joi.object().keys({
                id: joi.number().required(),
            })
            const { error, value } = Schema.validate(req.params, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:" یکی از فیلد های ضروری را پر نکرده اید "})
            }
           
                userModel.findOne({
                    id:value.id,
                    deleted:false
                },async (err,user)=>{
                    
                    return res.send({status:"success",message:"با موفقیت انجام شد",data:user})


                })

            

        } catch (error) {
            return response.catchError(res, error)
        }
    }
    static async updateUser(req, res) {
        try {
            
         
            const schema = joi.object().keys({

                id: joi.number().required(),
                fullName: joi.string().required(),
                password:  joi.string(),
                username: joi.string().required(),
                email:   joi.string().custom(Helper.email, "email validation").required(),
                
                
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:" یکی از فیلد های ضروری را پر نکرده اید یا فرمت ایمیل اشتباه است"})
            }
            console.log(value)
           
           
                
               
                    userModel.findOne({
                        email:value.email
                    },(err,user)=>{
                        if(user && user.id != value.id){
                            return res.json({status:"error",message:"یوزر بااین ایمیل موجود می باشد"})


                        }else{
                            userModel.findOne({
                                username:value.username
                            },async (err,user)=>{
                                if(user && user.id != value.id){
                                    return res.json({status:"error",message:"یوزر با این نام کاربری موجود می باشد"})
                    
                                }else{
                                    userModel.findOne({
                                        id:value.id
                                    },async (err,userUpdate)=>{
                                        if(userUpdate){
                                            
                                            value.password =await Helper.Hash(value.password)
                                            userUpdate.fullName =value.fullName
                                            userUpdate.email =value.email
                                            userUpdate.password =value.password
                                            userUpdate.username =value.username
                                            userUpdate.save(function (err) {
                                                if (err) console.log(err)
                                                else{
                                                    return res.json({status:"success",message:"کاربر با موفقیت ویرایش شد"})

                                                }
                                              })

                            
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

    static async deleteUser(req, res) {
        try {
            
         
            const schema = joi.object().keys({

                id: joi.number().required(), 
                
            })
            const { error, value } = schema.validate(req.params, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:" یکی از فیلد های ضروری را پر نکرده اید یا فرمت ایمیل اشتباه است"})
            }
            console.log(value)
           
           
                
               
                    userModel.findOne({
                        id:value.id,
                        deleted:false
                    },(err,user)=>{
                        if(!user){
                            return res.send({status:"error",message:" این کاربر چند لحظه پیش حذف شد"})

                        }else{
                            user.deleted = true

                            user.save(function (err) {
                                if (err) console.log(err)
                                else{
                                    return res.json({status:"success",message:"کاربر با موفقیت حذف شد"})

                                }
                              })
                        }
                        
                       
        
        
                    })

                   
                
                    

                   
                  
                      
                       
                       
                   

         
           
        } catch (error) {
            return res.send({status:"error",message:error})
        }

    }

    static async updateMyUser(req, res) {
        try {
            console.log(req.files)
            

            
         
            const schema = joi.object().keys({
               
                fullName: joi.string().required(),
                lastpass: joi.string(),
                newpass:  joi.string(),
                username: joi.string().required(),
                email:   joi.string().custom(Helper.email, "email validation").required(),
                
                
            })
            const { error, value } = schema.validate(req.body, { abortEarly: true })
            if (error) {
                return res.send({status:"error",message:" یکی از فیلد های ضروری را پر نکرده اید یا فرمت ایمیل  شما اشتباه است"})
            }
            // console.log(value)




            userModel.findOne({
                email:value.email
            },(err,user)=>{
                if(user && req.user.id != user.id){
                    return res.json({status:"error",message:"یوزر بااین ایمیل موجود می باشد"})


                }else{
                    console.log(1)
                    userModel.findOne({
                        username:value.username
                    },async (err,user)=>{
                        if(user && req.user.id != user.id){
                            return res.json({status:"error",message:"یوزر با این نام کاربری موجود می باشد"})
            
                        }else{
                            console.log(1)

                            userModel.findOne({
                                id:req.user.id
                            },async (err,userUpdate)=>{
                                if(userUpdate){
                                    console.log(1)

                                    if(value.lastpass && value.newpass){
                                        if(await Helper.Compare(value.lastpass,userUpdate.password)){
                                            value.password =await Helper.Hash(value.newpass)
                                            userUpdate.password = value.password
    
                                        }else{
                                            return res.json({status:"error",message:"پسورد فعلی خود را اشتباه وارد کرده اید"})
    
    
                                        }

                                    }else if(lastpass || newpass){
                                        return res.json({status:"error",message:"هردو فیلد مربوط به تغییر پسورد را کامل کنید"})

                                    }
                                   
                                   
                                    userUpdate.fullName =value.fullName
                                    userUpdate.email =value.email
                                    // userUpdate.password =value.password
                                    userUpdate.username =value.username
                                    let profilePic
                                    if(req.files){
                                        profilePic = {
                                            url:process.cwd()+"/public/upload/"+req.files.profilePic[0].filename,
                                            name:req.files.profilePic[0].originalname

                                        }
                                    }
                                    userUpdate.profilePic = profilePic
                                    userUpdate.save(function (err) {
                                        if (err) console.log(err)
                                        else{
                                            return res.json({status:"success",message:"کاربر با موفقیت ویرایش شد"})

                                        }
                                      })

                    
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
    
    
}

module.exports = UserController;