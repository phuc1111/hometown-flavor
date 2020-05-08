var express = require('express');
var router = express.Router();
var controller = require('../controller/admin.controller')
var VerifyAdmin = require('../middleware/checkUser')

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.post('/register', upload.single('avatar'), controller.register);


module.exports = router;