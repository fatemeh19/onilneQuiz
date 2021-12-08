var express = require('express')
var router = express.Router();
var multer = require("multer")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    // console.log(req.url)
    // if(req.url=='/GeneralSetting/update'){
    //   cb(null, file.fieldname+'.'+(file.mimetype.split('/'))[1] )
    // }
    // else{
    cb(null, file.fieldname+(Date.now())+'.'+(file.mimetype.split('/'))[1] )

    // }
   
  }
 
})

var upload = multer({ storage: storage })

const cpUpload = upload.fields([{name:'profilePic' , maxCount: 1}])

const authMiddleware = require("../../middleware/authMiddleware");

const {UniversityController,UserController,CourseController,ExamController} = require("../../controllers/normal")

router.post('/university/create',UniversityController.Create)


router.post('/user/create',UserController.Create)
router.use(authMiddleware.admin)
router.get('/user/getUniById/:id', UniversityController.getUniById);


router.get('/user/list',UserController.List)
router.get('/user/my', UserController.GetMyUser)
router.put('/user/updateMyUser',cpUpload, UserController.updateMyUser)
router.get('/user/getUserById/:id', UserController.getUserById)
router.post('/user/updateUser', UserController.updateUser)
router.delete('/user/deleteUser/:id', UserController.deleteUser)




router.post('/course/create',CourseController.Create)
router.get('/course/list',CourseController.List)




router.post('/exam/create',ExamController.Create)

module.exports = router;