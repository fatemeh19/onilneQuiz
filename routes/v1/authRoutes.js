var express = require('express')
var router = express.Router();
const {AuthController} = require("../../controllers/normal")

router.post('/login',AuthController.Login)

router.post('/sendEmailRP',AuthController.sendEmailRP)

router.post('/resetPass',AuthController.ResetPass)




module.exports = router;