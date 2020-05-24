var User = require('../model/user.model')
var Code = require('../model/code.model')

const Nexmo = require('nexmo')
const nexmo = new Nexmo({
    apiKey: '56b7f124',
    apiSecret: 'c7qAnaYma1oqZ60c'
});

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config');
const cloudinary = require('cloudinary')
require('../middleware/cloundinary')
var salt = bcrypt.genSaltSync(10);

function sendSMS(fromPhone, toPhone, content, callback) {
    nexmo.message.sendSms(fromPhone, toPhone, content, {
        type: "unicode"
    }, (err, responseData) => {
        if (err) {
            console.log("error:", +err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                callback("Message sent successfully.")
            } else {
                callback(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

module.exports.login = function(req, res) {

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 3600 // expires in 1 hours
        });

        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
    });

};

module.exports.logout = function(req, res) {
    res.status(200).send({ auth: false, token: null });
};

module.exports.register = async function(req, res, next) {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        req.body.avatar = result.url;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        var user = await User.create(req.body);
        var code = await Code.create({ phone: req.body.phone });
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        next(err.message)
    }

};

module.exports.me = function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function(err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    })
};

module.exports.check = async function(req, res, next) {
    // console.log(req.params.code)
    try {
        var user = await User.updateOne({ _id: req.userId }, {
            $set: {
                ischeck: true
            }
        });
        res.json(req.body);

    } catch (err) {
        next(err.message)
    }
}

module.exports.sendCode = async function(req, res, next) {
    try {
        console.log("send code running");
        Code.find({ phone: req.params.phone })
            .then(data => {
                // console.log(data);
                sendSMS("PHUC", data.phone, data.code, function(responseData) {
                    console.log(responseData);
                    res.send(responseData);
                });
            })
            .catch(err => {
                next(err);
            })
            // await sendSMS('PHUC', req.code.phone, req.code.code, function (responseData) {
            //     // console.log(responseData);
            //     res.send(responseData);
            // });
            // let fromPhone = 'HVQN';
            // let toPhone = '84364097989';
            // sendSMS(fromPhone, toPhone, '1235977', function(responseData) {
            //     console.log(responseData);
            //     res.send(responseData);
            // });

    } catch (error) {
        next(err.message)
    }


};


// router.post("/sendsms", function (req, res) {
// let fromPhone = 'HVQN';
// let toPhone = '84523175762';
// sendSMS(fromPhone, toPhone, '1235977', function (responseData) {
//     console.log(responseData);
//     res.send(responseData);
// });
// })