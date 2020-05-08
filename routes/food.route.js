var express = require('express');
var router = express.Router();
var controller = require('../controller/admin.controller')
var VerifyAdmin = require('../middleware/checkUser')

router.get('/', controller.getFoods);

router.post('/create', upload.single('image'), controller.create);

router.patch('/update', upload.single('image'), controller.update);

router.delete('/delete', controller.delete)

module.exports = router;