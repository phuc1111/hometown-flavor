var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: 'assets/uploads/' });
var controller = require('../controller/housewife.controller');
var check = require('../validate/user.validate')
var validate = require('../validate/housewife.validate');
var VerifyToken = require('../controller/VerifyToken');
var VerifyAdmin = require('../middleware/checkAdmin');


router.post('/login', controller.login);

router.get('/logout', controller.logout);
router.get('/forgotpassword/:phone', controller.forgotPassword);

router.post('/signup', check.checkSignup, controller.signup);

router.get('/me', VerifyToken, controller.me)
router.get('/getAllHousewife', VerifyToken, controller.getAllHousewife)
router.patch('/check/:id',
    VerifyToken,
    controller.check
)
router.delete('/delete/:id',
    VerifyToken,
    controller.delete
)

router.get('/getmyorder',
    VerifyToken,
    controller.getMyOrder
)


module.exports = router;