var express = require('express');
var router = express.Router();
var controller = require('../controller/admin.controller')

router.get('/:id_food', controller.getComment);

router.post('/create', controller.create);

router.patch('/update', controller.update);

router.post('/delete', controller.delete);


module.exports = router;