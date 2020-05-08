var express = require('express');
var router = express.Router();
var controller = require('../controller/admin.controller')

router.get('/getOrder/', controller.getOrder);

router.post('/create', controller.create);

router.patch('/update', controller.update);

router.post('/delete', controller.register);

router.get('/getAllOrder', controller.getAllOrder);

module.exports = router;