
var express = require('express');
var router = express.Router();


var codeController = require('../controller/code.controller')
var controller = require('../controller/auth.controller')

var VerifyUser = require('../middleware/checkUser')
var verifyToken = require('../controller/VerifyToken')

var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/' })

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.post('/register', upload.single('avatar'), controller.register);

router.get('/me', VerifyUser, controller.me);

router.patch('/check/:code', VerifyUser, controller.check);

router.post('/requirecode/:phone',
    verifyToken,
    codeController.getCode,
    controller.sendCode
);

module.exports = router;