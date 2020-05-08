var User = require('../model/user.model')
const cloudinary = require('cloudinary')
require('../middleware/cloundinary')

var check = require('../middleware/checkUser')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports.index = async function(req, res, next) {
    try {
        var user = await User.find()
        res.json(user);
    } catch (err) {
        next(err.message)
    }
}

module.exports.detail = async function(req, res, next) {
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

module.exports.create = async function(req, res, next) {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        req.body.avatar = result.url;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        var user = await User.create(req.body);
        res.send(user);
    } catch (err) {
        console.log(err);
        next(err.message)
    }
}
module.exports.update = async function(req, res, next) {
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
module.exports.delete = async function(req, res, next) {
    try {
        var user = await User.deleteOne({ '_id': req.params.id })
        res.send(user);

    } catch (err) {
        next(err.message)
    }
}