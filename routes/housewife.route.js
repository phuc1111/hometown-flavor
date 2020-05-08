var express = require('express')
var router = express.Router()

var multer = require('multer')
var upload = multer({})
var controller = require('../controller/housewife.controller')

var validate = require('../validate/housewife.validate')
var VerifyToken = require('../controller/VerifyToken')
var VerifyAdmin = require('../middleware/checkUser')

router.get('/', controller.index);

router.post('/login', controller.login)

router.get('/logout', controller.logout);

router.post('/register',
    upload.single('avatar'),
    validate.checkCreate,
    controller.register
)

router.get('/me', VerifyToken, controller.me)



router.patch('/update',
    upload.single('avatar'),
    VerifyToken,
    validate.checkCreate,
    controller.update
)

router.delete('/delete/:id',
    VerifyAdmin,
    controller.delete
)

module.exports = router;