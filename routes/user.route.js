
var express = require('express')
var router = express.Router()

var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/' })
var controller = require('../controller/user.controller')

var validate = require('../validate/user.validate')
var VerifyToken = require('../controller/VerifyToken')
var VerifyAdmin = require('../middleware/checkUser')

// var sendSms = require('../autoCreate/sendSms');
// const Nexmo = require('nexmo')
// const nexmo = new Nexmo({
//     apiKey: '56b7f124',
//     apiSecret: 'c7qAnaYma1oqZ60c'
// });
// function sendSMS(fromPhone, toPhone, content, callback) {
//     nexmo.message.sendSms(fromPhone, toPhone, content, {
//         type: "unicode"
//     }, (err, responseData) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (responseData.messages[0]['status'] === "0") {
//                 callback("Message sent successfully.")
//             } else {
//                 callback(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//             }
//         }
//     })
// }
// router.post("/sendsms", function (req, res) {
//     let fromPhone = 'HVQN';
//     let toPhone = '84523175762';
//     sendSMS(fromPhone, toPhone, '1235977', function (responseData) {
//         console.log(responseData);
//         res.send(responseData);
//     });
// })

router.get('/', controller.index)

router.get('/:id', VerifyToken, controller.detail)

router.post('/create',
    upload.single('avatar'),
    validate.checkCreate,
    controller.create
)

router.patch('/update/:id',
    upload.single('avatar'),
    VerifyToken,
    validate.checkCreate,
    controller.update
)

router.delete('/delete/:id',
    // VerifyAdmin,
    controller.delete
)

module.exports = router;