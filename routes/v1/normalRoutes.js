var express = require('express')
var router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

const {UniversityController,UserController,CourseController} = require("../../controllers/normal")
router.post('/university/create',UniversityController.Create)


router.post('/user/create',UserController.Create)
router.use(authMiddleware.admin)
router.get('/user/getUniById/:id', UniversityController.getUniById);


router.get('/user/list',UserController.List)
router.get('/user/my', UserController.GetMyUser);
router.get('/user/getUserById/:id', UserController.getUserById);


router.post('/course/create',CourseController.Create)
router.get('/course/list',CourseController.List)

module.exports = router;