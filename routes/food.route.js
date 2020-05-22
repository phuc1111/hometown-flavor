
var express = require('express');
var router = express.Router();
var controller = require('../controller/food.controller')
var validate = require('../validate/food.validate')
var VerifyAdmin = require('../middleware/checkUser')
var VerifyHousewife = require('../middleware/checkHousewife')
var checkNotUser = require('../middleware/checkNotUser')

var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/' })
router.get('/', controller.getFoods);

router.post('/create',
    // VerifyHousewife,
    // upload.single('image'),
    validate.checkCreate,
    controller.create
);

router.patch('/update/:id',
    // checkNotUser,
    controller.checkOk
);

router.delete('/delete/:id',
    // checkNotUser,
    controller.delete
)

module.exports = router;