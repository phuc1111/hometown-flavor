var express = require('express')
var router = express.Router()
var controller = require('../controller/comment.controller')

var VerifyToken = require('../controller/VerifyToken')
var validate = require('../validate/comment.validate')

router.get('/', VerifyToken, controller.getComment);

router.post('/create',
    VerifyToken,
    validate.checkCreate,
    controller.create
);

router.patch('/check/:id', controller.checkOk);
router.patch('/update/:id',
    VerifyToken,
    validate.checkCreate,
    controller.update
);

router.delete('/delete/:id', VerifyToken, controller.delete);


module.exports = router;