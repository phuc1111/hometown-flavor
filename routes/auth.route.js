var express = require('express');
var router = express.Router();
var controller = require('../controller/auth.controller')
var VerifyAdmin = require('../middleware/checkUser')
var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/' })

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.post('/register', upload.single('avatar'), controller.register);

router.get('/me', VerifyAdmin, controller.me);

module.exports = router;