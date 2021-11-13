const { Helper } = require("../components/helper")


class authMiddleware {
    static async admin(req, res, next) {
        if (
            req.headers &&
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0].toLocaleLowerCase() === "bearer"
        ) {
            try {
                const user = await Helper.TokenVerify(req.headers.authorization.split(" ")[1])
                if(!user){

                }else{
                    req.user = user;

                }
                
                next()
            } catch (error) {
                req.user = undefined;
                return response.customError(res, res.t("401", { scope: "Auth" }), 401);
            }
        } else {
            req.user = undefined;
            return response.customError(res, res.t("401", { scope: "Auth" }), 401);
        }
    }
 
    static async sessionRepeater(req, res, next) {

        let nowDate  = new Date(Date.now())
        let expireMilli = 3600000 + nowDate.getTime()

        let session = await db.session.findOne({where:{ 
            userId:req.user.id
          }})
        
          if(session){
            // let session = await db.session.findOne({where:{ 
            //   userId:req.user.id
            // }})
        
            
            let newExpire = {
                expired : new Date(expireMilli)
            }

           
            session.update(newExpire)
            
        
          }else{
            let newSessionval = {
                userId:req.user.id,
                expired : new Date(expireMilli)
              }
  
             
              let newSession = await db.session.create(newSessionval)
              newSession.save()
              
          }
          next()
        
        // console.log(nowDate)
    }  
     

    
}


// (req,res,next)=>{
//     let session = await db.session.findOne({where:{ 
//       userId:req.user.id
//     }})
  
//     if(session){
//       let session = await db.session.findOne({where:{ 
//         userId:req.user.id
//       }})
  
//       let nowDate  = new Date(Date.now())
//       let expireMilli = 3600000 + nowDate.getTime()
//       let newExpire = {
//         expire = 3600000
//       }
  
//     }
//   }

module.exports = authMiddleware