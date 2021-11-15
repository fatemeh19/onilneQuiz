var express = require('express')
var router =express.Router();
router.use('/api/v1/auth', require("./v1/authRoutes"));
router.use('/api/v1', require("./v1/normalRoutes"));


router.use('/', (req,res,next)=>{
    res.send('root teritory')
    next()
})

module.exports = router
