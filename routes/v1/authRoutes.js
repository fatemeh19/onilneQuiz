var express = require('express')
var router = express.Router();
const {AuthController} = require("../../controllers/normal")

router.post('/login',AuthController.Login)

module.exports = router;