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
router.get('/getFoodByHousewife', verifyToken, controller.getFoodByHousewife);



router.get('/north', controller.getNorthFoods);
router.get('/central', controller.getCentralFoods);
router.get('/south', controller.getSouthFoods);

router.post('/postImage',
    upload.single('image'),
    controller.postImage
);

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
    controller.getFoodFromId
);


router.delete('/delete/:id/:image_id',
    verifyToken,
    controller.delete
)

module.exports = router;