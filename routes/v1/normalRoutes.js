var express = require('express')
var router = express.Router();
const {UniversityController,UserController} = require("../../controllers/normal")

router.post('/university/create',UniversityController.Create)
router.post('/user/create',UserController.Create)

module.exports = router;