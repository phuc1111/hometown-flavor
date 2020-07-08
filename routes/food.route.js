
var express = require('express');
var router = express.Router();
var controller = require('../controller/food.controller')
var validate = require('../validate/food.validate')
var VerifyAdmin = require('../middleware/checkAdmin')
var verifyToken = require('../controller/VerifyToken')
var VerifyHousewife = require('../middleware/checkHousewife')

var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/' })
router.get('/', controller.getFoods);

router.post('/create',
    verifyToken,
    upload.single('image'),
    validate.checkCreate,
    controller.create
);

router.patch('/update/:id',
    verifyToken,
    controller.checkOk
);

router.get('/:id',
    verifyToken,
    controller.getFoodFromId
);


router.delete('/delete/:id/:image_id',
    verifyToken,
    controller.delete
)

module.exports = router;