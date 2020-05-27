
var express = require('express')
var router = express.Router()

var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/' })
var controller = require('../controller/user.controller')

var validate = require('../validate/user.validate')
var VerifyToken = require('../controller/VerifyToken')
var VerifyAdmin = require('../middleware/checkAdmin')

router.get('/', controller.index)

router.get('/:id', VerifyToken, controller.detail)

router.post('/create',
    upload.single('avatar'),
    validate.checkCreate,
    controller.create
)

router.patch('/update/:id',
    upload.single('avatar'),
    VerifyToken,
    validate.checkCreate,
    controller.update
)

router.delete('/delete/:id',
    // VerifyAdmin,
    controller.delete
)

module.exports = router;