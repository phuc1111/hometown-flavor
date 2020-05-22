
var Housewife = require('../model/housewife.model')
var config = require('../config');
require('../middleware/cloundinary')

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary')

var salt = bcrypt.genSaltSync(10);

module.exports.index = async function (req, res, next) {
    try {
        var housewife = await Housewife.find()
        res.json(housewife);
    } catch (err) {
        next(err.message)
    }
}

module.exports.login = function (req, res) {

    Housewife.findOne({ email: req.body.email }, function (err, user) {
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
module.exports.delete = async function (req, res, next) {
    try {
        var Housewife = await Housewife.deleteOne({ '_id': req.params.id })
        res.send(Housewife);

    } catch (err) {
        next(err.message)
    }
}