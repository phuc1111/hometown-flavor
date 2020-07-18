var express = require('express');
var router = express.Router();

var controller = require('../controller/auth.controller')
var check = require('../validate/user.validate')
var verifyToken = require('../controller/VerifyToken')
var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/' })

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.post('/register',
    upload.single('avatar'),
    check.checkCreate,
    controller.register
);

router.post('/signup',
    check.checkSignup,
    controller.signup
);

router.get('/me', verifyToken, controller.me);

router.patch('/check/:code', verifyToken, controller.check);

router.delete('/delete', verifyToken, controller.delete);

router.post('/forgotpassword/:phone', controller.forgotPassword);

router.patch('/changepassword/:phone',
    check.checkChangPassword,
    verifyToken,
    controller.changepassword
);

router.patch('/updateprofile/:phone',
    upload.single('avatar'),

    verifyToken,
    controller.updateprofile
);


router.patch('/changeavatar/:image_id',
    upload.single('avatar'),
    check.checkChangAvatar,

    verifyToken,
    controller.changeAvatar
);

router.post('/admin/signup',
    check.checkSignup,
    controller.signupAdmin
);

module.exports = router;