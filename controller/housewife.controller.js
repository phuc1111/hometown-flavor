
var Housewife = require('../model/housewife.model')
var config = require('../config');
require('../middleware/cloundinary')
var code = require('../autoCreate/code')
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary')

var salt = bcrypt.genSaltSync(10);

var twilio = require('twilio');

var accountSid = 'ACe22d535911002bdeda7e25db8a79c2da'; // Your Account SID from www.twilio.com/console
var authToken = 'b95d78cc754edb3f81949fae15ad465b';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

module.exports.index = async function (req, res, next) {
    try {
        var housewife = await Housewife.find()
        res.json(housewife);
    } catch (err) {
        next(err.message)
    }
}

module.exports.login = function (req, res) {

    Housewife.findOne({ phone: req.body.phone }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 7200 // expires in 2 hours
        });

        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
    });

};

module.exports.logout = function (req, res) {
    res.status(200).send({ auth: false, token: null });
};

module.exports.register = async function (req, res, next) {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        req.body.avatar = result.url;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        var housewife = await Housewife.create(req.body);
        res.status(200).send(housewife);
    } catch (err) {
        console.log(err);
        next(err.message)
    }

};

module.exports.me = function (req, res, next) {

    Housewife.findById(req.userId, { password: 0 }, function (err, Housewife) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!Housewife) return res.status(404).send("No user found.");
        res.status(200).send(Housewife);
    })
};

module.exports.update = async function (req, res, next) {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        req.body.avatar = result.url;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        var Housewife = await Housewife.updateOne({ _id: req.userId }, {
            $set: {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                phone: req.body.phone,
                location: req.body.address,
                avatar: req.body.avatar
            }
        });

        res.json(req.body);

    } catch (err) {
        next(err.message)
    }
}

module.exports.check = async function (req, res, next) {
    try {
        var housewife = await Housewife.updateOne({ _id: req.params.id }, {
            $set: {
                isCkeck: true
            }
        });
        res.json({ "message": "Success" });

    } catch (err) {
        next(err.message)
    }
}

module.exports.forgotPassword = function (req, res, next) {
    var newPassword = code.createCode;
    User.updateOne({ phone: req.params.phone }, {
        $set: {
            password: bcrypt.hashSync(newPassword, salt)
        }
    }).then(data => {
        client.messages.create({
            body: newPassword,
            to: '+' + user.phone,  // Text this number
            from: '+12565888023' // From a valid Twilio number
        }).then(() => {
            res.send({ "message": "Vui lòng đổi mật khẩu" });
        })
    }).catch(err => {
        next(err)
    });

};

module.exports.delete = async function (req, res, next) {
    try {
        var Housewife = await Housewife.deleteOne({ '_id': req.params.id })
        res.send(Housewife);

    } catch (err) {
        next(err.message)
    }
}