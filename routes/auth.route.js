var express = require('express');
var router = express.Router();

var controller = require('../controller/auth.controller')

var verifyToken = require('../controller/VerifyToken')

var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/' })

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.post('/register', upload.single('avatar'), controller.register);

router.get('/me', verifyToken, controller.me);

router.patch('/check/:code', verifyToken, controller.check);

router.delete('/delete', verifyToken, controller.delete);

router.post('/forgotpassword/:phone', controller.forgotPassword);

router.patch('/changepassword/:phone', controller.changepassword);

module.exports = router;