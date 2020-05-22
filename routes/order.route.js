var express = require('express');
var router = express.Router();
var controller = require('../controller/order.controller');
var VerifyToken = require('../controller/VerifyToken')
var VerifyUser = require('../middleware/checkUser');

// router.get('/getOrder', VerifyToken, controller.getOrder);

router.post('/create', VerifyToken, controller.create);

router.patch('/update/:id', VerifyToken, controller.update);

router.delete('/delete/:id', VerifyToken, controller.delete);

// router.get('/getAllOrder', controller.getAllOrder);

module.exports = router;