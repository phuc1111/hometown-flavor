var User = require('../model/user.model')

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config');
const cloudinary = require('cloudinary')
require('../middleware/cloundinary')
var salt = bcrypt.genSaltSync(10);

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