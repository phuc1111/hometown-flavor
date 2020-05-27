
var express = require('express');
var router = express.Router();
var controller = require('../controller/food.controller')
var validate = require('../validate/food.validate')
var VerifyAdmin = require('../middleware/checkAdmin')

var VerifyHousewife = require('../middleware/checkHousewife')

var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/' })
router.get('/', controller.getFoods);

router.post('/create',
    VerifyHousewife,
    upload.single('image'),
    validate.checkCreate,
    controller.create
);

router.patch('/update/:id',
    VerifyHousewife,
    controller.checkOk
);

router.delete('/delete/:id',
    VerifyHousewife,
    controller.delete
)

module.exports = router;