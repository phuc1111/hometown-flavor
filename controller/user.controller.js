
var User = require('../model/user.model')
const cloudinary = require('cloudinary')
require('../middleware/cloundinary')

var check = require('../middleware/checkUser')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var sendSms = require('../validate/sms.validate');
//send sms
const Nexmo = require('nexmo')
const nexmo = new Nexmo({
    apiKey: '56b7f124',
    apiSecret: 'c7qAnaYma1oqZ60c'
});

// app.post("/sendsms", function (req, res) {
//     let fromPhone = 84364097978;
//     let toPhone = 84989710452;
//     let content = '123456';
//     sendSMS(fromPhone, toPhone, content, function (responseData) {
//         console.log(responseData);
//     });
// })
module.exports.index = async function (req, res, next) {
    try {
        var user = await User.find()
        res.json(user);
    } catch (err) {
        next(err.message)
    }
}

module.exports.detail = async function (req, res, next) {
    try {
        var user = await User.findOne({ _id: req.params.id });
        if (user == null) {
            throw new Error('User do not exist')
        }
        res.json(user);
    } catch (err) {
        next(err.message)
    }
}

module.exports.create = async function (req, res, next) {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        req.body.avatar = result.url;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        var user = await User.create(req.body);
        //sendsms
        // var sms = await sendSms.sendSms('84364097989', user.phone, user.code);
        // nexmo.message.sendSms(84364097989, 84364097989, '123456', function (responseData) {
        //     console.log(responseData);
        // });
        res.send(user);

    } catch (err) {
        console.log(err);
        next(err.message)
    }
}


module.exports.update = async function (req, res, next) {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        req.body.avatar = result.url;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        var user = await User.updateMany({ _id: req.params.id }, {
            $set: {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                phone: req.body.phone,
                address: req.body.address,
                avatar: req.body.avatar
            }
        });

        res.json(req.body);

    } catch (err) {
        next(err.message)
    }
}
module.exports.delete = async function (req, res, next) {
    try {
        var user = await User.deleteOne({ '_id': req.params.id })
        res.send(user);

    } catch (err) {
        next(err.message)
    }
}
