var express = require('express');
var router = express.Router();
var controller = require('../controller/order.controller');
var VerifyToken = require('../controller/VerifyToken')
var validate = require('../validate/order.validate')

router.get('/getOrder', VerifyToken, controller.getOrder);

router.get('/getAllOrder', VerifyToken, controller.getAllOrder);

router.get('/getOrderById/:id', VerifyToken, controller.getOrderById);

router.post('/create', validate.checkCreate, VerifyToken, controller.create);

router.patch('/update/:id', VerifyToken, controller.update);

router.delete('/delete/:id',
    VerifyToken,
    validate.checkDelete,
    controller.delete
);

// router.get('/getAllOrder', controller.getAllOrder);

module.exports = router;