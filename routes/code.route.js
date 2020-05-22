var express = require('express');
var router = express.Router();
var controller = require('../controller/code.controller')

var VerifyUser = require('../middleware/checkUser')

router.get('/getCode/:phone', VerifyUser, controller.getCode);


module.exports = router;